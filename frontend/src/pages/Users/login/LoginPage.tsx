import React, { useState } from 'react';
import { loginRequest } from '../../../services';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        // Handle login logic here
        console.log('Logging in...');
    };

    const handleRegister = () => {
        // Handle register logic here
        console.log('Registering...');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const name = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        const response = await loginRequest(name, password)
        console.log(response);
    }

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-medium text-center mb-6">LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Usuario</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
                    <div className="flex">
                        <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={handlePasswordChange} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700" />
                        <button type="button" onClick={handleToggleShowPassword} className="ml-2 px-2 py-1 bg-gray-200 rounded-md text-gray-700 text-sm">
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                </div>
                <div className="mb-4 flex justify-between items-center">
                    <a href="#" className="text-blue-600 hover:underline text-sm">Olvidaste tu contraseña?</a>
                    <button onClick={handleLogin} className="bg-[#006647] hover:bg-[#11bc66]  text-white py-2 px-4 rounded-md text-sm font-medium">
                        Login
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">No tenes cuenta?</span>
                    <button onClick={handleRegister} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-sm font-medium">
                        Register
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Login;