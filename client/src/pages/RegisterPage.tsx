import { AuthLayout } from '../layouts';
import { RegisterForm } from '../features/auth';
import { Link } from 'react-router';

export function RegisterPage() {
    return (
        <AuthLayout title="Create an account">
            <RegisterForm />
            <div className="opacity-50 flex items-center w-full mt-2">
                <div className="w-full h-px bg-white" />
                <p className="mx-2 text-sm">OR</p>
                <div className="w-full h-px bg-white" />
            </div>
            <p className={'whitespace-nowrap'}>
                Already have an account?{' '}
                <Link to="/login" className={'text-link hover:underline'}>
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}
