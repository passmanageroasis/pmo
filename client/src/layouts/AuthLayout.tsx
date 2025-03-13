import { ReactNode, useEffect } from 'react';

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
    useEffect(() => {
        const firstInput = document.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }, []);

    return (
        <div className={'w-full flex flex-col items-center justify-center'}>
            <img src="/logo.svg" className={'w-16 h-16 my-10'} alt="logo" />
            <h1 className={'text-2xl whitespace-nowrap'}>{title}</h1>
            <div
                className={
                    'w-md flex flex-col items-center max-w-full min-w-fit p-1.5'
                }
            >
                {children}
            </div>
        </div>
    );
}
