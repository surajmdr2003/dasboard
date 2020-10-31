import Config from '../../app.config';

// Aws Cognito API Configuration
const awsApiConfigs = {
  endpoints: [
    // Advertiser APIs
    {
      name: 'currentAdvertiser',
      endpoint: `${Config.apiPath}/user/advertiser`,
    },
    {
      name: 'advertiser',
      endpoint: `${Config.apiPath}/advertisers`,
    },

    // Campaigns APIs
    {
      name: 'canpaignGroup',
      endpoint: `${Config.apiPath}/campaignGroups`,
    },

    // Report APIs
    {
      name: 'emailReport',
      endpoint: `${Config.apiPath}/months`,
    },

    // Stats Feature
    {
      name: 'stats',
      endpoint: `${Config.apiPath}/months`,
    },

    // Notification Feature
    {
      name: 'notifications',
      endpoint: `${Config.apiPath}/notification`,
    },
  ],
};

export default awsApiConfigs;
