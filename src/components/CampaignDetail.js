import React, { Fragment, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';

// Services
import CampaignService from '../services/campaign.service';
import NotificationService from '../services/notification.service';


const CampaignDetail = ({ campaignDesp }) => {
  const [showRecommendation, setRecommendation] = useState(false);
  const [recommendationData, setRecommendationData] = useState([]);

  const loadCampaignRecommendation = (campaignId) => {
    CampaignService.getCampaignRecommendation(campaignId)
      .then((response) => {
        setRecommendationData(response.data.length ? response.data : []);
      })
      .catch(() => false);
  };

  const makeApiCall = (event, notificationId, actionType) => {
    event.preventDefault();
    let linkWindow;

    NotificationService.getNotificationAction(notificationId)
      .then((response) => {
        if (actionType === 'STATIC_URL') {
          // Redirect to the report url
          linkWindow = window.open('', '_blank');
          linkWindow.location = response.data.value;
        }

        if (actionType === 'API_CALL') {
          cogoToast.success(response.data.value, { position: 'bottom-center', hideAfter: 3 });
        }
      })
      .catch(() => cogoToast.error('No recommendation available', {position: 'bottom-left'}));
  };

  const getActionTypeLabel = (notificationId, actionType, action) => {
    return actionType !== 'NO_ACTION' ? <a href="#" onClick={(e) => makeApiCall(e, notificationId, actionType)} className="btn-link">{action}</a> : '';
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
        <div className="media-body">
          <ul className="list-unstyled ">
            {recommendationData.length
              ? recommendationData.map((rec) => {
                return (<li key={rec.id} className="bb">
                  <div className="campiagns-info-data">
                    <h5>{rec.title}</h5>
                    <p>{rec.description}</p>
                  </div>
                  <div className="text-left mb-3">
                    {getActionTypeLabel(rec.id, rec.actionType, rec.actionName)}
                  </div>
                </li>);
              })
              : <li className="bb">
                <div className="campiagns-info-data">
                  <p>There are no recommendation available for the campaign</p>
                </div>
              </li>
            }
          </ul>
        </div>
        <div className="text-right">
          <Link to="#" className="btn-link" onClick={() => setRecommendation(!showRecommendation)}>Hide Recommendation</Link>
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
