import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import RegisterPage from './pages/RegisterPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import LandingPage from './pages/LandingPage.tsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to={'/landing'} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/landing" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
}
