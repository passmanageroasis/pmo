import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { LoginPage, RegisterPage, Vault, VaultEntry } from './pages';
import { PasswordGenerator } from './pages/dashboard/PasswordGenerator.tsx';
import { Settings } from './pages/dashboard/Settings.tsx';
import { DashboardLayout } from './layouts';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="register" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route path="create-entry" element={'Coming soon..'} />
                    <Route index element={<Navigate to="vault" />} />
                    <Route path="vault">
                        <Route index element={<Vault />} />
                        <Route path=":entryId" element={<VaultEntry />} />
                    </Route>
                    <Route
                        path="password-generator"
                        element={<PasswordGenerator />}
                    />
                    <Route path="data-security" element={'Coming soon..'} />
                    <Route path="recently-deleted" element={'Coming soon..'} />
                    <Route path="settings">
                        <Route index element={<Navigate to="account" />} />
                        <Route path="account" element={<Settings />} />
                        <Route path="notifications" />
                        <Route path="appearance" />
                        <Route path="privacy-and-security" />
                        <Route
                            path="*"
                            element={<Navigate to="/dashboard/settings" />}
                        />
                    </Route>
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
