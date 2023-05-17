const Navbar = () => {
    return (
        <div className="bg-gray-800">
            <nav className="flex items-center justify-between p-4">
                <div className="text-white font-bold text-xl">Logo</div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Inicio</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Acerca</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Servicios</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Contacto</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar