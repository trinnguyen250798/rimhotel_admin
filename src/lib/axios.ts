import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Default config for the axios instance
const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://rimhotel.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // often needed for Laravel Sanctum cookies if on same domain, or CORS
};

const axiosClient: AxiosInstance = axios.create(config);

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
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
    // return response.data;
    return response.data;
  },
  (error) => {
    // Global error handling
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized (e.g., clear token and redirect)
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          if (typeof window !== 'undefined') {
            window.location.href = '/signin';
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
