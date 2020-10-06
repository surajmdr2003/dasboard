import React, { Fragment } from 'react';

const CampaignDetail = () => {
  return (
    <Fragment>
      <div className="campiagns-info">
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
                <p>To increase online checking online account opening.</p>
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
                <p>200,000 per month</p>
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
                <p>Clicks, CTR, Conversion, Account opens</p>
              </div>
            </div>
          </li>
        </ul>
        <div className="text-right">
          <a href="#" className="btn-link">See Recommendation</a>
        </div>
      </div>
    </Fragment>
  );
};

export default CampaignDetail;
