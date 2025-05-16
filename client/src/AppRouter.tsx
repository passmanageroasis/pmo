import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { LoginPage, RegisterPage } from '@/features/auth';
import { AuthLayout, DashboardLayout } from '@/layouts';
import { ProtectedRoute, PublicRoute } from '@/components/routing';
import {
    NewVaultEntryPage,
    VaultEntriesPage,
} from '@/features/dashboard/vault';
import PasswordGeneratorPage from '@/features/dashboard/vault/pages/PasswordGeneratorPage.tsx';
import DataSecurityPage from '@/features/dashboard/vault/pages/DataSecurityPage.tsx';
import RecentlyDeletedPage from '@/features/dashboard/vault/pages/RecentlyDeletedPage.tsx';
import SettingsPage from '@/features/dashboard/vault/pages/SettingsPage.tsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path={'/register'} element={<RegisterPage />} />
                        <Route path={'/login'} element={<LoginPage />} />
                    </Route>
                    <Route path={'*'} element={<Navigate to={'/login'} />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path={'/vault'}>
                            <Route index element={<VaultEntriesPage />} />
                            <Route
                                path={'new'}
                                element={<NewVaultEntryPage />}
                            />
                        </Route>

                        <Route
                            path={'/password-generator'}
                            element={<PasswordGeneratorPage />}
                        />
                        <Route
                            path={'/data-security'}
                            element={<DataSecurityPage />}
                        />
                        <Route
                            path={'/recently-deleted'}
                            element={<RecentlyDeletedPage />}
                        />
                        <Route path={'/settings'} element={<SettingsPage />} />
                        <Route
                            path={'/new'}
                            element={<Navigate to={'/vault/new'} />}
                        />
                        <Route
                            path={'*'}
                            element={<Navigate to={'/vault'} />}
                        />
                    </Route>
                </Route>
                <Route path={'*'} element={<Navigate to={'/vault'} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
