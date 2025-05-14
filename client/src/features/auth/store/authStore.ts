import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            login: () => set({ isAuthenticated: true }),
            logout: () => set({ isAuthenticated: false }),
        }),
        {
            name: 'user-auth',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

// Optional: A way to initialize the store based on an existing token
// This would typically be called once when your application loads.
export const initializeAuthStatus = () => {
    // Example: Check for a token in localStorage
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   // You might want to validate the token here with your backend
    //   // For simplicity, we'll just assume if a token exists, the user is authenticated.
    //   useAuthStore.getState().setIsAuthenticated(true);
    // } else {
    //   useAuthStore.getState().setIsAuthenticated(false);
    // }
    // If you don't have an external token and just rely on the persisted 'isAuthenticated'
    // value from Zustand, you don't need to do anything extra here for initialization,
    // as the `persist` middleware handles loading it from localStorage automatically.
    // The `isAuthenticated: false` in the store definition acts as the initial default
    // *if nothing is found in localStorage*.
};
