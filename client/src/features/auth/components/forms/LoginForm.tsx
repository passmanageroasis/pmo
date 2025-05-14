import { InputField, ButtonSubmit } from '@/components/form';
import AuthForm from '@/features/auth/components/AuthForm.tsx';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/api/auth/loginApi.ts';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';

interface LoginFormValues {
    email: string;
    masterPassword: string;
    confirmMasterPassword: string;
}

const LoginForm = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelector('input')?.focus();
    }, []);

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log('Login successful:', data);
            login();
            alert(`Login successful: ${data.message}`);
            navigate('/vault');
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
        } as LoginFormValues,
        onSubmit: async ({ value }) => {
            await loginMutation.mutateAsync(value);
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
                        disabled={loginMutation.isPending}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={
                            field.state.value &&
                            field.state.meta.errors.join(', ')
                        }
                    />
                )}
            </form.Field>

            <form.Field name={'masterPassword'}>
                {(field) => (
                    <InputField
                        label={'Master password'}
                        name={'masterPassword'}
                        type={'password'}
                        required
                        disabled={loginMutation.isPending}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={
                            field.state.value &&
                            field.state.meta.errors.join(', ')
                        }
                    />
                )}
            </form.Field>

            <ButtonSubmit
                text={'Log in'}
                loading={loginMutation.isPending}
                disabled={loginMutation.isPending}
            />
        </AuthForm>
    );
};

export default LoginForm;
