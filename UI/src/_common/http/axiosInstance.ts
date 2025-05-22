import axios from 'axios';
import {API_LOCAL} from "@src/_env/env.ts";

const axiosInstance = axios.create({
    baseURL: API_LOCAL,
    headers: {},
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {

        const credentials = localStorage.getItem('credentials');
        console.log('credentials',credentials);
        if (credentials) {

            const { token } = JSON.parse(credentials);
            console.log('token',token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
