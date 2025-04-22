import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@tanstack/react-query';
import { logoutRequest } from '@/services/authApiService.ts';

export const useLogout = () => {
    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useMutation({
        mutationFn: () => logoutRequest(),
        onSettled: () => clearAuth(),
    });
};
