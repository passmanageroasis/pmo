import { LandingLayout } from '../layouts/LandingLayout.tsx';
import { Link } from 'react-router';
import { SubmitButton } from '../components/form';

export default function LandingPage() {
    return (
        <LandingLayout heading="Your Digital Security Oasis">
            <SubmitButton label="Create an account" />
            <SubmitButton label="Log in" />
            <Link to="/login" className="text-link underline">
                {' '}
                Log in
            </Link>
        </LandingLayout>
    )
}