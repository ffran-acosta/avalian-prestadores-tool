import axios from "axios";

export const loginRequest = async (name: string, password: string) => {
    return await axios.post('http://localhost:3031/users/auth/login', {
        name: name,
        password: password
    })
}

export const singupRequest = async (name: string, email: string, password: string) => {
    return await axios.post('http://localhost:3031/users/create', {
        name: name,
        email: email,
        password: password
    })
}

export const prestadoresRequest = async () => {
    try {
        const authStore = localStorage.getItem('auth-store'); // Obtén el valor del Local Storage
        if (authStore) {
            const { state } = JSON.parse(authStore);
            const token = state.token;
            const response = await axios.get('http://localhost:3031/api/prestadores/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response?.data;
            return data;
        }
    } catch (error) {
        console.error('Error al obtener los prestadores:', error);
    }
};