import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

/**
 * Returns view of Single Campaigns Data
 */
const SingleCampaignInfo = ({campaignDetail, chartDate}) => {
  return (
    campaignDetail
      ? <Fragment>
        <h4>{campaignDetail.name}</h4>
        <ul className="campaigns-datas nav">
          <li>From {chartDate }</li>
          <li className={`${campaignDetail.status.toLowerCase()}-campaign`}>{campaignDetail.status}</li>
        </ul>
      </Fragment>
      : ''
  );
};

SingleCampaignInfo.propTypes = {
  campaignDetail: PropTypes.object,
  chartDate: PropTypes.string,
};

export default SingleCampaignInfo;
