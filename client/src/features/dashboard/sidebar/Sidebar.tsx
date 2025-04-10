import { Link, useLocation } from 'react-router';
import { Icon } from '../../../components/icons/Icon.tsx';
import { IconName } from '../../../components/icons/icons.ts';

interface NavMenuProps {
    link: string;
    name: string;
    icon: IconName;
}

const navTop: NavMenuProps[] = [
    {
        link: '/dashboard/vault',
        name: 'Vault',
        icon: 'vault',
    },
    {
        link: '/dashboard/password-generator',
        name: 'Password Generator',
        icon: 'key',
    },
];

const navBottom: NavMenuProps[] = [
    {
        link: '/dashboard/settings',
        name: 'Settings',
        icon: 'settings',
    },
];

export default function Sidebar() {
    const NavMenu = ({ link, name, icon }: NavMenuProps) => {
        const location = useLocation();
        const isActive = location.pathname.startsWith(link);

        return (
            <li className="group/li">
                <Link to={link} aria-label={name}>
                    <div
                        className={`overflow-hidden transition-[max-width] duration-300 ease max-w-11 group-hover/nav:max-w-[200px] w-fit rounded-2xl p-2.5 flex items-center gap-2.5 ${
                            isActive ? 'bg-brand' : 'group-hover/li:bg-bgMain'
                        }`}
                    >
                        <Icon name={icon} className="w-6 h-6 shrink-0" />
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
        <nav className="group/nav w-fit bg-bgSecondary h-full p-2.5 z-100 overflow-y-auto scroll-auto relative">
            <ul className="flex flex-col gap-2.5 justify-between h-full">
                <div className="flex flex-col gap-2.5 justify-between">
                    {navTop.map(({ link, name, icon }) => {
                        return (
                            <NavMenu
                                key={link}
                                link={link}
                                name={name}
                                icon={icon}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-col gap-2.5 justify-between">
                    <div className="h-px w-full bg-white/33" />
                    {navBottom.map(({ link, name, icon }) => {
                        return (
                            <NavMenu
                                key={link}
                                link={link}
                                name={name}
                                icon={icon}
                            />
                        );
                    })}
                </div>
            </ul>
        </nav>
    );
}
