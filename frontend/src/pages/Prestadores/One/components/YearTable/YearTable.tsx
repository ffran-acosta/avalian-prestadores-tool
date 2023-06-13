import { useState } from "react";
import { Year } from "../../../../../model"

interface YearTableProps {
  year: Year;
}

const YearTable: React.FC<YearTableProps> = ({ year })=> {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  
  const handleEditValues = (year: Year) => {
    setSelectedYear(year);
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center mt-10 flex-wrap w-3/5">
      <h3 className='w-full text-center text-2xl my-2'>{year.year}</h3>
      <div key={year.year} className="flex w-full justify-center">
        <div className="flex justify-center w-full">
          <table>
            <thead>
              <tr>
                {year.meses.map((mes) => (
                  <th key={mes.mes} className="py-2 px-4 border">
                    {mes.mes}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {year.meses.map((mes) => (
                  <td key={mes.mes} className="py-2 px-4 border text-center text-xl">
                    {mes.valor} %
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => handleEditValues(year)}
      >
        Editar Valores
      </button>

      
    </div>
  )
}
export default YearTable