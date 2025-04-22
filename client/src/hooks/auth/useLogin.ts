import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@/services/authApiService';
import { useAuthStore } from '@/stores/authStore';

export const useLogin = () => {
    const setToken = useAuthStore((state) => state.setAccessToken);

    return useMutation({
        mutationFn: (params: { email: string; masterPassword: string }) =>
            loginRequest(params),
        onSuccess: (data) => {
            const accessToken = data.data.token;
            setToken(accessToken);
        },
    });
};
