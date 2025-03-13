import { AuthLayout } from '../layouts';
import { RegisterForm } from '../features/auth';
import { Link } from 'react-router';

export function RegisterPage() {
    return (
        <AuthLayout title="Create an account">
            <RegisterForm />
            <p className={'whitespace-nowrap mt-2'}>
                Already have an account?{' '}
                <Link to="/login" className={'text-link hover:underline'}>
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
}
