import clsx from 'clsx';
import {
    MdLock,
    MdKey,
    MdHistory,
    MdSettings,
    MdPhishing,
    MdGroups,
} from 'react-icons/md';
import { Link, useLocation } from 'react-router';
import { IconContext } from 'react-icons';
import { ReactNode } from 'react';

interface NavItemProps {
    link: string;
    name: string;
    icon: ReactNode;
    notifications: number;
}

const navSections: NavItemProps[][] = [
    [
        {
            link: '/vault',
            name: 'Vault',
            icon: <MdLock />,
            notifications: 0,
        },
        {
            link: '/password-generator',
            name: 'Password Generator',
            icon: <MdKey />,
            notifications: 0,
        },
        {
            link: '/data-security',
            name: 'Data Security',
            icon: <MdPhishing />,
            notifications: 1,
        },
        {
            link: '/recently-deleted',
            name: 'Recently Deleted',
            icon: <MdHistory />,
            notifications: 5,
        },
        {
            link: '/users',
            name: 'All Users',
            icon: <MdGroups />,
            notifications: 5,
        },
    ],
    [
        {
            link: '/settings',
            name: 'Settings',
            icon: <MdSettings />,
            notifications: 0,
        },
    ],
];

const NavItem = (navItem: NavItemProps) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(navItem.link);

    return (
        <Link to={navItem.link} aria-label={navItem.name}>
            <div
                className={
                    'group/link transition-[max-width,padding] duration-300 ease max-w-13 group-hover/nav:max-w-[12.25rem]'
                }
            >
                <div
                    className={clsx(
                        'p-3 rounded-[1.8rem] flex gap-3 items-center overflow-hidden group-hover/nav:rounded-[0.6rem] transition-[border-radius,padding] duration-300 ease',
                        isActive
                            ? 'bg-brand/15 group-hover/link:bg-brand/20 text-brand'
                            : 'group-hover/link:bg-text/5 ',
                    )}
                >
                    <IconContext.Provider
                        value={{ className: 'h-7 w-7 shrink-0' }}
                    >
                        {navItem.icon}
                    </IconContext.Provider>
                    <span
                        className={
                            'font-bold text-sm leading-0 text-nowrap w-full select-none'
                        }
                    >
                        {navItem.name}
                    </span>
                </div>
            </div>
        </Link>
    );
};

const Sidebar = ({ className }: { className?: string }) => {
    return (
        <nav
            className={clsx(
                'group/nav w-fit flex flex-col justify-between bg-bgMain min-w-min border-r-1 border-border p-2',
                className,
            )}
        >
            <div>
                {navSections[0].map((navItem) => (
                    <NavItem
                        key={navItem.name}
                        link={navItem.link}
                        name={navItem.name}
                        icon={navItem.icon}
                        notifications={navItem.notifications}
                    />
                ))}
            </div>

            <div className={'border-t border-border pt-2'}>
                {navSections[navSections.length - 1].map((navItem) => (
                    <NavItem
                        key={navItem.name}
                        link={navItem.link}
                        name={navItem.name}
                        icon={navItem.icon}
                        notifications={navItem.notifications}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Sidebar;
