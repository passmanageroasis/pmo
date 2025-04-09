import { ReactNode } from 'react';

interface AuthLayoutProps {
    heading: string;
    children: ReactNode;
}

export function AuthLayout({ heading, children }: AuthLayoutProps) {
    return (
        <div className="w-full flex flex-col items-center pb-8">
            <div className="bg-brand rounded-md w-12 h-12 my-10"></div>
            <h1 className="text-white mb-4 text-2xl font-light text-center">
                {heading}
            </h1>
            <div className="flex flex-col px-2 w-sm max-w-full">{children}</div>
            <hr className="text-white/50"></hr>
        </div>
    );
}
