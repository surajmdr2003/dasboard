import Config from '../../app.config';

// Aws Cognito Configuration
const awsConfig = {
  region: Config.region,
  userPoolId: Config.awsUserPoolId,
  userPoolWebClientId: Config.awsClientId,
};

export default awsConfig;
