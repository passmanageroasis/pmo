import Sidebar from '../features/dashboard/sidebar/Sidebar.tsx';
import Header from '../features/dashboard/header/Header.tsx';
import { Outlet } from 'react-router';

export function DashboardLayout() {
    return (
        <div className="h-screen flex flex-col">
            <a
                className="sr-only z-1000 text-link bg-white focus:not-sr-only focus:p-2"
                href="#main-content"
            >
                Skip to main content
            </a>
            <div className="h-full grid grid-cols-[64px_1fr]">
                <Sidebar />
                <div className="h-screen w-full grid grid-rows-[64px_1fr]">
                    <Header />
                    <main
                        className="w-full h-full p-5 overflow-y-auto"
                        id="main-content"
                    >
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
