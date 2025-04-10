import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | boolean;
}

export function InputField({
    label,
    error,
    required,
    ...rest
}: InputFieldProps) {
    return (
        <div className="flex flex-col w-full relative my-2.5">
            <input
                className={
                    'peer text-base border-1 border-brand p-4 placeholder-transparent rounded-md focus:inset-ring-brand focus:inset-ring-2'
                }
                placeholder={label}
                required={required}
                {...rest}
            />
            <label
                className={
                    'absolute select-none text-sm z-1 bg-bgMain px-1 left-3.25 -top-2.5 leading-5 transition-all duration-200 ease-out text-brand ' +
                    'peer-placeholder-shown:text-base peer-placeholder-shown:text-text/50 peer-placeholder-shown:top-4.75 peer-placeholder-shown:-z-1 ' +
                    'peer-focus:z-1 peer-focus:text-brand peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-bgMain '
                }
                htmlFor={rest.name}
            >
                {required ? `${label}*` : label}
            </label>
            {error && <p className="text-sm text-red-400 ml-4.25">{error}</p>}
        </div>
    );
}
