/*import {InputField, SubmitButton} from "../components/form";*/
import { RegisterForm } from '../features/auth/components/form/RegisterForm.tsx';
import { AuthLayout } from '../layouts/AuthLayout.tsx';
import { Link } from 'react-router';

export default function RegisterPage() {
    return (
        <AuthLayout heading="Create an account">
            <RegisterForm />
            <div className="opacity-50 flex items-center mt-4 mb-2">
                <div className="w-full h-px bg-white"></div>
                <p className="mx-1.5 text-xs">OR</p>
                <div className="w-full h-px bg-white"></div>
            </div>
            <p className="text-white text-center">
                Already have an account?
                <Link to="/login" className="text-link underline">
                    {' '}
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}
