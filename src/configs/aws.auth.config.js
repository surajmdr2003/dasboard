// Aws Auth Configuration
const authConfig = {
  domain: 'supernova.auth.us-east-2.amazoncognito.com',
  scope: [
    'phone',
    'email',
    'profile',
    'openid',
    'aws.cognito.signin.user.admin',
  ],
  mandatorySignIn: false,
  cookieStorage: {
    domain: 'localhost',
    path: '/',
    expires: 365,
    secure: true,
  },
  redirectSignIn: 'http://localhost:8000',
  redirectSignOut: 'http://localhost:8000',
  responseType: 'code',
};

export default authConfig;
