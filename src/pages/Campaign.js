import React, { Fragment, useEffect, useState } from 'react';

// Contexts
import GlobalContext from '../context/GlobalContext';

/** Components */
import CampaignGraph from '../components/CampaignGraph';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import TopTargets from '../components/TopTargets';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

// Services
import CampaignService from '../services/campaign.service';

const Campaign = () => {
  const {user, activeCampaign} = React.useContext(GlobalContext);
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
    activeCampaign.id && loadCampaignReport(activeCampaign.id);
  }, [user.id, activeCampaign.id]);

  return (
    <Fragment>
      <div className="main-container">
        <section className="filter-bar ">
          <div className="inner-filter-bar w-100">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <PageTitleCampaignDropdown campaignId={activeCampaign.id} campaignList={window.$campaigns} />
                </div>
                <div className="col-md-6 text-right">
                  <a href={reportUrl} download className="btn btn-link btn-download-report">Download Report</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        { activeCampaign.id ? <CampaignGraph campaignId = {activeCampaign.id}/> : ''}
        { activeCampaign.id ? <TopCreatives campaignId = {activeCampaign.id + ''}/> : ''}
        { activeCampaign.id ? <TopLandingPages campaignId = {activeCampaign.id + ''}/> : ''}
        { activeCampaign.id ? <TopTargets campaignId = {activeCampaign.id + ''}/> : ''}
      </div>
    </Fragment>
  );
};

export default Campaign;
