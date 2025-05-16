import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { CgSpinner } from 'react-icons/cg';

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    loading?: boolean;
}

const ButtonSubmit = ({
    text,
    loading,
    disabled,
    className,
    ...props
}: ButtonSubmitProps) => {
    return (
        <button
            type="submit"
            className={clsx(
                'w-full px-4 h-14 flex justify-center items-center font-bold rounded-lg transition-colors transition-opacity duration-150 ease-out',
                !disabled
                    ? 'text-white bg-brand hover:bg-brand/33 hover:text-brand active:bg-brand/33 active:text-brand active:opacity-75 cursor-pointer'
                    : 'bg-brand/33 text-brand opacity-50',
                className,
            )}
            {...props}
        >
            {loading ? <CgSpinner className={'animate-spin h-6 w-6'} /> : text}
        </button>
    );
};

export default ButtonSubmit;
