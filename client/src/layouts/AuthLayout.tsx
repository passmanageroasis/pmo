import { Outlet } from 'react-router';
import { logoSVG } from '@/assets/logos';

const AuthLayout = () => {
    return (
        <div
            className={
                'w-full min-h-screen h-full flex flex-col justify-between items-center p-6'
            }
        >
            <div
                className={
                    'w-full min-sm:max-w-sm flex flex-col items-center mt-16'
                }
            >
                <div className={'relative'}>
                    <img
                        src={logoSVG}
                        alt={''}
                        className={'absolute inset-0 scale-200 blur-3xl'}
                    />
                    <img
                        src={logoSVG}
                        alt={'Pass Manager Oasis Logo'}
                        className={'h-18 w-auto'}
                    />
                </div>
                <main className={'w-full'}>
                    <Outlet />
                </main>
            </div>
            <footer className={'mt-6'}>
                <span className={'opacity-50'}>
                    &copy; {new Date().getUTCFullYear()} Pass Manager Oasis
                </span>
            </footer>
        </div>
    );
};

export default AuthLayout;
