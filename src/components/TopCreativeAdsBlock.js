import React from 'react';
import PropTypes from 'prop-types';

const TopCreativeAdsBlock = (props) => {
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
    return (img.width + '*' + img.height);
  };

  return (
    <div className="col-lg-3 col-sm-6">
      <div className="card card-creative">
        <div className="card-creative-thumb">
          <span className="badge badge-secondary">{calculateAssetDimensional(props.creative.assetUrl)}</span>
          <object data={props.creative.assetUrl} />
        </div>
        <div className="card-body">
          <h5>{(props.creative.name === null || props.creative.name === '') ? 'No Data' : props.creative.name}</h5>
          <ul>
            <li><strong>Impressions</strong>{props.creative.impressions}</li>
            <li><strong>Clicks</strong>{props.creative.clicks}</li>
            <li><strong>CTR</strong>{handleNanValueWithCalculation(props.creative.clicks, props.creative.impressions)}%</li>
            <li><strong>Conversion</strong>{props.creative.conversions.length}</li>
            <li><strong>Conv rate</strong>{handleNanValueWithCalculation(props.creative.conversions.length, props.creative.clicks)}%</li>
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

export default TopCreativeAdsBlock;
