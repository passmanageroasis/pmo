import { ButtonSubmit, InputField } from '../../../../components';
import { useState, ChangeEvent } from 'react';
import { PasswordStrengthMeter } from '../../index.ts';

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

    return (
        <form className={'w-full'}>
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
            />
            <ButtonSubmit text={'Register'} />
        </form>
    );
}
