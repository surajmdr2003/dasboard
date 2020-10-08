import { Auth } from 'aws-amplify';

class AuthService {
  isAuthenticated() {
    return Auth.currentAuthenticatedUser().then(() => true).catch(() => false);
  }
}

export default new AuthService();
