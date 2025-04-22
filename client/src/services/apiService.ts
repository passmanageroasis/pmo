import axios from 'axios';

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
});

export default apiInstance;
