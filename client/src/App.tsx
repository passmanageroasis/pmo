import AppRouter from '@/AppRouter.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initializeAuth } from '@/features/auth/store/authStore.ts';
import { useEffect, useRef, useState } from 'react';
import FullPageLoader from '@/components/FullPageLoader.tsx';

const queryClient = new QueryClient();

const App = () => {
    const [isAuthInitialized, setIsAuthInitialized] = useState(false);
    const didInitialize = useRef(false);

    useEffect(() => {
        if (!didInitialize.current) {
            didInitialize.current = true;

            const performAuthCheck = async () => {
                await initializeAuth();
                setIsAuthInitialized(true);
            };

            performAuthCheck();
        }
    }, []);

    if (!isAuthInitialized) {
        return <FullPageLoader />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />
        </QueryClientProvider>
    );
};

export default App;
