import axios from 'axios';

const handleRequestHeader = (config) => {
  config['xxxx'] = 'xxx';
  return config;
};

const handleAuth = (config) => {
  config.header['token'] = localStorage.getItem('token') || token || '';
  return config;
};

axios.interceptors.request.use((config) => {
  config = handleRequestHeader(config);
  config = handleAuth(config);
  return config;
});
