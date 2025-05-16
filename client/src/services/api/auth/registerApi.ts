import axios from 'axios';

interface RegisterFormValues {
    email: string;
    masterPassword: string;
    confirmMasterPassword: string;
}

interface RegisterResponse {
    message: string;
    userId?: string;
}

const apiServerURL = import.meta.env.VITE_API_SERVER_URL;

export const registerUser = async (userData: RegisterFormValues) => {
    const payload = {
        email: userData.email,
        master_password: userData.masterPassword,
    };

    return await axios
        .post<RegisterResponse>(`${apiServerURL}/auth/register`, payload)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            throw new Error(
                err?.response.data.error.message ||
                    'Unexpected error during registration.',
            );
        });
};
