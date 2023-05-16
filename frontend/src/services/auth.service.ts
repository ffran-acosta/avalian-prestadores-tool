import axios from "axios";

export const loginRequest = async (name: string, password: string) => {
    return await axios.post('http://localhost:3030/users/auth/login', {
        name: name,
        password: password
    })
}