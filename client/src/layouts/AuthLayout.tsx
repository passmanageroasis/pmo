import { Outlet } from 'react-router';
import { Logo } from '@/components/icons';

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
                    <Logo className={'h-18 w-18 fill-brand'} />
                    <div
                        className={
                            'h-18 w-18 absolute inset-0 scale-800 bg-radial from-brand/8 to-70% to-transparent pointer-events-none'
                        }
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
