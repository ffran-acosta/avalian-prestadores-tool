import { useEffect, useState } from 'react';
import { Prestadores } from '../../../data';
import { Prestador } from '../../../model';
import { Link } from 'react-router-dom';

const PrestadoresList = () => {

    const [prestadores, setPrestadores] = useState<Prestador[]>([]);
    const [prestadorSeleccionado, setPrestadorSeleccionado] = useState<Prestador | null>(null);

    const [filtro, setFiltro] = useState<string>("");
    const [prestadoresFiltrados, setPrestadoresFiltrados] = useState<Prestador[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('ruta-al-archivo/prestadores.json');
                const response = Prestadores
                // const data = await response.json();
                // setPrestadores(data);
                setPrestadores(response);
            } catch (error) {
                console.error('Error al obtener los prestadores:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (filtro === "") {
            setPrestadoresFiltrados(prestadores);
        } else {
            const prestadoresFiltrados = prestadores.filter((prestador) =>
                prestador.prestador.toLowerCase().includes(filtro.toLowerCase()) ||
                prestador.id.toString().includes(filtro)
            );
            setPrestadoresFiltrados(prestadoresFiltrados);
        }
    }, [filtro, prestadores]);

    return (
        <div className="flex justify-center mt-10 flex-wrap">
            <h1 className='flex w-full justify-center '>Lista de Prestadores</h1>
            <div className="flex w-full justify-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por Nombre o ID"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="p-2 border border-gray-800 rounded-md"
                />
            </div>
            <table>
                <thead className='text-center'>
                    <tr className="border border-gray-800 text-lg">
                        <th className='p-4'>ID</th>
                        <th className='p-4'>Prestador</th>
                        <th className='p-4'>Localidad</th>
                        <th className='p-4'>Tipo</th>
                        <th className='p-4'>Total Lineal</th>
                        <th className='p-4'>Total Acumulado</th>
                    </tr>
                </thead>
                <tbody className="text-center border border-gray-800">
                    {prestadoresFiltrados.map((prestador) => (
                        <tr className="border border-gray-800" key={prestador.id}>
                            <td className='p-4'>{prestador.id}</td>
                            <td className='p-4'>
                                <Link to={`/prestadores/${prestador.id}`} onClick={() => setPrestadorSeleccionado(prestador)}>
                                    {prestador.prestador}
                                </Link>
                            </td>
                            <td className='p-4'>{prestador.localidad}</td>
                            <td className='p-4'>{prestador.tipo}</td>
                            <td className='p-4'>0</td>
                            <td className='p-4'>0</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default PrestadoresList