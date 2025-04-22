import { useMutation } from '@tanstack/react-query';
import { registerRequest } from '@/services/authApiService';

export const useRegister = () => {
    return useMutation({
        mutationFn: (params: { email: string; masterPassword: string }) =>
            registerRequest(params),
    });
};
