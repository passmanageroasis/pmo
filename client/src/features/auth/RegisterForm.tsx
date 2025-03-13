import { ButtonSubmit, InputField } from '../../components';
import { useState, ChangeEvent } from 'react';

export function RegisterForm() {
    const [form, setForm] = useState({
        email: '',
        masterPassword: '',
        confirmMasterPassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        masterPassword: '',
        confirmMasterPassword: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prevForm) => {
            const updatedForm = { ...prevForm, [name]: value };

            if (name === 'masterPassword') {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    masterPassword:
                        value.length && value.length < 12
                            ? 'Password must be at least 12 characters long.'
                            : '',
                }));
            }

            if (name === 'masterPassword' || name === 'confirmMasterPassword') {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmMasterPassword:
                        updatedForm.confirmMasterPassword &&
                        updatedForm.confirmMasterPassword !==
                            updatedForm.masterPassword
                            ? 'Passwords do not match.'
                            : '',
                }));
            }

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
            />
            <div className={'w-full flex justify-center items-center gap-2'}>
                <div
                    className={
                        'w-full h-2 bg-white/30 rounded-full overflow-hidden'
                    }
                >
                    <div
                        style={{
                            width: `${(form.masterPassword.length / 16) * 100}%`,
                        }}
                        className={`h-full bg-white transition-all duration-500 ease-out`}
                    />
                </div>
                <span className={'text-sm'}>Strength</span>
            </div>
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
