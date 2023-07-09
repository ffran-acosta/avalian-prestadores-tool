import React, { useState } from 'react';
import { singupRequest, userExists } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { h2, standarBlueButton, standarGrayButton, inputStyles, span, label, errorMessage, digLogReg } from '../../../styles';

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
        <div className={`${digLogReg}`}>
            <h2 className={`${h2}`}>REGISTRATE</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className={`${label}`}>Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        className={`${inputStyles}`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className={`${label}`}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className={`${inputStyles}`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className={`${label}`}>Contraseña</label>
                    <div className="flex">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className={`${inputStyles}`}
                        />
                        <button
                            type="button"
                            onClick={handleTogglePasswordVisibility}
                            className={`${standarGrayButton}`}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className={`${label}`}>Confirma Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        className={`${inputStyles}`}
                    />
                </div>
                {fieldError && <p className={`${errorMessage}`}>{fieldError}</p>}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className={`${standarBlueButton}`}
                    >
                        Confirmar Registro
                    </button>
                </div>
                <div className="flex items-center mt-12">
                    <span className={`${span}`}>Ya tenes cuenta?</span>
                    <Link
                        to="/login"
                        className={`${standarGrayButton}`}
                    >
                        Log In
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;

