import { InputField, SubmitButton } from '../../../../components/form';

export function LoginForm() {
    return (
        <form className="w-full">
            <InputField type="text" label="Email Address" width="full" />
            <InputField type="text" label="Master Password" width="full" />
            <SubmitButton label="Log in" width="full" />
        </form>
    );
}
