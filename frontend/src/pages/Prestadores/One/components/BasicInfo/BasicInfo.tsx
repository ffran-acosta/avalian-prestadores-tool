import { Prestador } from "../../../../../model";
import { historicTNA } from "../../../../../util"

interface TablaPrestadorProps {
    prestador: Prestador;
}

const BasicInfo: React.FC<TablaPrestadorProps> = ({ prestador }) => {
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
                        <td>{historicTNA(prestador.years)}</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default BasicInfo