import { Logo } from '@/components/icons';
import clsx from 'clsx';

const Header = ({ className }: { className?: string }) => {
    return (
        <header
            className={clsx('h-15 w-full flex items-center px-6', className)}
        >
            <div
                className={
                    'flex items-center gap-2 font-bold text-text/66 text-nowrap select-none'
                }
            >
                <Logo className={'w-6 h-6'} />
                Pass Manager Oasis
            </div>
        </header>
    );
};

export default Header;
