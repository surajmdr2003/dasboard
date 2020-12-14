import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TopCreativeAdsBlock = ({creative}) => {
  const [heightWidth, setHeightWidth] = useState('0x0');
  /**
   * Handle NAN and Infinity value
   * @param {Int} fNum
   * @param {Int} sNum
   */
  const handleNanValueWithCalculation = (fNum, sNum) => {
    if (sNum === 0) {
      return (fNum * 100).toFixed(2);
    }
    return ((fNum / sNum) * 100).toFixed(2);
  };

  const calculateAssetDimensional = (asset) => {
    const img = new Image();
    img.src = asset;
    // Important to use function decleration for "this" scope
    img.onload = function calculateSize() {
      setHeightWidth(this.width + 'x' + this.height);
    };
    return (img.width + 'x' + img.height);
  };

  useEffect(() => {
    calculateAssetDimensional(creative.params.url);
  }, [creative]);

  return (
    <div className="p-2">
      <div className="card card-creative">
        <div className="card-creative-thumb">
          <span className="badge badge-secondary">{heightWidth}</span>
          {
            creative.params.url && creative.params.url.endsWith('mp4')
              ? <video controls preload="none">
                <source src={creative.params.url} type="video/mp4"/>
                  Your browser does not support the video tag.
              </video>
              : <object data={creative.params.url} />
          }
        </div>
        <div className="card-body">
          <h5>{(creative.params.name) ? creative.params.name : 'No Data' }</h5>
          <ul>
            <li><strong>Impressions</strong>{creative.impressions.toLocaleString()}</li>
            <li><strong>Clicks</strong>{creative.clicks.toLocaleString()}</li>
            <li><strong>CTR</strong>{handleNanValueWithCalculation(creative.clicks, creative.impressions)}%</li>
            <li><strong>Conversion</strong>{creative.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString()}</li>
            <li><strong>Conv. rate</strong>{handleNanValueWithCalculation(creative.conversions.reduce((sum, next) => sum + next.count, 0), creative.clicks)}%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Component props validation
TopCreativeAdsBlock.propTypes = {
  creative: PropTypes.object,
};

export default React.memo(TopCreativeAdsBlock);
