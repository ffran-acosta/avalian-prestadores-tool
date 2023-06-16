import { VeloresReferenciales } from "../../../../../data";
import { Mes } from "../../../../../model";

const ReferentialValues = () => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {VeloresReferenciales.map((item: Mes) => (
                            <th key={item.mes}>{item.mes}</th>
                        ))}
                        <th>Tot Lineal</th>
                        <th>Tot Acum.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="font-bold">SSS</td>
                        {VeloresReferenciales.map((item: Mes) => (
                            <td key={item.mes}>{item.valor}</td>
                        ))}
                        <td className="font-bold">0</td>
                        <td className="font-bold">0</td>
                    </tr>
                    <tr>
                        <td className="font-bold">90%</td>
                    </tr>
                    <tr>
                        <td className="font-bold">???</td>
                    </tr>
                </tbody>
            </table>
            <div className='flex w-full justify-center'>
                <button
                    className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
                    // onClick={() => setModalOpen(true)}
                >
                    Editar Valores
                </button>
            </div>
        </div>
    );
};

export default ReferentialValues;