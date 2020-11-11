import { API } from 'aws-amplify';
import AuthService from './auth.service';

class AdvertiserService {
  apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };

  async getAdvertiser() {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.get('currentAdvertiser', '', this.apiRequest);
  }

  async getAdvertiserProfile(advertiserId) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.get('advertiser', `/${advertiserId}`, this.apiRequest);
  }

  async getAdvertiserNotifications(advertiserId) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.get('advertiser', `/${advertiserId}/notification`, this.apiRequest);
  }

  async getAdvertiserAssets(advertiserId) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.get('advertiser', `/${advertiserId}/asset`, this.apiRequest);
  }

  async getAdvertiserPerformance(advertiserId, options = null) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    // Setting up Query Strings
    options && Object.assign(this.apiRequest.queryStringParameters, options);

    return await API.post('advertiser', `/${advertiserId}/performance`, this.apiRequest);
  }

  async getAdvertiserCampaignGroups(advertiserId, options = null) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
    options && Object.assign(this.apiRequest.queryStringParameters, options);

    return await API.get('advertiser', `/${advertiserId}/campaigngroup`, this.apiRequest);
  }

  async getAdvertiserPerformanceLifetime(advertiserId) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.post('advertiser', `/${advertiserId}/performance/lifetime`, this.apiRequest);
  }

  async getAdvertiserPerformanceCampaigns(advertiserId, dateRangeFilter) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
    Object.assign(this.apiRequest.queryStringParameters, dateRangeFilter);

    return await API.post('advertiser', `/${advertiserId}/performance/campaigns`, this.apiRequest);
  }

  async getAdvertiserPerformanceLandingPages(advertiserId, dateRangeFilter = null, campaignFilter = null) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
    dateRangeFilter && Object.assign(this.apiRequest.queryStringParameters, dateRangeFilter);
    campaignFilter && Object.assign(this.apiRequest.queryStringParameters, {filter: campaignFilter});

    return await API.post('advertiser', `/${advertiserId}/performance/landingpage`, this.apiRequest);
  }

  async getAdvertiserPerformanceAssets(advertiserId, dateRangeFilter, campaignFilter = null) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
    Object.assign(this.apiRequest.queryStringParameters, dateRangeFilter);
    campaignFilter && Object.assign(this.apiRequest.queryStringParameters, {filter: campaignFilter});


    return await API.post('advertiser', `/${advertiserId}/performance/asset`, this.apiRequest);
  }

  async searchAdvertisers(searchQuery) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    // Setting up Query Strings
    Object.assign(this.apiRequest.queryStringParameters, { nameOrId: searchQuery });

    return await API.get('advertiser', '/search', this.apiRequest);
  }
}

module.exports = new AdvertiserService();
