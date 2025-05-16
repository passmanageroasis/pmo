import { ButtonSubmit, InputField, Select, Textarea } from '@/components/form';
import { ChangeEvent, useState } from 'react';
import Section from '@/features/dashboard/components/Section.tsx';

const NewVaultEntryPage = () => {
    const [entryForm, setEntryForm] = useState({
        type: 'login',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e:
            | ChangeEvent<HTMLSelectElement>
            | ChangeEvent<HTMLTextAreaElement>
            | ChangeEvent<HTMLInputElement>,
    ) => {
        setEntryForm((form) => ({
            ...form,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <h1 className={'text-3xl mb-4'}>Create New Entry</h1>
            <Section>
                <form
                    className={'max-w-xl flex flex-col gap-4'}
                    onSubmit={() => {
                        setIsLoading(true);
                    }}
                >
                    <InputField label={'Title'} name={'title'} />

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
                    <ButtonSubmit text={'Create Entry'} loading={isLoading} />
                </form>
            </Section>
        </>
    );
};

export default NewVaultEntryPage;
