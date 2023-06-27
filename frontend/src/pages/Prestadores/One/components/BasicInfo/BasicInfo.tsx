import { PrestadorPage } from "../../../../../model"
import { historicNominalInterestRates, historicEffectiveInterestRates } from "../../../../../util"

const BasicInfo: React.FC<PrestadorPage> = ({ prestador }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Prestador</th>
                        <th>Localidad</th>
                        <th>Tipo</th>
                        <th>Total Lineal</th>
                        <th>Total Acumulado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={prestador.id}>
                        <td>{prestador.id}</td>
                        <td>{prestador.prestador}</td>
                        <td>{prestador.localidad}</td>
                        <td>{prestador.tipo}</td>
                        <td>1 %</td>
                        <td>1 %</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default BasicInfo