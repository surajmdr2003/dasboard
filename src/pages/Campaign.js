import React, { Fragment, useState, useEffect } from 'react';

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
  const { activeCampaign } = React.useContext(GlobalContext);
  const [isLoading, setIsloading] = useState(false);

  /**
   * Call API and generate graphs correspond to data
   * Campaign ID
   * @param {Int} campId
   */
  const loadCampaignReport = (event, campId) => {
    event.preventDefault();

    let reportWindow;

    setIsloading(true);
    CampaignService.getCampaignReports(campId)
      .then((response) => {
        setIsloading(false);
        if (response.data && response.data.value) {
          reportWindow = window.open('', '_blank');
          reportWindow.location = response.data.value;
        }
      })
      .catch(() => false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <div className="main-container">
        <section className="filter-bar ">
          <div className="inner-filter-bar w-100">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <PageTitleCampaignDropdown pageName="Campaign Detail" campaignId={activeCampaign.id} campaignList={window.$campaigns} />
                </div>
                <div className="col-md-6 text-right">
                  <a href="#" onClick={(e) => loadCampaignReport(e, activeCampaign.id)} className="btn" target="_blank">
                    {isLoading ? <span className="spinner-grow spinner-grow-sm" role="status"> <span className="sr-only">Loading...</span></span> : ''}
                    {/* {' '} Download Report */}</a>
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
              <TopTargets campaignId={activeCampaign.id + ''} showBlockTitle={true}/>
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
