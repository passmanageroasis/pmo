import Section from '@/components/ui/Section.tsx';
import { VaultEntryTypeValue } from '@/types/vaultEntryTypes.ts';
import { ReactNode, useState } from 'react';
import LoginEntryForm from '@/features/vault/components/forms/LoginEntryForm.tsx';
import { Select } from '@/components/form';

const NewVaultEntryPage = () => {
    const [selectedEntryType, setSelectedEntryType] =
        useState<VaultEntryTypeValue>('login');

    const entryForms: { [key in VaultEntryTypeValue]?: ReactNode } = {
        login: <LoginEntryForm />,
    };

    return (
        <>
            <h1 className={'text-3xl mb-4'}>Create New Entry</h1>
            <Section>
                <Select
                    label={'Type:'}
                    name={'type'}
                    value={selectedEntryType}
                    onChange={(e) =>
                        setSelectedEntryType(
                            e.target.value as VaultEntryTypeValue,
                        )
                    }
                >
                    <option value="login">Login</option>
                    <option value="card">Card</option>
                    <option value="secureNote">Security Note</option>
                </Select>
                {entryForms[selectedEntryType]}
            </Section>
        </>
    );
};

export default NewVaultEntryPage;

/*
import { ButtonSubmit, InputField, Select, Textarea } from '@/components/form';
import Section from '@/components/ui/Section.tsx';
import { useForm } from '@tanstack/react-form';

interface NewEntryFormValues {
    type:

};

const NewVaultEntryPage = () => {
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
        <>
            <h1 className={'text-3xl mb-4'}>Create New Entry</h1>
            <Section>
                <form className={'max-w-xl flex flex-col gap-4'}>
                    <form.Field
                        name={'email'}
                        validators={{
                            onChange: ({ value }) => {
                                const emailRegex =
                                    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                                return (
                                    !emailRegex.test(value) &&
                                    'Please enter a valid email.'
                                );
                            },
                        }}
                    >
                        {(field) => <InputField label={'Name'} name={'name'} />}
                    </form.Field>

                    <Select
                        label={'Type:'}
                        name={'type'}
                        value={entryForm.type}
                        onChange={handleChange}
                    >
                        <option value="login">Login</option>
                        <option value="card">Card</option>
                        <option value="securityNote">Security Note</option>
                    </Select>

                    {entryForm.type === 'login' && (
                        <>
                            <InputField label={'URL'} name={'url'} />
                            <div className={'flex gap-8'}>
                                <InputField
                                    label={'Email / Username'}
                                    name={'username'}
                                />
                                <InputField
                                    label={'Password'}
                                    name={'password'}
                                    type={'password'}
                                />
                            </div>
                        </>
                    )}
                    {entryForm.type === 'card' && (
                        <>
                            <InputField
                                label={'Card number:'}
                                name={'cardNumber'}
                            />
                            <div className={'flex gap-8'}>
                                <InputField
                                    label={`Name on card:`}
                                    name={'cardName'}
                                />
                                <InputField
                                    label={'Expiry date:'}
                                    name={'cardExpiry'}
                                />
                            </div>
                        </>
                    )}
                    <Textarea label={'Notes'} name={''} />
                    <ButtonSubmit text={'Create Entry'} />
                </form>
            </Section>
        </Section>
    );
};

export default NewVaultEntryPage;
*/
