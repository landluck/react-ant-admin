import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: '',
});

export function requestMd(options: AxiosRequestConfig) {
  return instance(options);
}
