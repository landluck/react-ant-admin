import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create();

export function requestMd(options: AxiosRequestConfig) {
  return instance(options);
}
