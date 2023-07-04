export interface User {
    id?: number;
    name: string;
    password: string;
    email?: string;
}

export interface UserState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}
