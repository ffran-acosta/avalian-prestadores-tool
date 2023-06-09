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


// export const useProfileStore = create<ProfileState>((set) => ({
//     profileData: null,
//     setProfileData: (data) => set(() => ({ profileData: data })),
// }));
