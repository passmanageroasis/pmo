import { useForm } from '@tanstack/react-form';
import { InputField, ButtonSubmit, Textarea } from '@/components/form';
import { LoginEntry } from '@/features/vault/types';

interface LoginEntryFormValues {
    entryName: string;
    urls?: string[];
    username?: string;
    password?: string;
    notes?: string;
    tags?: string[];
}

const LoginEntryForm = () => {
    const form = useForm({
        defaultValues: {
            entryName: '',
            urls: [],
            username: '',
            password: '',
            notes: '',
            tags: [],
        } as LoginEntryFormValues,
        onSubmit: async ({ value }) => {
            console.log('Submitting Login Entry:', value);
            const payload: LoginEntry = {
                entryType: 'login',
                name: value.entryName,
                tags: [],
                notes: value.notes,
                username: value.username,
                password: value.password,
                urls: value.urls,
            };
            console.log({
                entryType: payload.entryType,
                name: payload.name,
                tags: payload.tags,
                notes: payload.notes,
                urls: payload.urls,
            });
            // encrypt payload and post to api
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="flex flex-col gap-4"
        >
            <form.Field
                name="entryName"
                validators={{
                    onChange: ({ value }) =>
                        !value ? 'Name is required.' : undefined,
                }}
            >
                {(field) => (
                    <InputField
                        label="Entry Name"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        error={field.state.meta.errors.join(', ')}
                        required
                    />
                )}
            </form.Field>

            <form>
                <form.Field name="urls">
                    {(field) => (
                        <InputField
                            label="URL (Optional)"
                            name={field.name}
                            type="url"
                            value={field.state.value}
                            onChange={(e) =>
                                field.handleChange([e.target.value])
                            }
                            onBlur={field.handleBlur}
                            error={field.state.meta.errors.join(', ')}
                        />
                    )}
                </form.Field>
            </form>

            <div className={'flex gap-4 md:gap-8'}>
                <form.Field name="username">
                    {(field) => (
                        <InputField
                            label="Email / Username (Optional)"
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            error={field.state.meta.errors.join(', ')}
                        />
                    )}
                </form.Field>
                <form.Field name="password">
                    {(field) => (
                        <InputField
                            label="Password (Optional)"
                            name={field.name}
                            type="password"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            error={field.state.meta.errors.join(', ')}
                        />
                    )}
                </form.Field>
            </div>

            <form.Field name="notes">
                {(field) => (
                    <Textarea
                        label="Notes (Optional)"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        error={field.state.meta.errors.join(', ')}
                    />
                )}
            </form.Field>

            <ButtonSubmit text="Create Login Entry" />
        </form>
    );
};

export default LoginEntryForm;
