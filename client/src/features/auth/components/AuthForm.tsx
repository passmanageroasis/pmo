import { ReactNode, FormHTMLAttributes } from 'react';
import clsx from 'clsx';

interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
}

const AuthForm = ({ children, className, ...props }: AuthFormProps) => {
    return (
        <form
            className={clsx(
                'w-full flex flex-col gap-4 items-center',
                className,
            )}
            {...props}
        >
            {children}
        </form>
    );
};

export default AuthForm;
