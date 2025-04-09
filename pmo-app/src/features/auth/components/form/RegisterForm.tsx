import {
    InputField,
    SubmitButton,
    StrengthMeter,
} from '../../../../components/form';

export function RegisterForm() {
    return (
        <form className="w-full">
            <InputField type="text" label="Email Address" width="full" />
            <InputField type="text" label="Master Password" width="full" />
            <StrengthMeter />
            <InputField
                type="text"
                label="Confirm Master Password"
                width="full"
            />
            <SubmitButton label="Register" width="full" />
        </form>
    );
}
