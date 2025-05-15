import { ReactNode } from 'react';

const Section = ({ children }: { children: ReactNode }) => {
    return (
        <section className={'bg-bgMain p-4 rounded-xl border-1 border-border'}>
            {children}
        </section>
    );
};

export default Section;
