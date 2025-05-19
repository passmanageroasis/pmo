import { AiOutlineLoading } from 'react-icons/ai';

const FullPageLoader = () => {
    return (
        <div
            className={
                'h-screen h-dvh w-screen bg-bgDarker flex flex-col items-center justify-center fixed top-0'
            }
        >
            <AiOutlineLoading className={'animate-spin h-16 w-16 text-brand'} />
            <span className={'text-lg mt-6'}>
                &copy; 2025 Pass Manager Oasis
            </span>
        </div>
    );
};

export default FullPageLoader;
