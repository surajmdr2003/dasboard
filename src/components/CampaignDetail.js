import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

// Services
import CampaignService from '../services/campaign.service';


const CampaignDetail = ({campaignDesp}) => {
  const [showRecommendation, setRecommendation] = useState(false);
  const [recommendationData, setRecommendationData] = useState({});

  const loadCampaignRecommendation = (campaignId) => {
    CampaignService.getCampaignRecommendation(campaignId)
      .then((response) => {
        setRecommendationData(response.data.length ? response.data[0] : {});
      })
      .catch(() => false);
  };

  useEffect(() => {
    loadCampaignRecommendation(campaignDesp.id);
  }, [campaignDesp]);

  return (
    <Fragment>
      <div className={'campiagns-info ' + ((!showRecommendation) ? '' : 'd-none')}>
        <div className="campiagns-info-title bb">
          <h4>CAMPAIGN DETAILS</h4>
          <p>Based on campaigns performance</p>
        </div>
        <ul className="campiagns-info-data list-unstyled ">
          <li className="media bb">
            <span className="icon-box">
              <i className="icon-Objective" />
            </span>
            <div className="media-body">
              <div className="data">
                <h5>Objective</h5>
                <p>{campaignDesp.objective}</p>
              </div>
            </div>
          </li>
          <li className="media bb">
            <span className="icon-box">
              <i className="icon-Shape" />
            </span>
            <div className="media-body">
              <div className="data">
                <h5>Impression goal</h5>
                <p>{campaignDesp.impressionGoal}</p>
              </div>
            </div>
          </li>
          <li className="media bb">
            <span className="icon-box">
              <i className="icon-KPI" />
            </span>
            <div className="media-body">
              <div className="data">
                <h5>KPI</h5>
                <p>{campaignDesp.kpi}</p>
              </div>
            </div>
          </li>
        </ul>
        <div className="text-right">
          <a href="#" className="btn-link" onClick={() => setRecommendation(!showRecommendation)}>See Recommendation</a>
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
CampaignDetail.propTypes = {
  campaignDesp: PropTypes.object,
};


export default CampaignDetail;
