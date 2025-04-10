import { ButtonSubmit, InputField } from '../../../../components/form';
import { useState, ChangeEvent } from 'react';

export function LoginForm() {
    const [form, setForm] = useState({
        email: '',
        masterPassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        masterPassword: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'masterPassword') {
            if (value.length > 0 && value.length < 12) {
                setFormErrors({
                    ...formErrors,
                    masterPassword:
                        'Password must be at least 12 characters long.',
                });
            } else {
                setFormErrors({ ...formErrors, masterPassword: '' });
            }
        }
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
            <ButtonSubmit text={'Log in'} />
        </form>
    );
}
