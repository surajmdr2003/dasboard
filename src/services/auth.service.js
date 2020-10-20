import { Auth } from 'aws-amplify';

class AuthService {
  async getSessionInfo() {
    return await Auth.currentSession();
  }
}

export default new AuthService();
