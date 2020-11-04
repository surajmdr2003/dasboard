import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TopCreativeAdsBlock = (props) => {
  const [heightWidth, setHeightWidth] = useState('0*0');
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
    img.onload = function() {
      setHeightWidth(this.width + '*' + this.height);
    };
    return (img.width + '*' + img.height);
  };

  useEffect(() => {
    calculateAssetDimensional(props.creative.assetUrl);
  }, [props.creative]);

  return (
    <div className="p-2">
      <div className="card card-creative">
        <div className="card-creative-thumb">
          <span className="badge badge-secondary">{heightWidth}</span>
          {
            props.creative.name.endsWith('mp4')
              ? <video controls preload="none">
                <source src={props.creative.assetUrl} type="video/mp4"/>
                  Your browser does not support the video tag.
              </video>
              : <object data={props.creative.assetUrl} />
          }
        </div>
        <div className="card-body">
          <h5>{(props.creative.name === null || props.creative.name === '') ? 'No Data' : props.creative.name}</h5>
          <ul>
            <li><strong>Impressions</strong>{props.creative.impressions}</li>
            <li><strong>Clicks</strong>{props.creative.clicks}</li>
            <li><strong>CTR</strong>{handleNanValueWithCalculation(props.creative.clicks, props.creative.impressions)}%</li>
            <li><strong>Conversion</strong>{props.creative.conversions.reduce((sum, next) => sum + next.count, 0)}</li>
            <li><strong>Conv rate</strong>{handleNanValueWithCalculation(props.creative.conversions.reduce((sum, next) => sum + next.count, 0), props.creative.clicks)}%</li>
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
