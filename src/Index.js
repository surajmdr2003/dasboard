/* Core Imports */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Custom Configs
import Config from '../app.config';

// Main Componets
import App from './App';

// Render App
render(
  (<BrowserRouter basename={Config.basepath}>
    <App/>
  </BrowserRouter>),
  document.getElementById('root')
);
