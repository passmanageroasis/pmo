import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            login: () => {
                set({ isAuthenticated: true });
            },
            logout: () => {
                set({ isAuthenticated: false });
            },
            setIsAuthenticated: (isAuthenticatedValue: boolean) =>
                set({ isAuthenticated: isAuthenticatedValue }),
        }),
        {
            name: 'user-auth',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const initializeAuth = async () => {
    const { setIsAuthenticated, logout } = useAuthStore.getState(); // Get actions from the store
    const apiServerURL = import.meta.env.VITE_API_SERVER_URL;

    try {
        console.log('Initializing auth: Validating session with backend...');

        const sessionResponse = await axios
            .get(`${apiServerURL}/auth/validate-session`, {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response.data.message);
                return response;
            });
        if (sessionResponse.data.data.is_valid) {
            setIsAuthenticated(true);
            await axios
                .get(`${apiServerURL}/auth/refresh-session`, {
                    withCredentials: true,
                })
                .then((response) => {
                    console.log(response.data.message);
                });
        } else {
            console.log('Session expired.');
            logout();
        }
    } catch {
        console.log('No valid session.');
        logout();
    }
};
