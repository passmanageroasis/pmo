import { Link, useLocation } from 'react-router';
import { ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { RiShieldKeyholeFill } from 'react-icons/ri';
import {
    MdAdd,
    MdHistory,
    MdKey,
    MdPhishing,
    MdSettings,
} from 'react-icons/md';

interface NavMenuProps {
    link: string;
    name: string;
    icon: ReactNode;
    notifications: number;
}

const nav: NavMenuProps[][] = [
    [
        {
            link: '/dashboard/create-entry',
            name: 'Create Entry',
            icon: <MdAdd />,
            notifications: 0,
        },
        {
            link: '/dashboard/vault',
            name: 'Vault',
            icon: <RiShieldKeyholeFill />,
            notifications: 0,
        },
        {
            link: '/dashboard/password-generator',
            name: 'Password Generator',
            icon: <MdKey />,
            notifications: 0,
        },
        {
            link: '/dashboard/data-security',
            name: 'Data Security',
            icon: <MdPhishing />,
            notifications: 1,
        },
        {
            link: '/dashboard/recently-deleted',
            name: 'Recently Deleted',
            icon: <MdHistory />,
            notifications: 5,
        },
    ],
    [
        {
            link: '/dashboard/settings',
            name: 'Settings',
            icon: <MdSettings />,
            notifications: 0,
        },
    ],
];

export default function Sidebar() {
    const NavMenu = ({ link, name, icon, notifications }: NavMenuProps) => {
        const location = useLocation();
        const isActive = location.pathname.startsWith(link);

        return (
            <li className="group/li">
                <Link to={link} aria-label={name}>
                    <div
                        className={`overflow-hidden transition-[max-width] duration-300 ease max-w-11 group-hover/nav:max-w-[196px] w-fit rounded-2xl p-2.5 flex items-center gap-2.5 ${
                            isActive ? 'bg-brand' : 'group-hover/li:bg-bgMain'
                        }`}
                    >
                        <div className={'relative'}>
                            <IconContext.Provider
                                value={{ className: 'w-6 h-6 shrink-0' }}
                            >
                                {icon}
                            </IconContext.Provider>
                            {notifications > 0 && (
                                <div
                                    className={
                                        'absolute -bottom-1 -right-1 text-xs w-4 h-4 bg-red-400 flex justify-center items-center rounded-full'
                                    }
                                >
                                    {notifications < 9 ? notifications : "9+"}
                                </div>
                            )}
                        </div>
                        <span
                            className={`text-nowrap leading-0 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-150 ease-in`}
                        >
                            {name}
                        </span>
                    </div>
                </Link>
            </li>
        );
    };

    return (
        <nav className="group/nav w-fit bg-bgSecondary h-full p-2.5 z-100 overflow-y-auto relative">
            <ul className="flex flex-col gap-2.5 justify-between h-full">
                <div className="flex flex-col gap-2.5 justify-between">
                    {nav[0].map(({ link, name, icon, notifications }) => {
                        return (
                            <NavMenu
                                key={link}
                                link={link}
                                name={name}
                                icon={icon}
                                notifications={notifications}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-col gap-2.5 justify-between">
                    <div className="h-px w-full bg-white/33" />
                    {nav[nav.length - 1].map(
                        ({ link, name, icon, notifications }) => {
                            return (
                                <NavMenu
                                    key={link}
                                    link={link}
                                    name={name}
                                    icon={icon}
                                    notifications={notifications}
                                />
                            );
                        },
                    )}
                </div>
            </ul>
        </nav>
    );
}
