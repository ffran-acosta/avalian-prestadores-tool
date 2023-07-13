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
                await importXSLX(file);
                obtenerDatosPrestadores();
            }
        } catch (error) {
            console.error('Error al importar el archivo XLSX:', error);
        }
    };
    return (
        <div className="flex justify-center mt-10 flex-wrap">
            <div className="flex w-full justify-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por Nombre o ID"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="p-2 border border-gray-800 rounded-md mr-4 w-1/3"
                />
                <button
                    className={standarBlueButton}
                    onClick={() => setShowModal(true)}
                >
                    Nuevo Prestador
                </button>
                <button
                    className={standarBlueButton}
                    onClick={handleExportClick}
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
                    />
                </label>
            </div>
            {showModal && <ModalCrearPrestador onClose={handleModalClose} />}

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
    );
};

export default PrestadoresList;


// import { exportXLSX, importXSLX } from '../../../services';
// import { standarBlueButton } from '../../../styles';

// const PrestadoresList = () => {

//     const handleExportClick = async () => {
//         try {
//             await exportXLSX();
//         } catch (error) {
//             console.error('Error al exportar a CSV:', error);
//         }
//     };

//     const handleImportClick = async () => {
//         try {
//             await importXSLX();
//         } catch (error) {
//             console.error('Error al importar XSLX:', error);
//         }
//     };

//     return (
//         <div className="flex justify-center mt-10 flex-wrap">
//             <div className="flex w-full justify-center mb-4">
//                 <button
//                     className={standarBlueButton}
//                     onClick={handleExportClick}
//                 >
//                     Exportar
//                 </button>
//                 <button
//                     className={standarBlueButton}
//                     onClick={handleImportClick}
//                 >
//                     Importar
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PrestadoresList;

// estoy trabajando en un proyecto que cuenta con frontend(react con typescript) y backend(nodejs con typescript) 
// quiero desarrollar una funcionalidad para cargar datos a la base de datos que tengo en postgres cargando una planilla las columnas de la planilla son las siguientes:
// ID	PRESTADOR	LOCALIDAD	TIPO	YEAR	ENE	FEB	MAR	ABR	MAY	JUN	JUL	AGO	SEP	OCT	NOV	DIC
// aclaro que en cada prestador puede contener mas de una fila de años con  sus 12 valores en los meses, osea que entre prestadores puede haber celdas de id prestador localidad y tipo en blanco.
// te voy a mostrar el codigo que tengo: la vista de react primero a la que le quiero dar la funcionalidad, la request.service que hace la llamada al backend, el controllador del backend, modelo del backend, y tambien un controllador que tengo en otro archivo que carga prestadores a la abse que tal vez se puede utilizar.entendiste todo ?

