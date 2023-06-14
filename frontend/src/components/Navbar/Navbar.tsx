const Navbar = () => {
    return (
        <div className="bg-blue-500 flex w-full">
            <nav className="flex w-full items-center justify-between p-4">
                <div className="text-white font-bold text-xl">
                    <a href="/">CENTRO DE GESTION</a>
                </div>
                <ul className="flex space-x-4">
                    {/* <li>
                        <a href="#" className="text-white hover:text-gray-300">Buscador</a>
                    </li> */}
                    <li>
                        <a href="/prestadores" className="text-white hover:text-gray-300">Listado Completo</a>
                    </li>
                    <li>
                        <a href="/profile" className="text-white hover:text-gray-300">Perfil</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar