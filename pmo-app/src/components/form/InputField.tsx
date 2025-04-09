import { ChangeEvent } from 'react';

interface InputProperties {
    label?: string;
    type: 'text' | 'password' | 'email';
    width?: 'full' | 'auto';
    required?: boolean;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ label, type, width }: InputProperties) {
    return (
        <>
            <div className="relative">
                <input
                    className={`peer rounded-md h-12 w-${width} px-4 mb-4 border border-brand text-white focus:outline-1 placeholder-transparent focus:outline-brand`}
                    placeholder={label}
                    type={type}
                />
                <label className="absolute pointer-events-none z-1 left-3.25 -top-0.75 text-brand leading-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5.5 peer-placeholder-shown:text-gray-400 peer-focus:text-brand peer-focus:-top-0.75 peer-focus:text-sm peer-focus:z-1 bg-main px-1">
                    {label}
                </label>
            </div>
        </>
    );
}
