import { useStore } from "../../store";

const Navbar = () => {
    
    const { isLoggedIn, setToken, setUser, setIsLoggedIn } = useStore();
    const handleLogout = () => {
        localStorage.removeItem('auth-store');
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <div className="bg-blue-500 flex w-full">
            <nav className="flex w-full items-center justify-between p-4">
                <div className="text-white font-bold text-xl">
                    <a href="/">CENTRO DE GESTION</a>
                </div>
                <ul className="flex space-x-4">
                    {isLoggedIn ? (
                        // Sesión iniciada
                        <>
                            <li>
                                <a href="/prestadores" className="text-white hover:text-gray-300">Listado Completo</a>
                            </li>
                            <li>
                                <a href="/profile" className="text-white hover:text-gray-300">Perfil</a>
                            </li>
                            <li>
                                <a href="/login" className="text-white hover:text-gray-300" onClick={handleLogout}>
                                    Logout
                                </a>
                            </li>
                        </>
                    ) : (
                        // Sesión no iniciada
                        <li>
                            <a href="/login" className="text-white hover:text-gray-300">Login</a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;