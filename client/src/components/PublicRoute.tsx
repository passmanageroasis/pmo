import { useAuthStore } from '@/stores/authStore.ts';
import { Navigate, Outlet } from 'react-router';

export const PublicRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return isAuthenticated ? <Navigate to={'/dashboard'} /> : <Outlet />;
};
