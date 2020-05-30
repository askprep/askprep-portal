import Axios from 'axios';

export const API_HOST = 'http://localhost:8080/';

const HttpService = Axios.create({
  baseURL: `${API_HOST.replace(/\/$/, '')}/`,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
  },
});

export default HttpService;
