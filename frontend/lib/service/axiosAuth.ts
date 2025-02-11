import axios from "axios"

import { getSession } from 'next-auth/react';

const axiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosAuth.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.backendToken.accessToken) {
            config.headers.Authorization = `Bearer ${session.backendToken.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosAuth;
