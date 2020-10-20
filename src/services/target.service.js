import { API } from 'aws-amplify';
import AuthService from './auth.service';

class TargetService {
    apiRequest = {
      headers: { accept: '*/*' },
      response: true,
      queryStringParameters: {},
    };

    async getCampaignTargets(campaignId) {
      const userInfo = await AuthService.getSessionInfo();
      const accessToken = userInfo.getAccessToken().getJwtToken();

      // Setting up header info
      this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

      return await API.post('canpaignGroup', `/${campaignId}/targeting`, this.apiRequest);
    }
}

module.exports = new TargetService();
