import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>


                <Route index element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}

