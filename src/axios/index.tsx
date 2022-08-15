import axios, {AxiosRequestConfig,} from 'axios';

export const DefaultAxiosConfig: AxiosRequestConfig = {
  baseURL: "https://api.chucknorris.io",
};

export const API = axios.create(DefaultAxiosConfig);
