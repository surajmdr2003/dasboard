import { API } from 'aws-amplify';
import AuthService from './auth.service';

class ReportService {
    apiRequest = {
      headers: { accept: '*/*' },
      response: true,
      queryStringParameters: {},
    };

    async getReports(campaignId, page, perPage) {
      const userInfo = await AuthService.getSessionInfo();
      const accessToken = userInfo.getAccessToken().getJwtToken();

      // Setting up header info
      this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
      this.apiRequest.queryStringParameters.perPage = perPage;
      this.apiRequest.queryStringParameters.pageNumber = page;

      return await API.get('canpaignGroup', `/${campaignId}/reports/months`, this.apiRequest);
    }

    async emailReport(reportId) {
      const userInfo = await AuthService.getSessionInfo();
      const accessToken = userInfo.getAccessToken().getJwtToken();

      // Setting up header info
      this.apiRequest.headers.authorization = `Bearer ${accessToken}`;
      this.apiRequest.queryStringParameters = {};
      this.apiRequest.queryStringParameters.email = info.getIdToken().payload.email;

      return await API.post('emailReport', `/${reportId}/reports/email`, this.apiRequest);
    }
}

module.exports = new ReportService();
