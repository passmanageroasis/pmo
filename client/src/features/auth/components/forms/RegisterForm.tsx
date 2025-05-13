import { InputField, ButtonSubmit } from '@/components/form';
import LinkPrompt from '@/features/auth/components/LinkPrompt.tsx';
import AuthForm from '@/features/auth/components/AuthForm.tsx';
import { useState } from 'react';

const RegisterForm = () => {
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
                name={'masterPassword'}
                type={'password'}
                required
            />

            <InputField
                label={'Confirm Master password'}
                name={'confirmMasterPassword'}
                type={'password'}
                required
            />

            <LinkPrompt
                promptText={'By clicking Register, you agree to our'}
                promptLinkText={'Terms of Service'}
                linkTo={'https://passmanager.app/terms'}
                className={'text-xs'}
            />

            <ButtonSubmit
                text={'Register'}
                loading={isLoading}
                disabled={isLoading}
            />
        </AuthForm>
    );
};

export default RegisterForm;
