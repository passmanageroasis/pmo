import { useAuthStore } from '@/stores/authStore.ts';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
};
