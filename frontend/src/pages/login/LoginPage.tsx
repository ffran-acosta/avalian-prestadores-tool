import { loginRequest } from "../../services"

const LoginPage = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const name = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        const response = await loginRequest(name, password)
        console.log(response);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="name" placeholder="Ingrese Usuario" />
            <input type="password" placeholder="********" />
            <button>
                Login
            </button>
        </form>
    )
}
export default LoginPage;
