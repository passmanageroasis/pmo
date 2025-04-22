import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { ButtonSubmit, InputField } from '@/components';
import { useLogin } from '@/hooks/auth/useLogin.ts';

export function LoginForm() {
    const [form, setForm] = useState({
        email: '',
        masterPassword: '',
    });
    const loginMutation = useLogin();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        loginMutation.mutate(
            {
                email: form.email,
                masterPassword: form.masterPassword,
            },
            {
                onSuccess: () => navigate('/dashboard'),
            },
        );
    };

    return (
        <form className={'w-full'} onSubmit={handleSubmit}>
            <InputField
                label={'Email address'}
                name={'email'}
                required={true}
                type={'email'}
                value={form.email}
                onChange={handleChange}
            />
            <InputField
                label={'Master password'}
                name={'masterPassword'}
                required={true}
                type={'password'}
                value={form.masterPassword}
                onChange={handleChange}
                minLength={12}
            />
            <ButtonSubmit text={'Log in'} disabled={loginMutation.isPending} />
            {loginMutation.isError && (
                <div
                    className={
                        'w-full border-1 border-red-400 bg-red-400/25 text-red-400 p-2 text-center rounded-md mt-2'
                    }
                >
                    <p>{loginMutation.error.message || 'Login failed.'}</p>
                </div>
            )}
        </form>
    );
}
