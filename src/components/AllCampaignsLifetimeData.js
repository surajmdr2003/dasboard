import React, { Fragment, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const AllCampaignsLifetimeData = (props) => {
  const [showRecommendation, setRecommendation] = useState(false); // For recommendation message

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

  return (
    <Fragment>
      <div className={'campiagns-info ' + ((!showRecommendation) ? '' : 'd-none')}>
        <div className="campiagns-info-title bb">
          <h4>Lifetime Data</h4>
          <p>Based on campaigns performance</p>
        </div>
        <ul className="campiagns-info-data list-unstyled ">
          <li className="media bb">
            <span className="icon-box">
              <i className="icon-campaign" />
            </span>
            <div className="media-body">
              <div className="data">
                <h5>Impressions</h5>
                <p>{props.summaryData.impressions.toLocaleString()}</p>
              </div>
            </div>
          </li>
          <li className="media bb">
            <span className="icon-box">
              <i className="icon-click" />
            </span>
            <div className="media-body">
              <ul className="nav nav-fill">
                <li className="nav-item">
                  <div className="data">
                    <h5>Clicks</h5>
                    <p>{props.summaryData.clicks.toLocaleString()}</p>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="data">
                    <h5>CTR</h5>
                    <p>{handleNanValueWithCalculation(props.summaryData.clicks, props.summaryData.impressions)}%</p>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li className="media bb">
            <span className="icon-box">
              <i className="icon-conversion" />
            </span>
            <div className="media-body">
              <ul className="nav nav-fill">
                <li className="nav-item">
                  <div className="data">
                    <h5>Conversion</h5>
                    <p>{props.summaryData.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString()}</p>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="data">
                    <h5>Con rate</h5>
                    <p>{handleNanValueWithCalculation(props.summaryData.conversions.reduce((sum, next) => sum + next.count, 0), props.summaryData.clicks)} %</p>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="text-right">
          <Link to="#" className="btn-link" onClick={() => setRecommendation(!showRecommendation)}>See Recommendation</Link>
        </div>
      </div>
      <div className={'campiagns-info recommendation ' + ((showRecommendation) ? '' : 'd-none')} >
        <div className="campiagns-info-title bb">
          <h4>RECOMMENDATIONS</h4>
          <p>Based on your campaign performance</p>
        </div>
        <div className="campiagns-info-data">
          <h5>Add responsive display ads</h5>
          <p>Get more conversion at a similar CPA with responsive display ads, which automatically adapt to fit all devices</p>
        </div>
        <div className="text-left">
          <Link to="#" className="btn-link" onClick={() => setRecommendation(!showRecommendation)}>Notify Sales</Link>
        </div>
      </div>
    </Fragment>
  );
};

// Props validation
AllCampaignsLifetimeData.propTypes = {
  summaryData: PropTypes.any,
};

export default AllCampaignsLifetimeData;
