import { Auth, API } from 'aws-amplify';

class CampaignService {
    apiRequest = {
      headers: { accept: '*/*' },
      response: true,
      queryStringParameters: {},
    };

    async getCampaignReports(campaignId) {
      const self = this;
      return Auth.currentSession()
        .then(async function(info) {
          const accessToken = info.getAccessToken().getJwtToken();

          // Setting up header info
          self.apiRequest.headers.authorization = `Bearer ${accessToken}`;

          return await API.get('canpaignGroup', `/${campaignId}/report`, this.apiRequest);
        });
    }
}

module.exports = new CampaignService();
