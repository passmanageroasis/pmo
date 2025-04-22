import { useMutation } from '@tanstack/react-query';
import { fetchMeRequest } from '@/services/authApiService';
import { useAuthStore } from '@/stores/authStore.ts';

export const useFetchMe = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    return useMutation({
        mutationFn: () => fetchMeRequest({ accessToken }),
    });
};
