// const handleRequestHeader = (config) => {
//   config['xxxx'] = 'xxx';
//   return config;
// };

// const handleAuth = (config) => {
//   config.header['token'] = localStorage.getItem('token') || token || '';
//   return config;
// };

export default (axios: any) => {
  axios.interceptors.request.use((config: any) => {
    // config = handleRequestHeader(config);
    // config = handleAuth(config);
    return config;
  });
};
