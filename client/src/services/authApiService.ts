import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/authStore.ts';
import { ApiResponse } from '@/types/apiResponseTypes.ts';

const authInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
    withCredentials: true,
});

authInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const loginRequest = async (params: {
    email: string;
    masterPassword: string;
}) => {
    try {
        return await authInstance.post('/login', {
            email: params.email,
            master_password: params.masterPassword,
        });
    } catch (err) {
        const axiosErr = err as AxiosError<ApiResponse>;
        throw new Error(
            axiosErr.response?.data.error.message || 'Login failed.',
        );
    }
};

export const registerRequest = async (params: {
    email: string;
    masterPassword: string;
}) => {
    try {
        return await authInstance.post('/register', {
            email: params.email,
            master_password: params.masterPassword,
        });
    } catch (err) {
        const axiosErr = err as AxiosError<ApiResponse>;
        throw new Error(
            axiosErr.response?.data.error.message || 'Registration failed.',
        );
    }
};

export const logoutRequest = async () => {
    try {
        return await authInstance.post('/logout');
    } catch (err) {
        const axiosErr = err as AxiosError<ApiResponse>;
        throw new Error(
            axiosErr.response?.data.error.message || 'Logout failed.',
        );
    }
};

export const refreshTokenRequest = async () => {
    try {
        return await authInstance.post('/refresh-token', null, {
            withCredentials: true,
        });
    } catch (err) {
        const axiosErr = err as AxiosError<ApiResponse>;
        throw new Error(
            axiosErr.response?.data.error.message || 'Refresh failed.',
        );
    }
};

export const fetchMeRequest = async (params: { accessToken: string }) => {
    try {
        return await authInstance.post('/me', {
            token: params.accessToken,
        });
    } catch (err) {
        const axiosErr = err as AxiosError<ApiResponse>;
        throw new Error(
            axiosErr.response?.data.error.message || 'Fetching user failed.',
        );
    }
};

export default authInstance;
