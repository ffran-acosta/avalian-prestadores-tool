import React, { useState } from 'react';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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

    const handleRegister = () => {
        // Perform registration logic
        if (password !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
        } else if (password.length < 8 || !/\d/.test(password)) {
            setPasswordError('La contraseña debe tener una longitud de 8 caractares y contener al menos un numero');
        } else {
            setPasswordError('');
            // Continue with registration process
            console.log('Registering...');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-medium text-center mb-6">REGISTRATE</h2>

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
                {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
                
                {/* REGISTER BUTTON */}
                <div className="flex justify-center">
                    <button onClick={handleRegister} className="bg-[#006647] hover:bg-[#11bc66]  text-white py-2 px-4 rounded-md text-sm font-medium">
                        Confirmar Registro
                    </button>
                </div>
            </div >
        </div>
    );
};

export default Register;

