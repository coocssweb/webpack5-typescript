import axios from 'axios';

const handleNetworkError = (status: number) => {
  let message = '未知错误';
  if (status) {
    switch (status) {
      case 400:
        message = '错误的请求';
        break;
      case 401:
        message = '未授权，请重新登录';
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求错误,未找到该资源';
        break;
      case 405:
        message = '请求方法未允许';
        break;
      case 408:
        message = '请求超时';
        break;
      case 500:
        message = '服务器端出错';
        break;
      case 501:
        message = '网络未实现';
        break;
      case 502:
        message = '网络错误';
        break;
      case 503:
        message = '服务不可用';
        break;
      case 504:
        message = '网络超时';
        break;
      case 505:
        message = 'http版本不支持该请求';
        break;
      default:
        message = `其他连接错误`;
    }
  } else {
    message = `无法连接到服务器`;
  }

  message.error(message);
};

const handleAuthError = (errno) => {
  const authErrors: any = {
    '10031': '登录失效，需要重新登录', // token 失效
    '10032': '您太久没登录，请重新登录~', // token 过期
    '10033': '账户未绑定角色，请联系管理员绑定角色',
    '10034': '该用户未注册，请联系管理员注册用户',
    '10035': 'code 无法获取对应第三方平台用户',
    '10036': '该账户未关联员工，请联系管理员做关联',
    '10037': '账号已无效',
    '10038': '账号未找到',
  };

  if (authErrors.hasOwnProperty(errno)) {
    message.error(authErrors[errno]);
    // 授权错误，登出账户
    logout();
    return false;
  }

  return true;
};

const handleGeneralError = (errno, errmsg) => {
  if (err.errno !== '0') {
    meessage.error(err.errmsg);
    return false;
  }

  return true;
};

axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response.data);
    }
    handleAuthError(response.data.errno);
    handleGeneralError(response.data.errno, response.data.errmsg);
    return response;
  },
  (error) => {
    handleNetworkError(error.response.status);
    Promise.reject(error.response);
  },
);
