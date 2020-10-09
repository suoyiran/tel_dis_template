import axios from 'axios';
import * as Qs from 'qs';
import db from './lowdb'
import { v4 as UUIDv4 } from 'uuid'

// axios.defaults.withCredentials = true;

let BASE_URL = 'https://api.li.xmartjoy.com/api/';
//let BASE_URL = 'http://192.168.0.12:8090/api/';
let appId = null
let appSecret = null

const httpClient = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  paramsSerializer: (params) => {
    return Qs.stringify(params, {arrayFormat: 'brackets'});
  },
});

httpClient.interceptors.request.use(function (config) {
  if (localStorage.Authorization) {
    config.headers.Authorization = localStorage.Authorization
  }
  config.headers['x-app'] = appId
  config.headers['x-request'] = UUIDv4()
  config.headers['x-timestamp'] = ((new Date()) / 1000).toFixed(0)
  config.headers['x-device'] = db.get('device.id').value()
  return config
}, function (error) {
  return Promise.reject(error);
});

httpClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 如果请求错误，则删除token，并跳转到登录页
    if (error.response) {
      let data = error.response.data;
      if (!data) {
        data = {
          code: error.response.status,
          msg: error.response.statusText,
        };
      }
      if (data.code === 401) {
        window.localStorage.removeItem('Authorization')
      }
      return Promise.resolve(data);
    }
    return Promise.resolve({
      code: 503,
      msg: '服务器未响应',
    });
  },
);

httpClient.download = async function (url, name) {
  const data = await this.get(url, {
    responseType: 'blob',
  })
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = window.URL.createObjectURL(data)
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

httpClient.init = (key, secret) => {
  appId = key
  appSecret = secret
}

export default httpClient;
