import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/** Components */
import CampaignGraph from '../components/CampaignGraph';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import TopTargets from '../components/TopTargets';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

// Services
import CampaignService from '../services/campaign.service';

const Campaign = (props) => {
  const campaignId = props.match.params.id;
  const [reportUrl, setReportUrl] = useState('');

  /**
   * Call API and generate graphs correspond to data
   * Campaign ID
   * @param {Int} campId
   */
  const loadCampaignReport = (campId) => {
    CampaignService.getCampaignReports(campId)
      .then((response) => {
        setReportUrl(response.data.value);
      })
      .catch(() => false)
      .finally();
  };

  useEffect(() => {
    loadCampaignReport(campaignId);
  }, [campaignId]);

  return (
    <Fragment>
      <div className="main-container">
        <section className="filter-bar ">
          <div className="inner-filter-bar w-100">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <PageTitleCampaignDropdown pageSlug="/dashboard/campaigns" campaignId={campaignId} campaignList={window.$campaigns} />
                </div>
                <div className="col-md-6 text-right">
                  <a href={reportUrl} download className="btn btn-link btn-download-report">Download Report</a>
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
