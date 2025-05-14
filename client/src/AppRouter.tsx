import { BrowserRouter, Route, Routes } from 'react-router';
import { LoginPage, RegisterPage } from '@/features/auth';
import { AuthLayout } from '@/layouts';
import { ProtectedRoute, PublicRoute } from '@/components/routing';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path={'/'} element={<AuthLayout />}>
                        <Route path={'register'} element={<RegisterPage />} />
                        <Route path={'login'} element={<LoginPage />} />
                    </Route>
                </Route>
                <Route path={'/'} element={<ProtectedRoute />}>
                    <Route path={'vault'} element={<h1>Vault</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
