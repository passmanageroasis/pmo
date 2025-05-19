import { ReactNode, SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    error?: string | boolean;
    className?: string;
    children?: ReactNode;
}

const Select = ({
    children,
    label,
    error,
    name,
    required,
    className,
    disabled,
    ...props
}: SelectProps) => {
    return (
        <div
            className={clsx(
                'w-full flex flex-col transition-colors duration-200 ease-out',
                disabled && 'opacity-50',
            )}
        >
            <label className={'text-text/50'} htmlFor={name}>
                {required ? `${label}*` : label}
            </label>
            <select
                className={clsx(
                    'w-full border-1 px-3 py-2 rounded-lg field-sizing-content transition-colors duration-200 ease-out',
                    error
                        ? 'bg-red-400/5  border-red-400/50'
                        : 'focus:bg-text/5 placeholder-shown:bg-transparent border-border',
                    className,
                )}
                name={name}
                required={required}
                disabled={disabled}
                {...props}
            >
                {children}
            </select>
            {error && <p className="text-sm text-red-400 ml-3.5">{error}</p>}
        </div>
    );
};

export default Select;
