import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { message, Modal } from 'antd';
import AdminConfig from '../config';
import { getToken } from '../utils/cookie';
import store from '../store/index';
import { logout } from '../store/module/user';
import { clearSideBarRoutes } from '../store/module/app';

interface ResponseData<T> {
  code: number;

  data: T;

  msg: string;
}

// 指定 axios 请求类型

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
};

// 指定请求地址

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? AdminConfig.API_URL : '';

// 添加请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();

    // 获取用户token，用于校验
    /* eslint-disable  no-param-reassign */
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 添加响应拦截器，拦截登录过期或者没有权限

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    if (!response.data) {
      return Promise.resolve(response);
    }

    // 登录已过期或者未登录
    if (response.data.code === AdminConfig.LOGIN_EXPIRE) {
      Modal.confirm({
        title: '系统提示',
        content: response.data.msg,
        okText: '重新登录',
        onOk() {
          store.dispatch(clearSideBarRoutes());
          store.dispatch(logout());
          window.location.href = `${
            window.location.origin
          }/react-ant-admin/system/login?redirectURL=${encodeURIComponent(window.location.href)}`;
        },
        onCancel() {},
      });

      return Promise.reject(new Error(response.data.msg));
    }

    // 请求成功
    if (response.data.code === AdminConfig.SUCCESS_CODE) {
      return response.data as any;
    }

    // 请求成功，状态不为成功时
    message.error(response.data.msg);

    return Promise.reject(new Error(response.data.msg));
  },
  (error: AxiosError) => {
    message.error(error.message);

    return Promise.reject(error);
  },
);

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return axios.request<T>(options);
}
