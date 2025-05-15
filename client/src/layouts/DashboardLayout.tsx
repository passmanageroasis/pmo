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
                    'h-full w-full flex flex-col peer-hover:opacity-50 transition-opacity duration-300 ease'
                }
            >
                <Header />
                <div className={'h-full overflow-scroll p-4 flex-1'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
