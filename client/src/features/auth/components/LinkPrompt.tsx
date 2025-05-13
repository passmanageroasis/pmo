import { Link } from 'react-router';
import clsx from 'clsx';

interface LinkPromptProps {
    promptText: string;
    promptLinkText: string;
    linkTo: string;
    className?: string;
}

const LinkPrompt = ({
    promptText,
    promptLinkText,
    linkTo,
    className,
}: LinkPromptProps) => {
    return (
        <span className={clsx('text-text/50 text-center', className)}>
            {promptText}{' '}
            {linkTo.startsWith!('/') ? (
                <Link to={linkTo} className={'text-link'}>
                    {promptLinkText}
                </Link>
            ) : (
                <a
                    href={linkTo}
                    className={'text-link'}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {promptLinkText}
                </a>
            )}
        </span>
    );
};

export default LinkPrompt;
