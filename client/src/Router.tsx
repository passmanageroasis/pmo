import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage, RegisterPage } from './pages';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='*' element={<p>Not Found</p>} />
            </Routes>
        </BrowserRouter>
    );
}
