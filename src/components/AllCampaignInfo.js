import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
/**
 * Returns view of All Campaigns Data
 */
const AllCampaignInfo = ({campaigns}) => {
  return (
    <Fragment>
      <h4>All campaigns data</h4>
      <ul className="campaigns-datas nav">
        <li>{campaigns.total} Total campaigns</li>
        <li className="active-campaign">{campaigns.active} Active</li>
        <li className="inactive-campaign">{campaigns.inactive} Inactive</li>
        <li className="paused-campaign">{campaigns.paused} Paused</li>
      </ul>
    </Fragment>
  );
};


AllCampaignInfo.propTypes = {
  campaigns: PropTypes.object,
};

export default AllCampaignInfo;
