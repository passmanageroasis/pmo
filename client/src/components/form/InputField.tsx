import { ChangeEvent, FocusEvent } from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'password' | 'email';
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    error?: string | boolean;
    disabled?: boolean;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

export function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    disabled = false,
    required = false,
    minLength,
    maxLength = 255,
    onFocus,
    onBlur,
}: InputFieldProps) {
    return (
        <div className={'flex flex-col w-full relative my-2.5'}>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={
                    'peer text-base border-1 border-brand p-4 placeholder-transparent rounded-md focus:inset-ring-brand focus:inset-ring-2'
                }
                minLength={minLength}
                maxLength={maxLength}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <label
                htmlFor={name}
                className={
                    'absolute select-none text-sm z-1 bg-bgMain px-1 left-3.25 -top-2.5 leading-5 transition-all duration-200 ease-out text-brand ' +
                    'peer-placeholder-shown:text-base peer-placeholder-shown:text-text/50 peer-placeholder-shown:top-4.75 peer-placeholder-shown:-z-1 peer-placeholder-shown:bg-transparent ' +
                    'peer-focus:z-1 peer-focus:text-brand peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-bgMain '
                }
            >
                {required ? `${label}*` : label}
            </label>
            {error && <p className={'text-sm text-red-400 ml-4.25'}>{error}</p>}
        </div>
    );
}
