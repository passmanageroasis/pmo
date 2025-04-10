import { ButtonSubmit, InputField } from '../../components/form';
import { PasswordStrengthMeter } from '../../features/auth';

export function Settings() {
    return (
        <div className="w-sm">
            <h1 className="text-2xl mb-5">Settings</h1>
            <section>
                <h2 className="text-lg">Account Information</h2>
                <form className="my-5">
                    <InputField label="Email" name="email" type="email" />
                    <ButtonSubmit text="Update profile" />
                </form>
            </section>
            <section>
                <h2 className="text-lg">Password</h2>
                <form className="my-5">
                    <InputField
                        label="Current password"
                        name="password"
                        type="password"
                    />
                    <InputField
                        label="New password"
                        name="newPassword"
                        type="password"
                    />
                    <PasswordStrengthMeter password={''} />
                    <InputField
                        label="Confirm password"
                        name="confirmPassword"
                        type="password"
                    />
                    <ButtonSubmit text="Change password" />
                </form>
            </section>
        </div>
    );
}
