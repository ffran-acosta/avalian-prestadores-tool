import React, { useState } from 'react';
import { singupRequest, userExists } from '../../../services';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fieldError, setFieldError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navitgate = useNavigate()

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        try {
            const users = await userExists();
            const existingUser = users.find(user => user.name === username || user.email === email);
            if (existingUser) {
                setFieldError('El nombre de usuario o el correo electrónico ya están en uso');
            } else {
                setFieldError('');
            }
        } catch (error) {
            console.error('Error al verificar la información del usuario:', error);
            setFieldError('Error al verificar la información del usuario');
        }
        if (!username || !password || !email) {
            setFieldError('HAY CAMPOS INCOMPLETOS');
        } else if (username.length < 6) {
            setFieldError('EL USUARIO DEBE CONTENER AL MENOS 6 CARACTERES');
        } else if (password.length < 8 || !/\d/.test(password)) {
            setFieldError('LA CONTRASEÑA DEBE TENER AL MENOS 8 CARACTERES Y AL MENOS UN DIGITO');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setFieldError('EMAIL INVALIDO');
            } else {
                setFieldError('');
                navitgate('/login')
            }
        }
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const userName = (event.currentTarget.elements[0] as HTMLInputElement).value
        const email = (event.currentTarget.elements[1] as HTMLInputElement).value
        const password = (event.currentTarget.elements[2] as HTMLInputElement).value
        await singupRequest(userName, email, password)
    }

    return (
        <div className="max-w-md mx-auto mt-20 bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-medium text-center mb-6">REGISTRATE</h2>
            <form onSubmit={handleSubmit}>

                {/* USERNAME */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Usuario</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700" />
                </div>

                {/* EMAIL */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700" />
                </div>

                {/* PASSWORD */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
                    <div className="flex">
                        <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={handlePasswordChange} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 pr-10" />
                        <button type="button" onClick={handleTogglePasswordVisibility} className="ml-2 px-2 py-1 bg-gray-200 rounded-md text-gray-700 text-sm">
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div >
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirma Contraseña</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700" />
                    </div>
                    {fieldError && <p className="text-red-500 text-sm mb-4">{fieldError}</p>}

                    {/* REGISTER BUTTON */}
                    <div className="flex justify-center">
                        <button onClick={handleRegister} className="bg-blue-500 hover:bg-[#11bc66]  text-white py-2 px-4 rounded-md text-sm font-medium">
                            Confirmar Registro
                        </button>
                    </div>
                </div >
            </form>
        </div>
    );
};

export default Register;

