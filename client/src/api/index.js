import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (jsonData) => API.post(`/auth/login`, jsonData); //Token is not valid
export const register = (jsonData) => API.post(`/auth/register`, jsonData);

export const createPostApi = (formData, headers) =>
  API({
    method: 'POST',
    url: '/post/create',
    headers: headers,
    data: formData,
    cache: 'no-cache',
  });

export const getAllPost = (url) => API.get(`/post/get-all${url}`);
export const getOnePost = (url) => API.get(`/post/get-one/${url}`);
