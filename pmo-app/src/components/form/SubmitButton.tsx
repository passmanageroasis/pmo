interface ButtonProperties {
    label: string;
    width?: 'full' | 'auto';
}

export function SubmitButton({ label, width = 'full' }: ButtonProperties) {
    return (
        <button
            className={`bg-brand rounded-md h-12 w-${width} px-4 text-white font-bold`}
        >
            {label}
        </button>
    );
}
