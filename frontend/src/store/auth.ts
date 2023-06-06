import { create } from 'zustand';
import { UserState } from '../model';
import { persist } from 'zustand/middleware';

export const useStore = create(persist<UserState>((set) => ({
    token: null,
    user: null,
    setToken: (token) => set(() => ({ token })),
    setUser: (user) => set(() => ({ user })),
}), {
    name: 'auth',
}));

