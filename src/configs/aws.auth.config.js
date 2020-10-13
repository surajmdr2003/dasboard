import Config from '../../app.config';

// Aws Auth Configuration
const authConfig = {
  domain: Config.authDomain,
  scope: [
    'phone',
    'email',
    'profile',
    'openid',
    'aws.cognito.signin.user.admin',
  ],
  mandatorySignIn: false,
  cookieStorage: {
    domain: Config.client,
    path: '/',
    expires: 365,
    secure: true,
  },
  redirectSignIn: Config.redirectSignInPath,
  redirectSignOut: Config.redirectSignOutPath,
  responseType: 'code',
};

export default authConfig;
