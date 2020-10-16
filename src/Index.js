/* Core Imports */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// AWS Amplify Related
import Amplify, { Auth } from 'aws-amplify';

// Custom Configs
import Config from '../app.config';

// Aws  Cognito Configuration
import awsConfig from './configs/aws.config';
import awsAuthConfig from './configs/aws.auth.config';
import awsApiConfig from './configs/aws.api.config';

// Main Componets
import App from './App';

// global variable
window.$campaigns = [];

// Configure AWS Amplify
Amplify.configure({
  Auth: awsConfig,
  API: awsApiConfig,
});

// Configure AWS Autentication strategy
Auth.configure({ oauth: awsAuthConfig });

// Render App
render(
  (<BrowserRouter basename={Config.basepath}>
    <App/>
  </BrowserRouter>),
  document.getElementById('root')
);
