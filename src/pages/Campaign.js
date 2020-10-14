import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Components */
import CampaignGraph from '../components/CampaignGraph';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import TopTargets from '../components/TopTargets';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

const Campaign = (props) => {
  const campaignId = props.match.params.id;
  window.$campaigns
  debugger
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
                      ? <PageTitleCampaignDropdown pageSlug='/dashboard/campaign' campaignId={campaignId} campaignList={window.$campaigns} />
                      : ''
                  }
                </div>
                <div className="col-md-6 text-right">
                  <Link to="./https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" className="btn btn-link btn-download-report">
                                        Download Report
                  </Link>
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
