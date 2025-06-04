import { Outlet } from 'react-router';
import { Sidebar, Header } from './components';

const DashboardLayout = () => {
    return (
        <div
            className={
                'h-screen h-dvh bg-bgDarker grid grid-cols-[3.75rem_auto] right-0'
            }
        >
            <Sidebar className={'overflow-y-auto peer relative z-100'} />
            <div
                className={
                    'h-screen h-dvh w-full flex flex-col peer-hover:opacity-50 transition-opacity duration-300 ease'
                }
            >
                <Header />
                <main
                    className={'overflow-auto p-6 flex-1'}
                    id={'main-content'}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
