import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
    accessToken: string;
    isAuthenticated: boolean;
    setAccessToken: (token: string) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: '',
            isAuthenticated: false,

            setAccessToken: (token) =>
                set(() => ({
                    accessToken: token,
                    isAuthenticated: true,
                })),

            clearAuth: () =>
                set(() => ({
                    accessToken: '',
                    isAuthenticated: false,
                })),
        }),
        {
            name: 'auth',
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);
