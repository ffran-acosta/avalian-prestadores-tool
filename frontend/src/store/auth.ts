import { createStore } from 'zustand';
import { UserState } from '../model';
import { persist } from 'zustand/middleware';


const useStore = createStore(persist<UserState>((set) => ({
    token: null,
    user: null,
    setToken: (token) => set(() => ({ token })),
    setUser: (user) => set(() => ({ user })),
}), {
    name: 'auth',
}));

export default useStore;
