import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { CommonResponse } from 'type/diaryResponse';
import { getItem } from 'utils/localStorage';

const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({ baseURL });

const setToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getItem('token');
  config.headers['Authorization'] = `${token}`;
  return config;
};

instance.interceptors.request.use(setToken);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const { response, config } = error;
    const originalRequest = config;
    if (response.status === 403 || response.status === 401) {
      let refreshToken = localStorage.getItem('retoken');
      let accessToken = localStorage.getItem('token');
      let userId = localStorage.getItem('id');
      const tokens = {
        refreshToken,
        accessToken,
        userId,
      };
      //   if (refreshToken) {
      //     const { data } = await checkToken(tokens);
      //     const access = data.data.accessToken;
      //     const refresh = data.data.refreshToken;
      //     localStorage.setItem('token', access);
      //     localStorage.setItem('retoken', refresh);
      //     window.location.reload();
      //   }
      return axios(originalRequest);
    }
    if (response.status === 404) {
      // return window.location.replace('/notfound');
    }
    if (response.status === 504) {
      // return window.location.replace('/connectfail');
    }
    if (response.status === 400) {
      return response;
    }
    if (response.status === 500) {
      return response;
    }
    return response;
  }
);

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await instance.get(url, config);
  return response;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await instance.post(url, data, config);
  return response;
};
export default instance;
