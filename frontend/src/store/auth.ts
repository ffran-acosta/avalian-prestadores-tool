import { create } from 'zustand';
import { UserState } from '../model';
import { persist } from 'zustand/middleware';

export const useStore = create(persist<UserState>((set) => ({
    token: null,
    user: null,
    isLoggedIn: false,
    setToken: (token) => set(() => ({ token })),
    setUser: (user) => set(() => ({ user })),
    setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
}), {
    name: 'auth-store',
}));

export const getAuthToken = () => {
    const authStore = localStorage.getItem('auth-store');
    if (authStore) {
        const { state } = JSON.parse(authStore);
        return state.token;
    }
    return null;
};

export const getUserId = () => {
    const authStore = localStorage.getItem('auth-store');
    if (authStore) {
        const { state } = JSON.parse(authStore);
        return state.user.id;
    }
    return null;
};

export const getRequestConfig = () => {
    const token = getAuthToken();
    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }
    return null;
};