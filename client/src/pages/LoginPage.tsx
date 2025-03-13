import { AuthLayout } from '../layouts';
import { LoginForm } from '../features/auth';
import { Link } from 'react-router';

export function LoginPage() {
    return (
        <AuthLayout title="Welcome back!">
            <LoginForm />
            <p className={'whitespace-nowrap mt-2'}>
                Don't have an account?{' '}
                <Link to="/register" className={'text-link hover:underline'}>
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}
