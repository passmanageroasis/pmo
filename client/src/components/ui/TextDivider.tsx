import clsx from 'clsx';

const TextDivider = ({
    text,
    className,
}: {
    text: string;
    className?: string;
}) => {
    return (
        <div className={clsx('flex items-center w-full', className)}>
            <div className={'w-full h-px bg-white'} />
            <span className={'text-xs mx-2'}>{text}</span>
            <div className={'w-full h-px bg-white'} />
        </div>
    );
};

export default TextDivider;
