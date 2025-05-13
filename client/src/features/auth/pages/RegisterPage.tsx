import RegisterForm from '@/features/auth/components/forms/RegisterForm.tsx';
import AuthPageHeader from '@/features/auth/components/AuthPageHeader.tsx';

const RegisterPage = () => {
    return (
        <div className={'flex flex-col items-center'}>
            <AuthPageHeader
                title={'Create a new account'}
                promptText={'Already have an account?'}
                promptLinkText={'Log In'}
                linkTo={'/login'}
            />
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
