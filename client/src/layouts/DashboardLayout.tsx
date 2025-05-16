import { Outlet } from 'react-router';
import { Sidebar } from '@/features/dashboard';
import Header from '@/features/dashboard/components/Header.tsx';

const DashboardLayout = () => {
    return (
        <div
            className={
                'h-screen bg-bgDarker grid grid-cols-[3.75rem_auto] right-0'
            }
        >
            <Sidebar className={'overflow-y-auto peer relative z-100'} />
            <div
                className={
                    'h-screen w-full flex flex-col peer-hover:opacity-50 transition-opacity duration-300 ease'
                }
            >
                <Header />
                <main
                    className={'overflow-scroll p-6 flex-1'}
                    id={'main-content'}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
