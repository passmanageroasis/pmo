import { ReactNode, useEffect } from 'react';
import { useRefreshToken } from '@/hooks/auth/useRefreshToken';
import { useFetchMe } from '@/hooks/auth/useFetchMe';
import { useLogout } from '@/hooks/auth/useLogout';

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const refreshTokenMutation = useRefreshToken();
    const fetchMeMutation = useFetchMe();
    const { mutate: logout } = useLogout();

    useEffect(() => {
        // Perform the refresh token action and fetch user data if successful
        refreshTokenMutation.mutate(undefined, {
            onSuccess: () => {
                fetchMeMutation.mutate();
            },
            onError: () => {
                logout();
            },
        });
    }, []); // Empty dependency array to run only once on mount

    return <>{children}</>;
};

export default AuthProvider;
