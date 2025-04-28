import { ReactNode } from 'react';

interface LandingLayoutProps {
    heading: string;
    children: ReactNode;
}

export function LandingLayout({ heading, children }: LandingLayoutProps) {
    return (<div>
        {heading}
        {children}
    </div>);
}