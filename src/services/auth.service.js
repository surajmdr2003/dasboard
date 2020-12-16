import { Auth } from 'aws-amplify';
import cogoToast from 'cogo-toast';

class AuthService {
  async getSessionInfo() {
    return await Auth.currentSession()
      .catch(() => {
        cogoToast.error('Session Expired! Please sign in again.', { position: 'bottom-left' });
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      });
  }
}

export default new AuthService();
