import { useAuthStore } from '@/features/auth/store/authStore.ts';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
