import React, { Fragment } from 'react';

/** Components */
import TopTargets from '../components/TopTargets';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

// Context
import GlobalContext from '../context/GlobalContext';

const Targeting = () => {
  const {setActiveCampaign} = React.useContext(GlobalContext);

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <PageTitleCampaignDropdown pageSlug="/dashboard/targeting" campaignId={+setActiveCampaign.id} campaignList={window.$campaigns} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TopTargets campaignId={+setActiveCampaign.id}/>
    </Fragment>
  );
};

export default Targeting;
