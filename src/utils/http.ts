import axiosInstance from './axiosInstance';

const http = {
  get: (url: string, params = {}) => axiosInstance.get(url, { params }),
  post: (url: string, data: any) => axiosInstance.post(url, data),
  put: (url: string, data: any) => axiosInstance.put(url, data),
  delete: (url: string) => axiosInstance.delete(url),
};

export default http;
