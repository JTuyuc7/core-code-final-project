import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

//https://axios-http.com/docs/config_defaults