const Config = {};

Config.basepath = process.env.APP_BASE_PATH;
Config.apiPath = process.env.API_PATH;
Config.awsRegion = process.env.REGION;
Config.awsUserPoolId = process.env.USER_POOL_ID;
Config.awsClientId = process.env.CLIENT_ID;
Config.mapboxAccessToken = process.env.MAPBOX_API_KEY;
Config.client = process.env.CLIENT;
Config.authDomain = process.env.AUTH_DOMAIN;
Config.redirectSignInPath = process.env.REDIRECT_SIGNIN_URL;
Config.redirectSignOutPath = process.env.REDIRECT_SIGNOUT_URL;

module.exports = Config;
