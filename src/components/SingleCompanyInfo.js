import React, {Fragment} from 'react';

/**
 * Returns view of Single Campaigns Data
 */
const SingleCampaignInfo = (campaign) => {
  return (
    campaign.campaignDetail
      ? <Fragment>
        <h4>{campaign.campaignDetail.name}</h4>
        <ul className="campaigns-datas nav">
          <li>From {chartDate }</li>
          <li className={`${campaign.campaignDetail.status.toLowerCase()}-campaign`}>{campaign.campaignDetail.status}</li>
        </ul>
      </Fragment>
      : ''
  );
};

export default SingleCampaignInfo;
