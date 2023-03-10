import axios from 'axios';
import './interceptorRequest';
import './interceptorResponse';

interface IAnyObj {
  [index: string]: unknown;
}

interface IHttpResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

// http.get<T>("/user/123");
const getFn = <T>(url: string, params: IAnyObj = {}): Promise<[any, IHttpResponse<T> | undefined]> =>
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        const response = result.data as IHttpResponse<T>;
        resolve([null, response as IHttpResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });

export default {
  get: getFn,
};
