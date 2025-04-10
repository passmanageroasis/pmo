import { ReactNode } from 'react';

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
    return (
        <div className={'w-full flex flex-col items-center justify-center'}>
            <img
                src="/logo.svg"
                className={
                    'h-16 w-auto my-10 brightness-100 pointer-events-none'
                }
                alt="logo"
            />
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
