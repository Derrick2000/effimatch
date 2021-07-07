import axios, {AxiosRequestConfig} from 'axios';
import './interceptors';
export interface RespBody<T> {
  data: T;
  message: string;
  code: string;
}

export default class ApiClient {
  static instance: ApiClient | null = null;

  static getInstance() {
    if (ApiClient.instance == null) {
      ApiClient.instance = new ApiClient();
    }
    return this.instance as ApiClient;
  }

  request(config: AxiosRequestConfig) {
    return axios.request(config);
  }
}
