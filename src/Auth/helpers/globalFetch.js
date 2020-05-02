import axios from 'axios';
import SessionStorageService from '../../common/Services/session-storage.service';
import { AuthorizationRepository } from '../../common/Repositories/authorizationRepository';

const API_HOST = window.API_HOST ? window.API_HOST : 'http://localhost:7070/';
export default class Axios_Setup {
  _authorizationRepo;

  constructor() {
    this._authorizationRepo = new AuthorizationRepository();
  }

  AxiosInterceptor() {
    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        config.baseURL = `${API_HOST.replace(/\/$/, '')}/api/`;
        const token = SessionStorageService.getIdToken();
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = SessionStorageService.getRefreshToken() || '';
          return this._authorizationRepo
            .getTokensFromRefreshToken(refreshToken)
            .then((res) => {
              if (res.status === 201) {
                res.json().then((x) => {
                  // This should return both access_token and id_token
                  const idToken = x.id_token;
                  const accessToken = x.access_token;

                  SessionStorageService.setIdToken(idToken);
                  SessionStorageService.setAccessToken(accessToken);

                  // 2) Change Authorization header
                  axios.defaults.headers.common.Authorization =
                    'Bearer ' + SessionStorageService.getIdToken();

                  // 3) return originalRequest object with Axios.
                  return axios(originalRequest);
                });
              }

              // return Error object with Promise
              return Promise.reject(error);
            });
        }

        // return Error object with Promise
        return Promise.reject(error);
      },
    );
  }
}
