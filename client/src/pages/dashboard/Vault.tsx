import { Link } from 'react-router';

interface EntryProps {
    id: string;
    domain: string;
    title: string;
    email: string;
    login: string;
    password: string;
}

const entries: EntryProps[] = [
    {
        id: '1',
        domain: 'github.com',
        title: 'GitHub',
        email: 'john.doe@email.com',
        login: 'johndoe1',
        password: 'password123!',
    },
    {
        id: '2',
        domain: 'twitch.tv',
        title: 'Twitch',
        email: 'john.doe@email.com',
        login: 'johndoe1',
        password: 'password123!',
    },
    {
        id: '3',
        domain: 'google.com',
        title: 'Google',
        email: 'john.doe@email.com',
        login: 'johndoe1',
        password: 'password123!',
    },
    {
        id: '4',
        domain: 'facebook.com',
        title: 'Facebook',
        email: 'john.doe@email.com',
        login: 'johndoe1',
        password: 'password123!',
    },
    {
        id: '5',
        domain: 'reddit.com',
        title: 'Reddit',
        email: 'john.doe@email.com',
        login: 'johndoe1',
        password: 'password123!',
    },
    {
        id: '6',
        domain: 'stackoverflow.com',
        title: 'Stack Overflow',
        email: 'john.doe@email.com',
        login: 'johndoe1',
        password: 'password123!',
    },
];

export function Vault() {
    return (
        <>
            <div className={'flex flex-col w-full'}>
                <div
                    className={
                        'flex w-full gap-4 items-center text-text/50 px-3'
                    }
                >
                    <div className={'w-10 h-10'}></div>
                    <div className={'flex-1 overflow-hidden'}>Title</div>
                    <div className={'flex-1 overflow-hidden'}>Domain</div>
                    <div className={'flex-2 overflow-hidden'}>Email</div>
                </div>
                {entries.map(({ id, domain, title, email }) => (
                    <div key={id}>
                        <div className={'w-full h-px bg-white/50'} />
                        <Link to={id}>
                            <div
                                className={
                                    'flex w-full gap-4 items-center p-3 hover:bg-white/10'
                                }
                                key={id}
                            >
                                <div
                                    className={
                                        'w-10 h-10 bg-white p-1.5 rounded-xl overflow-hidden'
                                    }
                                >
                                    <img
                                        className={
                                            'w-full h-full text-transparent leading-0'
                                        }
                                        src={`https://${domain}/favicon.ico`}
                                        alt={`${domain} logo`}
                                    />
                                </div>
                                <div className={'flex-1 overflow-hidden'}>
                                    {title}
                                </div>
                                <div className={'flex-1 overflow-hidden'}>
                                    {domain}
                                </div>
                                <div className={'flex-2 overflow-hidden'}>
                                    {email}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
