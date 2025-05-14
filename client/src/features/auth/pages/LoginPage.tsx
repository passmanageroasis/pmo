import AuthPageHeader from '@/features/auth/components/AuthPageHeader.tsx';
import LoginForm from '@/features/auth/components/forms/LoginForm.tsx';

const LoginPage = () => {
    return (
        <div className={'flex flex-col items-center'}>
            <AuthPageHeader
                title={'Welcome back!'}
                promptText={`Don't have an account?`}
                promptLinkText={'Register'}
                linkTo={'/register'}
            />
            <LoginForm />
        </div>
    );
};

export default LoginPage;
