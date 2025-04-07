import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials: true
});

export const registor =(name, email, password)=> api.post('/registor', {name, email, password});

export const login = (email,password)=> api.post('/login', {email,password});

export const logout = ()=> api.post('/logout');

export const detail  = ()=> api.get('/me');