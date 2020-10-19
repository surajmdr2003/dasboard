import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/** Components */
import TopTargets from '../components/TopTargets';
import PageTitleCampaignDropdown from '../components/PageTitleCampaignDropdown';

const Targeting = (props) => {
  const campaignId = props.match.params.id;

  return (
    <Fragment>
      <section className="filter-bar ">
        <div className="inner-filter-bar w-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                {
                  window.$campaigns.length
                    ? <PageTitleCampaignDropdown pageSlug="/dashboard/targeting" campaignId={+campaignId} campaignList={window.$campaigns} />
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <TopTargets campaignId={+campaignId}/>
    </Fragment>
  );
};

Targeting.propTypes = {
  match: PropTypes.object,
};

export default Targeting;
