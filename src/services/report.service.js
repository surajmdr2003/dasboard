import { API } from 'aws-amplify';
import AuthService from './auth.service';

class ReportService {
    apiRequest = {
      headers: { accept: '*/*' },
      response: true,
      queryStringParameters: {},
    };

    async getReports(campaignId, page, perPage) {
      const userSession = await AuthService.getSessionInfo();
      const accessToken = userSession.getAccessToken().getJwtToken();

      // Setting up header info
      this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
      this.apiRequest.queryStringParameters.perPage = perPage;
      this.apiRequest.queryStringParameters.pageNumber = page;

      return await API.get('canpaignGroup', `/${campaignId}/reports/months`, this.apiRequest);
    }

    async emailReport(reportId, info) {
      const userSession = await AuthService.getSessionInfo();
      const accessToken = userSession.getAccessToken().getJwtToken();

      // Setting up header info
      this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
      this.apiRequest.queryStringParameters = {};
      this.apiRequest.queryStringParameters.email = info.emailAddress;
      this.apiRequest.queryStringParameters.message = info.message;

      return await API.post('emailReport', `/${reportId}/reports/email`, this.apiRequest);
    }

    async downloadReport(monthId) {
      const userSession = await AuthService.getSessionInfo();
      const accessToken = userSession.getAccessToken().getJwtToken();

      // Setting up header info
      this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

      return await API.get('emailReport', `/${monthId}/report`, this.apiRequest);
    }
}

module.exports = new ReportService();
