import { API } from 'aws-amplify';
import AuthService from './auth.service';

class StatsService {
  apiRequest = {
    headers: { accept: '*/*' },
    response: true,
    queryStringParameters: {},
  };

  async getCampaignMonths(campaignId) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.get('canpaignGroup', `/${campaignId}/months`, this.apiRequest);
  }

  async getCampaignStatsOfMonth(monthId) {
    const userInfo = await AuthService.getSessionInfo();
    const accessToken = userInfo.getAccessToken().getJwtToken();

    // Setting up header info
    this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

    return await API.post('stats', `/${monthId}/stats`, this.apiRequest);
  }
}

module.exports = new StatsService();
