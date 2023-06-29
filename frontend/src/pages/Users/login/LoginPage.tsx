import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest, userExists } from '../../../services';
import { useStore } from '../../../store';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginErr, setLoginErr] = useState('');
    const [fieldError, setFieldError] = useState('');

    const setToken = useStore(state => state.setToken);
    const setUser = useStore(state => state.setUser);
    const setLogin = useStore(state => state.setIsLoggedIn);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            const users = await userExists();
            const existingUser = users.find(user => user.name === username || user.email === username);
            if (!existingUser) {
                setLoginErr('El nombre de usuario o el correo electrónico no existe');
                return;
            }
            const response = await loginRequest(username, password);
            if (response.status === 200) {
                setToken(response.data.token);
                setUser(response.data.user);
                setLogin(true);
                navigate('/prestadores');
            }
        } catch (error) {
            setLoginErr('Error durante el inicio de sesión');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username || !password) {
            setFieldError('HAY CAMPOS INCOMPLETOS');
            return;
        }
        handleLogin();
    };

    const inputStyles = 'w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700';
    const buttonStyles = 'py-2 px-4 rounded-md text-sm font-medium';

    return (
        <div className="max-w-md mx-auto mt-20 bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-medium text-center mb-6">LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className={inputStyles}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
                    <div className="flex">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={inputStyles}
                        />
                        <button
                            type="button"
                            onClick={handleToggleShowPassword}
                            className="ml-2 px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 text-gray-900 text-sm"
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                </div>
                {fieldError && <p className="text-red-500 text-sm mb-4">{fieldError}</p>}
                {loginErr && <p className="text-red-500 text-sm mb-4">{loginErr}</p>}
                <div className="mb-4 flex justify-between items-center">
                    <Link to="#" className="text-blue-600 hover:underline text-sm">
                        Olvidaste tu contraseña?
                    </Link>
                    <button className={`bg-blue-500 hover:bg-[#1139bc] text-white ${buttonStyles}`}>
                        Login
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">No tenes cuenta?</span>
                    <Link
                        to="/signup"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-sm font-medium"
                    >
                        Registrate
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;