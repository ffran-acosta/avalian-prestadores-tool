import { useEffect, useState, ChangeEvent } from 'react';
import { Prestador } from '../../../model';
import { Link } from 'react-router-dom';
import { lastYearCalculate } from '../../../util';
import { exportXLSX, importXSLX, prestadoresRequest } from '../../../services';
import ModalCrearPrestador from './components/Modal/CreatePrestador';
import { standarBlueButton } from '../../../styles';

const PrestadoresList = () => {
    const [prestadores, setPrestadores] = useState<Prestador[]>([]);
    const [prestadorSeleccionado, setPrestadorSeleccionado] = useState<Prestador | null>(null);
    const [filtro, setFiltro] = useState<string>("");
    const [prestadoresFiltrados, setPrestadoresFiltrados] = useState<Prestador[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar el círculo de carga

    const handleModalClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        obtenerDatosPrestadores();
    }, []);

    const obtenerDatosPrestadores = async () => {
        try {
            const data = await prestadoresRequest();
            setPrestadores(data);
        } catch (error) {
            console.log('Error al obtener los prestadores:', error);
        }
    };

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

    const handleExportClick = async () => {
        try {
            await exportXLSX();
        } catch (error) {
            console.error('Error al exportar a CSV:', error);
        }
    };

    const handleImportClick = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        try {
            if (file) {
                setIsLoading(true);
                await importXSLX(file);
                obtenerDatosPrestadores();
                setIsLoading(false); 
            }
        } catch (error) {
            console.error('Error al importar el archivo XLSX:', error);
            setIsLoading(false); 
        }
    };

    return (
        <div className="flex w-full justify-center mt-10 flex-wrap">
            <div className="flex w-full justify-center mb-4">
                <div className='flex w-1/4'>
                    <input
                        type="text"
                        placeholder="Buscar por Nombre o ID"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="w-full p-2 border border-gray-800 rounded-md mr-4"
                    />
                </div>
                <div className='flex w-1/4 justify-between'>
                    <button
                        className={standarBlueButton}
                        onClick={() => setShowModal(true)}
                    >
                        Nuevo Prestador
                    </button>
                    <button
                        className={standarBlueButton}
                        onClick={handleExportClick}
                        disabled={isLoading} 
                    >
                        Exportar
                    </button>
                    <label className={standarBlueButton}>
                        Importar
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept=".xlsx"
                            onChange={handleImportClick}
                            disabled={isLoading}
                        />
                    </label>
                </div>
            </div>
            {showModal && <ModalCrearPrestador onClose={handleModalClose} />}

            {isLoading && <div>Círculo de carga...</div>} 
            <div className='flex w-full justify-center'>
                <table>
                    <thead className="text-center">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Prestador</th>
                            <th className="p-4">Localidad</th>
                            <th className="p-4">Tipo</th>
                            <th className="p-4">Total Lineal</th>
                            <th className="p-4">Total Acumulado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prestadoresFiltrados.map((prestador) => (
                            <tr key={prestador.id}>
                                <td className="font-bold p-4">{prestador.id}</td>
                                <td className="p-4">
                                    <Link
                                        to={`/prestadores/${prestador.id}`}
                                        onClick={() => setPrestadorSeleccionado(prestador)}
                                    >
                                        {prestador.prestador}
                                    </Link>
                                </td>
                                <td className="p-4">{prestador.localidad}</td>
                                <td className="p-4">{prestador.tipo}</td>
                                <td className="font-bold">{lastYearCalculate(prestador.years, 'nominal')}%</td>
                                <td className="font-bold">{lastYearCalculate(prestador.years, 'effective')}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrestadoresList;