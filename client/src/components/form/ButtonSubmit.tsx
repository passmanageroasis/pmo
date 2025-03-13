interface ButtonSubmitProps {
    text: string;
}

export function ButtonSubmit({ text }: ButtonSubmitProps) {
    return <button type="submit" className={'w-full p-4 rounded-md text-white bg-brand font-bold cursor-pointer mt-3'}>{text}</button>;
}
