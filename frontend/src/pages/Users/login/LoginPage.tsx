import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest, userExists } from '../../../services';
import { useStore } from '../../../store';
import { h2, standarBlueButton, standarGrayButton, inputStyles, span, label, errorMessage, digLogReg } from '../../../styles';

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } 
        if (name === 'password') {
            setPassword(value);
        } 
    };

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username || !password) {
            setFieldError('Hay campos incompletos');
            return;
        }
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

    return (
        <div className={`${digLogReg}`}>
            <h2 className={`${h2}`}>LOGIN</h2>
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
                    <label htmlFor="password" className={`${label}`}>Contraseña</label>
                    <div className="flex">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className={inputStyles}
                        />
                        <button
                            type="button"
                            onClick={handleToggleShowPassword}
                            className={`${standarGrayButton}`}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                </div>
                {fieldError && <p className={`${errorMessage}`}>{fieldError}</p>}
                {loginErr && <p className={`${errorMessage}`}>{loginErr}</p>}
                <div className="mb-4 flex justify-between items-center">
                    <Link to="#" className="text-blue-600 hover:underline text-sm">
                        Olvidaste tu contraseña?
                    </Link>
                    <button className={`${standarBlueButton}`}>
                        Login
                    </button>
                </div>
                <div className="flex items-center">
                    <span className={`${span}`}>No tenes cuenta?</span>
                    <Link
                        to="/signup"
                        className={`${standarGrayButton}`}
                    >
                        Registrate
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;