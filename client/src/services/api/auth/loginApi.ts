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
    console.log(apiServerURL);

    const payload = {
        email: userData.email,
        master_password: userData.masterPassword,
    };

    try {
        const response = await axios.post<LoginResponse>(
            `${apiServerURL}/login`,
            payload,
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw (
                error.response.data.error.message || new Error('Login failed')
            );
        }
        throw new Error('An unexpected error occurred during login');
    }
};
