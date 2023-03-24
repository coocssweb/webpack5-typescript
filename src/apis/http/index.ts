import axios from 'axios';
import interceptorRequest from './interceptorRequest';
import interceptorResponse from './interceptorResponse';

interface IAnyObj {
  [index: string]: unknown;
}

interface IHttpResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

class Base {
  axios;

  constructor(config: any) {
    const { baseURL, timeout } = config;
    this.axios = axios.create({ baseURL, timeout });
    interceptorRequest(this.axios);
    interceptorResponse(this.axios);
  }

  setOptions({ baseURL, timeout, headers }: any) {
    if (typeof baseURL !== 'undefined') {
      this.axios.defaults.baseURL = baseURL;
    }

    if (typeof timeout !== 'undefined') {
      this.axios.defaults.timeout = timeout;
    }
    if (typeof headers !== 'undefined') {
      Object.keys(headers).forEach((key) => {
        this.axios.defaults.headers[key] = headers[key];
      });
    }
  }

  get<T>(url: string, params: IAnyObj = {}): Promise<[any, IHttpResponse<T> | undefined]> {
    return new Promise((resolve) => {
      axios
        .get(url, { params })
        .then((result) => {
          const response = result.data as IHttpResponse<T>;
          resolve([null, response as IHttpResponse<T>]);
        })
        .catch((error) => {
          resolve([error, undefined]);
        });
    });
  }

  post<T>(url: string, data: IAnyObj, params: IAnyObj = {}): Promise<[any, IHttpResponse<T> | undefined]> {
    return new Promise((resolve) => {
      axios
        .post(url, data, { params })
        .then((result) => {
          resolve([null, result.data as IHttpResponse<T>]);
        })
        .catch((err) => {
          resolve([err, undefined]);
        });
    });
  }

  put<T>(url: string, data: IAnyObj, params: IAnyObj = {}): Promise<[any, IHttpResponse<T> | undefined]> {
    return new Promise((resolve) => {
      axios
        .put(url, data, { params })
        .then((result) => {
          resolve([null, result.data as IHttpResponse<T>]);
        })
        .catch((err) => {
          resolve([err, undefined]);
        });
    });
  }

  delete<T>(url: string, params: IAnyObj = {}): Promise<[any, IHttpResponse<T> | undefined]> {
    return new Promise((resolve) => {
      axios
        .delete(url, { params })
        .then((result) => {
          resolve([null, result.data as IHttpResponse<T>]);
        })
        .catch((err) => {
          resolve([err, undefined]);
        });
    });
  }
}

export default new Base({ baseURL: process.env.API, timeout: 5000 });
