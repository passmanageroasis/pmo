import { InputField, ButtonSubmit } from '@/components/form';
import LinkPrompt from '@/features/auth/components/LinkPrompt.tsx';
import AuthForm from '@/features/auth/components/AuthForm.tsx';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/services/api/auth/registerApi.ts';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

interface RegisterFormValues {
    email: string;
    masterPassword: string;
    confirmMasterPassword: string;
}

const RegisterForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelector('input')?.focus();
    }, []);

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log('Registration successful:', data);
            alert(`Registration successful: ${data.message}`);
            navigate('/login');
        },
        onError: (error) => {
            console.error('Registration error:', error);
            alert(`Registration failed: ${error.message}`);
        },
    });

    const form = useForm({
        defaultValues: {
            email: '',
            masterPassword: '',
            confirmMasterPassword: '',
        } as RegisterFormValues,
        onSubmit: async ({ value }) => {
            await registerMutation.mutateAsync(value);
        },
    });

    return (
        <AuthForm
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.Field
                name={'email'}
                validators={{
                    onChange: ({ value }) => {
                        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                        return (
                            !emailRegex.test(value) &&
                            'Please enter a valid email.'
                        );
                    },
                }}
            >
                {(field) => (
                    <InputField
                        label={'Email'}
                        name={'email'}
                        type={'email'}
                        autoComplete={'off'}
                        required
                        disabled={registerMutation.isPending}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={
                            field.state.value &&
                            field.state.meta.errors.join(', ')
                        }
                    />
                )}
            </form.Field>

            <form.Field
                name={'masterPassword'}
                validators={{
                    onChange: ({ value }) => {
                        return (
                            value.length < 14 &&
                            'Password must have at least 14 characters.'
                        );
                    },
                }}
            >
                {(field) => (
                    <InputField
                        label={'Master password'}
                        name={'masterPassword'}
                        type={'password'}
                        required
                        disabled={registerMutation.isPending}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={
                            field.state.value &&
                            field.state.meta.errors.join(', ')
                        }
                    />
                )}
            </form.Field>

            <form.Field
                name={'confirmMasterPassword'}
                validators={{
                    onChangeListenTo: ['masterPassword'],
                    onChange: ({ value, fieldApi }) => {
                        return (
                            value !==
                                fieldApi.form.getFieldValue('masterPassword') &&
                            'Passwords do not match.'
                        );
                    },
                }}
            >
                {(field) => (
                    <InputField
                        label={'Confirm password'}
                        name={'confirmMasterPassword'}
                        type={'password'}
                        required
                        disabled={registerMutation.isPending}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={
                            field.state.value &&
                            field.state.meta.errors.join(', ')
                        }
                    />
                )}
            </form.Field>

            <LinkPrompt
                promptText={'By clicking Register, you agree to our'}
                promptLinkText={'Terms of Service'}
                linkTo={'https://passmanager.app/terms'}
                className={'text-xs'}
            />

            <ButtonSubmit
                text={'Register'}
                loading={registerMutation.isPending}
                disabled={registerMutation.isPending}
            />
        </AuthForm>
    );
};

export default RegisterForm;
