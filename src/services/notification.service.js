import { API } from 'aws-amplify';
import AuthService from './auth.service';

class NotificationService {
    apiRequest = {
      headers: { accept: '*/*' },
      response: true,
      queryStringParameters: {},
    };

    async getNotificationAction(notificationId) {
      const userInfo = await AuthService.getSessionInfo();
      const accessToken = userInfo.getAccessToken().getJwtToken();

      // Setting up header info
      this.apiRequest.headers.authorization = `Bearer ${accessToken}`;

      return await API.post('notifications', `/${notificationId}/action`, this.apiRequest);
    }
}

module.exports = new NotificationService();


