import axios from 'axios';
import qs from 'qs';

/**
 * axios 二次封装
 * @params:{config} 目前支持loading，请求头 headers， 成功提示 successMessage
 */

// 参数忽略序列化 content-type
const IGNORE_QS = ['application/json', 'multipart/form-data'];

let loadingRequestCount = 0;

/**
 * 请求错误
 * @param failCallback
 * @param loadingCountCallBack
 * @param err
 */
const handleError = (failCallback, loadingCountCallBack, err) => {
  loadingRequestCount -= 1;
  loadingCountCallBack(loadingRequestCount);

  failCallback(err);

  return Promise.reject(err);
};

export default (config = {}) => {
  let {
    baseUrl = '',
    timeout = 5000,
    showGlobalLoading = false,
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    loadingCount = () => {},
    fail = () => {},
    success = () => {}
  } = config;

  const INIT_AXIOS = axios.create({
    timeout,
    headers,
    baseURL: baseUrl,
    withCredentials: true
  });

  // 请求拦截器
  INIT_AXIOS.interceptors.request.use(
    res => {
      if (showGlobalLoading) {
        loadingRequestCount += 1;
        loadingCount(loadingRequestCount);
      }
      return res;
    },
    err => {
      return handleError(fail, loadingCount, err);
    }
  );

  // 响应拦截器
  INIT_AXIOS.interceptors.response.use(
    res => {
      let { data } = res;

      if (data.code !== 200) {
        fail(data);
      } else if (data.code === 200) {
        success(data);
      }

      if (showGlobalLoading && loadingRequestCount > 0) {
        loadingRequestCount -= 1;
        loadingCount(loadingRequestCount);
      }

      return res.data;
    },
    err => {
      return handleError(fail, loadingCount, err);
    }
  );

  // 请求动作
  return {
    get: (url, params) => {
      return INIT_AXIOS.get(url, { params });
    },

    post: (url, params) => {
      if (!IGNORE_QS.includes(headers['Content-Type'])) {
        params = qs.stringify(params);
      }

      return INIT_AXIOS.post(url, params);
    },

    delete: (url, params) => INIT_AXIOS.delete(url, { params }),

    put: (url, params) => {
      if (!IGNORE_QS.includes(headers['Content-Type'])) {
        params = qs.stringify(params);
      }

      return INIT_AXIOS.put(url, params);
    }
  };
};
