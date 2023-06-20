import { VeloresReferenciales } from "../../../../../data";
import { Mes } from "../../../../../model";
import { ninetyPercent, ninetyPercentArray, oneYearNominalInterestRates, oneYearEffectiveInterestRates } from "../../../../../util";

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
                        <td className="font-bold">{oneYearNominalInterestRates(VeloresReferenciales)} %</td>
                        <td className="font-bold">{oneYearEffectiveInterestRates(VeloresReferenciales)} %</td>
                    </tr>
                    <tr>
                        <td className="font-bold">90%</td>
                        {VeloresReferenciales.map((item: Mes) => (
                            <td key={item.mes}>{ninetyPercent(item.valor)}</td>
                        ))}
                        <td className="font-bold">{ninetyPercentArray(VeloresReferenciales)} %</td>
                        <td className="font-bold"></td>
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