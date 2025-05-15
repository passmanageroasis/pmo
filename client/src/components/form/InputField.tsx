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
    placeholder,
    disabled,
    ...props
}: InputFieldProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className={clsx('w-full flex flex-col transition-colors duration-200 ease-out', disabled && 'opacity-50')}>
            <label className={'text-text/50'} htmlFor={name}>
                {required ? `${label}*` : label}
            </label>
            <div className="relative w-full">
                <input
                    className={clsx(
                        'w-full border-1 px-3 py-2 rounded-lg transition-colors duration-200 ease-out',
                        type === 'password' && 'pr-10',
                        error
                            ? 'bg-red-400/5  border-red-400/50'
                            : 'focus:bg-text/2 placeholder-shown:bg-transparent border-border',
                        className,
                    )}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    disabled={disabled}
                    type={
                        type === 'password'
                            ? passwordVisible
                                ? 'text'
                                : 'password'
                            : type
                    }
                    {...props}
                />
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
                            'absolute text-xl cursor-pointer right-3.5 top-3 transition-colors duration-200 ease-out',
                            error
                                ? 'text-red-400/50'
                                : 'text-text/50 peer-focus:text-brand peer-placeholder-shown:text-text/50',
                        )}
                    >
                        {passwordVisible ? (
                            <MdVisibility />
                        ) : (
                            <MdVisibilityOff />
                        )}
                    </button>
                )}

                {error && (
                    <p className="text-sm text-red-400 ml-3.5">{error}</p>
                )}
            </div>
        </div>
    );
};

export default InputField;
