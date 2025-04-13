import { Link, useParams } from 'react-router';
import { useMemo } from 'react';

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

export function VaultEntry() {
    const { entryId } = useParams();
    const entry = useMemo(
        () => entries.find((entry) => entry.id === entryId),
        [entryId],
    );

    if (!entry) {
        return <h1 className={'text-2xl'}>Entry not found</h1>;
    }

    return (
        <>
            <div className={'bg-bgMain p-5 w-full'}>
                <Link to={'/dashboard/vault'}>Go back</Link>
                <div>
                    <h2>{entry.title}</h2>
                    <p>Domain: {entry.domain}</p>
                    <p>Email: {entry.email}</p>
                    <p>Login: {entry.login}</p>
                    <p>Password: {entry.password}</p>
                </div>
            </div>
        </>
    );
}
