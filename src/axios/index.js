import axios from "axios";

export const DefaultAxiosConfig = {
  baseURL: "https://api.chucknorris.io",
};

export const API = axios.create(DefaultAxiosConfig);
