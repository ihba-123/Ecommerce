import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token'); // 🛠️ fixed from getItem to get
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// ✅ RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired, try to refresh once
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get('refresh_token')
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: Cookies.get('refresh_token'),
        });

        const newAccessToken = res.data.access;
        Cookies.set('access_token', newAccessToken, { expires: 1 / 24 }); // 1 hour

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login'; // redirect to login if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
