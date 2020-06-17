import Axios from 'axios';
const API_HOST = window.API_HOST;
const API_OCR_Node_HOST = window.API_HOST_NODE;
const API_OCR_PYTHON_HOST = window.API_HOST_OCR;
export const HttpNodeService = Axios.create({
  baseURL: `${API_HOST.replace(/\/$/, '')}/api/`,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
  },
});

export const OCRNodeService = Axios.create({
  baseURL: `${API_OCR_Node_HOST.replace(/\/$/, '')}/`,
});

export const OCRPythonService = Axios.create({
  baseURL: `${API_OCR_PYTHON_HOST.replace(/\/$/, '')}/`,
});
