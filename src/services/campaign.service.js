import { API } from 'aws-amplify';
import AuthService from './auth.service';

class CampaignService {
  apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };

  async getCampaignPerformance(campaignId) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.post('canpaignGroup', `/${campaignId}/performance`, this.apiRequest);
  }

  async getCampaignReports(campaignId) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.get('canpaignGroup', `/${campaignId}/report`, this.apiRequest);
  }

  async getCampaignCreatives(campaignId, dateRangeFilter) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
    Object.assign(this.apiRequest.queryStringParameters, dateRangeFilter);

    return await API.post('canpaignGroup', `/${campaignId}/performance/asset`, this.apiRequest);
  }

  async getCampaignLandingPages(campaignId, dateRangeFilter, campaignFilter = null) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
    Object.assign(this.apiRequest.queryStringParameters, dateRangeFilter);
    campaignFilter && Object.assign(this.apiRequest.queryStringParameters, {filter: campaignFilter});

    return await API.post('canpaignGroup', `/${campaignId}/performance/landingpage`, this.apiRequest);
  }

  async getCampaignList(dateRangeFilter) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
    Object.assign(this.apiRequest.queryStringParameters, dateRangeFilter);

    return await API.post('advertiserPerformanceCampaigns', '', this.apiRequest);
  }
}

module.exports = new CampaignService();
