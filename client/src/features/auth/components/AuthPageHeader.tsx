import LinkPrompt from '@/features/auth/components/LinkPrompt.tsx';

interface AuthPageHeaderProps {
    title: string;
    promptText: string;
    promptLinkText: string;
    linkTo: string;
}

const AuthPageHeader = ({
    title,
    promptText,
    promptLinkText,
    linkTo,
}: AuthPageHeaderProps) => {
    return (
        <div className={'my-8 flex flex-col items-center gap-2'}>
            <h1 className={'text-3xl text-center'}>{title}</h1>
            <LinkPrompt
                promptText={promptText}
                promptLinkText={promptLinkText}
                linkTo={linkTo}
            />
        </div>
    );
};

export default AuthPageHeader;
