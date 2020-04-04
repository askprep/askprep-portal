import axios from 'axios';

const getApiUrl = () => {
    let apiUrl;
    if (window.location.hostname === 'localhost') {
      apiUrl = `http://${window.location.hostname}:3000/api`;
    } else {
      apiUrl = `https://${window.location.hostname}:3000/api`;
    }
    return apiUrl;
};

axios.defaults.baseURL = getApiUrl();
