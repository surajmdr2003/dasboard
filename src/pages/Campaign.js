import React, { Fragment, useEffect, useState } from 'react';

// Contexts
import GlobalContext from '../context/GlobalContext';

/** Components */
import CampaignGraph from '../components/campaign-graph/CampaignGraph';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import TopTargets from '../components/TopTargets';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

// Services
import CampaignService from '../services/campaign.service';

const Campaign = () => {
  const { user, activeCampaign } = React.useContext(GlobalContext);
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
                  <PageTitleCampaignDropdown pageName="Campaign Detail Page" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
                </div>
                <div className="col-md-6 text-right">
                  <a href={reportUrl} download className="btn btn-link btn-download-report" target="_blank">Download Report</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {
          activeCampaign.id
            ? <Fragment>
              <CampaignGraph campaignId={activeCampaign.id} />
              <TopCreatives campaignId={activeCampaign.id + ''} />
              <TopLandingPages campaignId={activeCampaign.id + ''} />
              <TopTargets campaignId={activeCampaign.id + ''} />
            </Fragment>
            : <div className="text-center m-5">
              <div className="spinner-grow spinner-grow-lg" role="status"> <span className="sr-only">Loading...</span></div>
            </div>
        }
      </div>
    </Fragment>
  );
};

export default Campaign;
