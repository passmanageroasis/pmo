import { AuthLayout } from '../layouts';
import { LoginForm } from '../features/auth';
import { Link } from 'react-router';

export function LoginPage() {
    return (
        <AuthLayout title="Welcome back!">
            <LoginForm />
            <div className="opacity-50 flex items-center w-full mt-2">
                <div className="w-full h-px bg-white" />
                <p className="mx-2 text-sm">OR</p>
                <div className="w-full h-px bg-white" />
            </div>
            <p className={'whitespace-nowrap'}>
                Don't have an account?{' '}
                <Link to="/register" className={'text-link hover:underline'}>
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}
