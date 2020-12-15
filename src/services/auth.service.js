import { Auth } from 'aws-amplify';
import Storage from '../utilities/Storage';

class AuthService {
  isLoggedIn() {
    Storage.getItem('CognitoIdentityServiceProvider.6bs2nga1t9t9aqbqmot3qqb91k.admin.idToken')
      ? ''
      : window.location.href = '/';
  }

  async getSessionInfo() {
    this.isLoggedIn();
    return await Auth.currentSession();
  }
}

export default new AuthService();
