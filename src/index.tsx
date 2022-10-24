import React from 'react';
import ReactDOM from 'react-dom/client';

import axios from 'axios';

import './index.scss';
import App from './App';
import config from './config/default';

axios.defaults.baseURL = config.axios.baseURL;
axios.defaults.timeout = config.axios.timeout;
axios.defaults.headers.post['Content-Type'] = config.axios.contentType;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
