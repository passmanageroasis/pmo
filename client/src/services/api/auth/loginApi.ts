import axios from 'axios';

interface LoginFormValues {
    email: string;
    masterPassword: string;
    confirmMasterPassword: string;
}

interface LoginResponse {
    message: string;
}

const apiServerURL = import.meta.env.VITE_API_SERVER_URL;

export const loginUser = async (userData: LoginFormValues) => {
    const payload = {
        email: userData.email,
        master_password: userData.masterPassword,
    };

    return await axios
        .post<LoginResponse>(`${apiServerURL}/auth/login`, payload, {
            withCredentials: true,
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw new Error(
                err.response.data.error.message ||
                    'Unexpected error during login.',
            );
        });
};
