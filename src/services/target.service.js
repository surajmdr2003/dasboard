import { Auth, API } from 'aws-amplify';

class TargetService {
    apiRequest = {
      headers: { accept: '*/*' },
      response: true,
      queryStringParameters: {},
    };

    async getCampaignTargets(campaignId) {
      const self = this;
      return Auth.currentSession()
        .then(async function(info) {
          const accessToken = info.getAccessToken().getJwtToken();

          // Setting up header info
          self.apiRequest.headers.authorization = `Bearer ${accessToken}`;

          return await API.post('canpaignGroup', `/${campaignId}/targeting`, self.apiRequest);
        });
    }
}

module.exports = new TargetService();
