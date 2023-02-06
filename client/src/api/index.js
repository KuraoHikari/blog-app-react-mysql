import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = (jsonData) => API.post(`/auth/login`, jsonData); //Token is not valid
export const register = (jsonData) => API.post(`/auth/register`, jsonData);
