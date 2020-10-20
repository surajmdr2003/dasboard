import Config from '../../app.config';

// Aws Cognito API Configuration
const awsApiConfigs = {
  endpoints: [
    // Advertiser APIs
    {
      name: 'advertiser',
      endpoint: `${Config.apiPath}/advertisers/4955`,
    },
    {
      name: 'advertiserAsset',
      endpoint: `${Config.apiPath}/advertisers/4955/asset`,
    },
    {
      name: 'advertiserCampaignGroups',
      endpoint: `${Config.apiPath}/advertisers/4955/campaigngroup`,
    },
    {
      name: 'advertiserNotifications',
      endpoint: `${Config.apiPath}/advertisers/4955/notifications`,
    },
    {
      name: 'advertiserPerformance',
      endpoint: `${Config.apiPath}/advertisers/4955/performance`,
    },
    {
      name: 'advertiserPerformanceAsset',
      endpoint: `${Config.apiPath}/advertisers/4955/performance/asset`,
    },
    {
      name: 'advertiserPerformanceCampaigns',
      endpoint: `${Config.apiPath}/advertisers/4955/performance/campaigns`,
    },
    {
      name: 'advertiserPerformanceLandingPage',
      endpoint: `${Config.apiPath}/advertisers/4955/performance/landingpage`,
    },
    {
      name: 'advertiserPerformanceLifeTime',
      endpoint: `${Config.apiPath}/advertisers/4955/performance/lifetime`,
    },
    {
      name: 'searchAdvertisers',
      endpoint: `${Config.apiPath}/advertisers/search`,
    },

    // Campaigns APIs
    {
      name: 'canpaignGroup',
      endpoint: `${Config.apiPath}/campaignGroups`,
    },
    {
      name: 'canpaignGroupPerformance',
      endpoint: `${Config.apiPath}/campaignGroups/256/performance`,
    },
    {
      name: 'canpaignGroupPerformanceAsset',
      endpoint: `${Config.apiPath}/campaignGroups/256/performance/asset`,
    },
    {
      name: 'canpaignGroupPerformanceLandingPage',
      endpoint: `${Config.apiPath}/campaignGroups/256/performance/landingpage`,
    },
    {
      name: 'canpaignGroupPerformanceLifetime',
      endpoint: `${Config.apiPath}/campaignGroups/256/performance/lifetime`,
    },
    {
      name: 'canpaignGroupTargeting',
      endpoint: `${Config.apiPath}/campaignGroups/1/targeting`,
    },

    // Email Report Feature
    {
      name: 'emailReport',
      endpoint: `${Config.apiPath}/months`,
    },
  ],
};

export default awsApiConfigs;
