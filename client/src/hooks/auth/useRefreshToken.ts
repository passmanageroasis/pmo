import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { refreshTokenRequest } from '@/services/authApiService.ts';

export const useRefreshToken = () => {
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    return useMutation({
        mutationFn: refreshTokenRequest,
        onSuccess: (data) => {
            setAccessToken(data.data.token);
            console.log(data.data.token);
        },
        onError: (err) => {
            console.error('Refresh token error:', err);
        },
    });
};
