import { ButtonHTMLAttributes } from 'react';

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export function ButtonSubmit({ text, ...rest }: ButtonSubmitProps) {
    return (
        <button
            type="submit"
            className={
                'w-full p-4 rounded-md text-white bg-brand font-bold cursor-pointer mt-3'
            }
            {...rest}
        >
            {text}
        </button>
    );
}
