import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { LoginPage, RegisterPage } from '@/features/auth';
import { AuthLayout, DashboardLayout } from '@/layouts';
import { ProtectedRoute, PublicRoute } from '@/components/routing';
import { VaultEntriesPage } from '@/features/dashboard/vault';

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
                <Route element={<ProtectedRoute />}>
                    <Route path={'/'} element={<DashboardLayout />}>
                        <Route path={'vault'} element={<VaultEntriesPage />} />
                        <Route path={'new'} />
                        <Route path={'password-generator'} />
                        <Route path={'data-security'} />
                        <Route path={'recently-deleted'} />
                        <Route path={'settings'} />
                        <Route
                            path={'*'}
                            element={<Navigate to={'/vault'} />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
