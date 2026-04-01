import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { log } from 'console';

let injectedStore: any;

export const injectStore = (store: any) => {
  injectedStore = store;
};

// Default config for the axios instance
const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 60 seconds timeout
  withCredentials: true, // often needed for Laravel Sanctum cookies if on same domain, or CORS
};

const axiosClient: AxiosInstance = axios.create(config);

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      // Do not attach token for login request
      const isLoginRequest = config.url?.includes('/login');

      if (token && config.headers && !isLoginRequest) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (injectedStore) {
        const hotelCurrent = injectedStore.getState().hotelCurrent?.hotelCurrent;
        if (hotelCurrent?.ulid) {
          config.headers["X-Hotel-KEY"] = hotelCurrent.ulid;
        }
      }

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can unwrap the response data here if you prefer only dealing with data
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Dispatch event so AuthContext handles logout properly
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('auth:logout'));
          }
          break;
        case 403:
          // Handle forbidden
          break;
        case 422:
          // Handle validation errors (Laravel standard)
          // console.warn('Validation Error', error.response.data.errors);
          break;
        case 500:
          // Handle server error
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
