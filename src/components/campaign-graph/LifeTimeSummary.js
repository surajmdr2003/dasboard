import React, { Fragment, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

// Services
import AdvertiserService from '../../services/advertiser.service';

const LifeTimeSummary = ({ advertiserId }) => {
  const [showRecommendation, setRecommendation] = useState(false);
  const [recommendationData, setRecommendationData] = useState({});
  const [summaryData, setSummaryData] = useState({
    clicks: 0,
    impressions: 0,
    conversions: [],
  });

  /**
   * Call API for Advertiser's life time data
   */
  const loadLifeTimeSummary = (advertiserUserId) => {
    AdvertiserService.getAdvertiserPerformanceLifetime(advertiserUserId)
      .then((response) => {
        setSummaryData(response.data.summary.length ? response.data.summary[0] : {
          clicks: 0,
          impressions: 0,
          conversions: [],
        });
      })
      .catch(() => false);
  };

  useEffect(() => {
    advertiserId && loadLifeTimeSummary(advertiserId);
    loadRecommendation(advertiserId);
  }, [advertiserId]);

  /**
   * Handle NAN and Infinity value
   * @param {Int} fNum
   * @param {Int} sNum
   */
  const handleNanValueWithCalculation = (fNum, sNum) => {
    return (sNum === 0) ? (fNum * 100).toFixed(2) : ((fNum / sNum) * 100).toFixed(2);
  };

  const loadRecommendation = (advertiserUserId) => {
    AdvertiserService.getAdvertiserRecommendation(advertiserUserId)
      .then((response) => {
        setRecommendationData(response.data.length ? response.data[0] : {});
      })
      .catch(() => false);
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
                <p>{summaryData.impressions.toLocaleString()}</p>
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
                    <p>{summaryData.clicks.toLocaleString()}</p>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="data">
                    <h5>CTR</h5>
                    <p>{handleNanValueWithCalculation(summaryData.clicks, summaryData.impressions)}%</p>
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
                    <p>{summaryData.conversions.reduce((sum, next) => sum + next.count, 0).toLocaleString()}</p>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="data">
                    <h5>Con rate</h5>
                    <p>{handleNanValueWithCalculation(summaryData.conversions.reduce((sum, next) => sum + next.count, 0), summaryData.clicks)} %</p>
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
          <h5>{recommendationData.title}</h5>
          <p>{recommendationData.description}</p>
        </div>
        <div className="text-left">
          <Link to="#" className="btn-link" onClick={() => setRecommendation(!showRecommendation)}>Notify Sales</Link>
        </div>
      </div>
    </Fragment>
  );
};

// Props validation
LifeTimeSummary.propTypes = {
  summaryData: PropTypes.any,
  advertiserId: PropTypes.number,
};

export default LifeTimeSummary;
