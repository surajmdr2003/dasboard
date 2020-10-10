const Config = {};

Config.basepath = process.env.APP_BASE_PATH || '/';
Config.apiPath = process.env.API_PATH || 'http://HOST:PORT/api/';
Config.awsRegion = process.env.REGION;
Config.awsUserPoolId = process.env.USER_POOL_ID;
Config.awsClientId = process.env.CLIENT_ID;
Config.mapboxAccessToken = process.env.MAPBOX_API_KEY;

module.exports = Config;