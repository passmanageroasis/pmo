/*import {InputField, SubmitButton} from "../components/form";*/
import { LoginForm } from '../features/auth/components/form/LoginForm.tsx';
import { AuthLayout } from '../layouts/AuthLayout.tsx';
import { Link } from 'react-router';

export default function LoginPage() {
    return (
        <AuthLayout heading="Welcome back!">
            <LoginForm />
            <div className="opacity-50 flex items-center mt-4 mb-2">
                <div className="w-full h-px bg-white"></div>
                <p className="mx-1.5 text-xs">OR</p>
                <div className="w-full h-px bg-white"></div>
            </div>
            <p className="text-white text-center">
                Don't have an account?
                <Link to="/register" className="text-link underline">
                    {' '}
                    Register an account
                </Link>
            </p>
        </AuthLayout>
    );
}
