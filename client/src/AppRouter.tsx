import { BrowserRouter, Route, Routes } from 'react-router';
import { LoginPage, RegisterPage } from '@/features/auth';
import { AuthLayout } from '@/layouts';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index />
                <Route path="/" element={<AuthLayout />}>
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
