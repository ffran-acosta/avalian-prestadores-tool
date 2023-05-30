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