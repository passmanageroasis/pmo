import { InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: string | boolean;
    className?: string;
}

const InputField = ({
    label,
    error,
    name,
    type,
    required,
    className,
    ...props
}: InputFieldProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="flex flex-col w-full relative">
            <input
                className={clsx(
                    'peer w-full transition-all ease-out px-4 pt-5 pb-3 placeholder-transparent rounded-lg inset-ring-1 focus:inset-ring-3',
                    type === 'password' && 'pr-14',
                    error
                        ? 'bg-red-400/5 inset-ring-red-400'
                        : 'bg-brand/5 focus:bg-brand/5 placeholder-shown:bg-transparent placeholder-shown:inset-ring-text/50 inset-ring-brand focus:inset-ring-brand',
                    className,
                )}
                name={name}
                required={required}
                placeholder={label}
                type={
                    type === 'password'
                        ? passwordVisible
                            ? 'text'
                            : 'password'
                        : type
                }
                {...props}
            />
            <label
                className={clsx(
                    'absolute peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs left-4 top-2 text-xs pointer-events-none transition-all ease-out',
                    error
                        ? 'text-red-400'
                        : 'text-brand peer-focus:text-brand peer-focus:left-4 peer-placeholder-shown:text-text/50',
                )}
                htmlFor={name}
            >
                {required ? `${label}*` : label}
            </label>
            {type === 'password' && (
                <button
                    type={'button'}
                    aria-label="Toggle password visibility"
                    onClick={() =>
                        setPasswordVisible(
                            (passwordVisible) => !passwordVisible,
                        )
                    }
                    className={clsx(
                        'absolute text-xl cursor-pointer right-5 top-4.5',
                        error
                            ? 'text-red-400'
                            : 'text-brand peer-focus:text-brand peer-placeholder-shown:text-text/50',
                    )}
                >
                    {passwordVisible ? <MdVisibility /> : <MdVisibilityOff />}
                </button>
            )}

            {error && <p className="text-sm text-red-400 ml-4.25">{error}</p>}
        </div>
    );
};

export default InputField;
