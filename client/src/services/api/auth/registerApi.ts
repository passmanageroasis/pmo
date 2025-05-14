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
    console.log(apiServerURL);

    const payload = {
        email: userData.email,
        master_password: userData.masterPassword,
    };

    try {
        const response = await axios.post<RegisterResponse>(
            `${apiServerURL}/register`,
            payload,
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.error.message || new Error('Registration failed');
        }
        throw new Error('An unexpected error occurred during registration');
    }
};
