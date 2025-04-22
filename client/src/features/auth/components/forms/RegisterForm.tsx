import { useState, ChangeEvent, FormEvent } from 'react';
import { ButtonSubmit, InputField } from '@/components/form';
import { PasswordStrengthMeter } from '@/features/auth';
import { useNavigate } from 'react-router';
import { useRegister } from '@/hooks/auth/useRegister.ts';

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export function RegisterForm() {
    const [form, setForm] = useState({
        email: '',
        masterPassword: '',
        confirmMasterPassword: '',
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        masterPassword: '',
        confirmMasterPassword: '',
    });
    const registerMutation = useRegister();
    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update form state
        setForm((prevForm) => {
            const updatedForm = { ...prevForm, [name]: value };
            const updatedErrors = { ...formErrors };

            // Handle password matching validation
            if (name === 'masterPassword' || name === 'confirmMasterPassword') {
                updatedErrors.confirmMasterPassword =
                    updatedForm.confirmMasterPassword &&
                    updatedForm.confirmMasterPassword !==
                        updatedForm.masterPassword
                        ? 'Passwords do not match.'
                        : '';
            }

            if (name === 'email') {
                updatedErrors.email =
                    value && !emailPattern.test(value)
                        ? 'Please enter a valid email.'
                        : '';
            }

            setFormErrors(updatedErrors);

            return updatedForm;
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerMutation.mutate(
            {
                email: form.email,
                masterPassword: form.masterPassword,
            },
            { onSuccess: () => navigate('/login') },
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
                error={formErrors.email}
            />
            <InputField
                label={'Master password'}
                name={'masterPassword'}
                required={true}
                type={'password'}
                value={form.masterPassword}
                onChange={handleChange}
                error={formErrors.masterPassword}
                minLength={12}
                onFocus={() => setMenu(true)}
                onBlur={() => setMenu(false)}
            />
            <PasswordStrengthMeter password={form.masterPassword} menu={menu} />
            <InputField
                label={'Confirm master password'}
                name={'confirmMasterPassword'}
                required={true}
                type={'password'}
                value={form.confirmMasterPassword}
                onChange={handleChange}
                error={formErrors.confirmMasterPassword}
                minLength={12}
                disabled={registerMutation.isPending}
            />
            <ButtonSubmit text={'Register'} />
            {registerMutation.isError && (
                <div
                    className={
                        'w-full border-1 border-red-400 bg-red-400/25 text-red-400 p-2 text-center rounded-md mt-2'
                    }
                >
                    <p>
                        {registerMutation.error.message ||
                            'Registration failed.'}
                    </p>
                </div>
            )}
        </form>
    );
}
