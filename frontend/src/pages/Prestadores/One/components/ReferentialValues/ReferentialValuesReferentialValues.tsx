import { VeloresReferenciales } from "../../../../../data";
import { Mes } from "../../../../../model";

const ReferentialValues = () => {
    return (
        <div className='mt-10'>
            <table className="border border-gray-300 text-center">
                <thead>
                    <tr>
                        <th></th>
                        {VeloresReferenciales.map((item: Mes) => (
                            <th key={item.mes} className="border border-gray-300 p-2">{item.mes}</th>
                        ))}
                        <th className='p-4'>Tot Lineal</th>
                        <th className='p-4'>Tot Acum.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 p-2 font-bold">SSS</td>
                        {VeloresReferenciales.map((item: Mes) => (
                            <td key={item.mes} className="border border-gray-300 p-2">{item.valor}</td>
                        ))}
                        <td className='border border-gray-300 p-2 font-bold'>0</td>
                        <td className='border border-gray-300 p-2 font-bold'>0</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-2 font-bold">90%</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-2 font-bold">???</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ReferentialValues;