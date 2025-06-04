import { ReactNode } from 'react';
import clsx from 'clsx';

const Section = ({
    children,
    className,
}: {
    children?: ReactNode;
    className?: string;
}) => {
    return (
        <section
            className={clsx(
                'bg-bgMain p-4 rounded-xl border-1 border-border',
                className,
            )}
        >
            {children}
        </section>
    );
};

export default Section;
