import AuthForm from '@/features/auth/components/AuthForm.tsx';
import { ButtonSubmit, InputField } from '@/components/form';
import { useState } from 'react';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthForm
            onSubmit={(e) => {
                e.preventDefault();
                setIsLoading(true);
            }}
        >
            <InputField label={'Email'} name={'email'} required />

            <InputField
                label={'Master password'}
                name={'master_password'}
                type={'password'}
                required
            />

            <ButtonSubmit
                text={'Log in'}
                loading={isLoading}
                disabled={isLoading}
            />
        </AuthForm>
    );
};

export default LoginForm;
