import { useAuthStore } from '@/features/auth/store/authStore.ts';
import { Navigate, Outlet } from 'react-router';

const PublicRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return isAuthenticated ? <Navigate to={'/vault'} /> : <Outlet />;
};

export default PublicRoute;
