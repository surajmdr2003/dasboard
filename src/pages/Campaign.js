import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Auth, API } from 'aws-amplify';

/** Components */
import CampaignGraph from '../components/CampaignGraph';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import TopTargets from '../components/TopTargets';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

const Campaign = (props) => {
  const [reportUrl, setReportUrl] = ('#');

  const campaignId = props.match.params.id;

  const apiRequest = {
    headers: { accept: '*/*' },
    response: true,
  };

  /**
   * Call API and generate graphs correspond to data
   * Campaign ID
   * @param {Int} id
   */
  const loadReportUrl = (id) => {
    Auth.currentSession()
      .then(async function(info) {
        const accessToken = info.getAccessToken().getJwtToken();

        // Setting up header info
        apiRequest.headers.authorization = `Bearer ${accessToken}`;
        const response = await API.get('canpaignGroup', `/${id}/report`, apiRequest);

        setReportUrl(response);
      })
      .catch(() => false)
      .finally();
  };

  useEffect(() => {
    loadReportUrl(campaignId);
  }, [campaignId]);

  return (
    <Fragment>
      <div className="main-container">
        <section className="filter-bar ">
          <div className="inner-filter-bar w-100">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  {
                    window.$campaigns.length
                      ? <PageTitleCampaignDropdown pageSlug="/dashboard/campaign" campaignId={campaignId} campaignList={window.$campaigns} />
                      : ''
                  }
                </div>
                <div className="col-md-6 text-right">
                  <Link to={reportUrl} className="btn btn-link btn-download-report">Download Report</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CampaignGraph campaignId = {campaignId}/>
        <TopCreatives campaignId = {campaignId}/>
        <TopLandingPages campaignId = {campaignId}/>
        <TopTargets campaignId = {campaignId}/>
      </div>
    </Fragment>
  );
};

Campaign.propTypes = {
  match: PropTypes.object,
};

export default Campaign;
