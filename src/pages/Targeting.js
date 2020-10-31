import React, { Fragment } from 'react';

/** Components */
import TopTargets from '../components/TopTargets';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

// Context
import GlobalContext from '../context/GlobalContext';

const Targeting = () => {
  const {activeCampaign} = React.useContext(GlobalContext);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown campaignId={+activeCampaign.id} campaignList={window.$campaigns} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TopTargets campaignId={+activeCampaign.id}/>
    </Fragment>
  );
};

export default Targeting;
