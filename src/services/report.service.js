import { Auth, API } from 'aws-amplify';

class ReportService {
    apiRequest = {
      headers: { accept: '*/*' },
      response: true,
      queryStringParameters: {},
    };

    async getReports(page, perPage) {
      const self = this;
      return Auth.currentSession()
        .then(async function(info) {
          const accessToken = info.getAccessToken().getJwtToken();

          // Setting up header info
          self.apiRequest.headers.authorization = `Bearer ${accessToken}`;
          self.apiRequest.queryStringParameters.perPage = perPage;
          self.apiRequest.queryStringParameters.pageNumber = page;

          return await API.get('canpaignGroup', '/256/reports/months', self.apiRequest);
        });
    }

    async emailReport(reportId) {
      const self = this;
      return Auth.currentSession()
        .then(async function(info) {
          const accessToken = info.getAccessToken().getJwtToken();

          // Setting up header info
          self.apiRequest.headers.authorization = `Bearer ${accessToken}`;
          self.apiRequest.queryStringParameters = {};
          self.apiRequest.queryStringParameters.email = info.getIdToken().payload.email;

          return await API.post('emailReport', `/${reportId}/reports/email`, self.apiRequest);
        });
    }
}

module.exports = new ReportService();
