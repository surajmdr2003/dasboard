import React, { Fragment } from 'react';

/** Components */
import CampaignGraph from '../components/campaign-graph/CampaignGraph';
import YourCampaigns from '../components/YourCampaigns';
import TopCreatives from '../components/TopCreatives';
import TopLandingPages from '../components/TopLandingPages';
import PageTitleWithOutFilter from '../components/PageTitleWithOutFilter';

const Dashboard = () => {
  return (
    <Fragment>
      <PageTitleWithOutFilter title="Account Overview" />
      <CampaignGraph />
      <YourCampaigns top="5"/>
      <TopCreatives />
      <TopLandingPages />
    </Fragment>
  );
};

export default Dashboard;
