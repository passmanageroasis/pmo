import clsx from 'clsx';
import TextareaAutosize, {
    TextareaAutosizeProps,
} from 'react-textarea-autosize';

interface TextareaProps extends TextareaAutosizeProps {
    label: string;
    name: string;
    error?: string | boolean;
    className?: string;
}

const Textarea = ({
    label,
    error,
    name,
    required,
    className,
    placeholder,
    disabled,
    ...props
}: TextareaProps) => {
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
            <TextareaAutosize
                className={clsx(
                    'w-full border-1 px-3 py-2 rounded-lg field-sizing-content min-h-34.5 transition-colors duration-150 ease-out',
                    error
                        ? 'bg-red-400/5  border-red-400/50'
                        : 'focus:bg-text/5 placeholder-shown:bg-transparent border-border',
                    className,
                )}
                name={name}
                required={required}
                placeholder={placeholder}
                disabled={disabled}
                minRows={5}
                maxRows={20}
                {...props}
            />
            {error && <p className="text-sm text-red-400 ml-3.5">{error}</p>}
        </div>
    );
};

export default Textarea;
