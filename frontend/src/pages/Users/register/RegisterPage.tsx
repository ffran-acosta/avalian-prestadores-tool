import React, { useState } from 'react';
import { singupRequest, userExists } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fieldError, setFieldError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const users = await userExists();
            const existingUser = users.find(user => user.name === username || user.email === email);

            if (existingUser) {
                setFieldError('El nombre de usuario o el correo electrónico ya están en uso');
                return;
            }
            if (!username || !password || !email) {
                setFieldError('Hay campos incompletos');
                return;
            }
            if (username.length < 6) {
                setFieldError('El usuario debe contener al menos 6 caracteres');
                return;
            }
            if (password.length < 8 || !/\d/.test(password)) {
                setFieldError('La contraseña debe tener al menos 8 caracteres y al menos un dígito');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setFieldError('Email inválido');
                return;
            }
            setFieldError('');
            await singupRequest(username, email, password);
            navigate('/login');
        } catch (error) {
            console.error('Error al verificar la información del usuario:', error);
            setFieldError('Error al verificar la información del usuario');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-medium text-center mb-6">REGISTRATE</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
                    <div className="flex">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 pr-10"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePasswordVisibility}
                            className="ml-2 px-2 py-1 bg-gray-200 rounded-md text-gray-700 text-sm"
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirma Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
                    />
                </div>
                {fieldError && <p className="text-red-500 text-sm mb-4">{fieldError}</p>}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-[#0d48a6] text-white py-2 px-4 rounded-md text-sm font-medium"
                    >
                        Confirmar Registro
                    </button>
                </div>
                <div className="flex justify-between items-center mt-12">
                    <span className="text-sm">Ya tenes cuenta?</span>
                    <Link
                        to="/login"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-sm font-medium"
                    >
                        Log In
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;

