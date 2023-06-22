// import React, { useState } from 'react';
// import { Mes, Prestador, Year } from '../../../model';
// import { Prestadores } from '../../../data';

// const Dashboard: React.FC = () => {

//   const prestadores: Prestador[] = Prestadores

//   const prestador: Prestador = prestadores[0];

//   const [meses, setMeses] = useState<Mes[]>(prestadores[0].years[0].meses);

//   const handleModificarValor = (mesIndex: number, nuevoValor: number) => {
//     const nuevosMeses = [...meses];
//     nuevosMeses[mesIndex] = { ...nuevosMeses[mesIndex], valor: nuevoValor };
//     setMeses(nuevosMeses);
//   }  

//   const calcularTotalLineal = (año: Year) => {
//     let totalLineal = 0;
//     año.meses.forEach((mes) => {
//       totalLineal += mes.valor;
//     });
//     return totalLineal;
//   };

//   const calcularTotalAcumulado = (año: Year) => {
//     let totalAcumulado = 0;
//     año.meses.forEach((mes) => {
//       totalAcumulado += mes.valor;
//     });
//     return totalAcumulado;
//   };

//   return (
//     <div>
//       {/* <h1 className="text-center">{prestadores[0].prestador}</h1>
//       <h2 className="text-center">{prestadores[0].localidad}</h2> */}

//       <table className="w-4/5 mx-auto text-center mt-10">
//         <thead>
//           <tr className="text-xl ">
//             <th>ID</th>
//             <th>Prestador</th>
//             <th>Total Lineal</th>
//             <th>Total Acumulado</th>
//           </tr>
//         </thead>
//         <tbody className="text-lg">
//           {prestadores.map((dato) => (
//             <tr key={dato.id}>
//               <td>{dato.id}</td>
//               <td>{dato.prestador}</td>
//               <td>{calcularTotalLineal(dato.years[0])}</td>
//               <td>{calcularTotalAcumulado(dato.years[0])}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <table className="w-4/5 mx-auto text-center mt-10">
//         <thead className="text-xl" >
//           <tr>
//             <th>Mes</th>
//             <th>Valor</th>
//             {/* <th>Acciones</th> */}
//           </tr>
//         </thead>
//         <tbody className="text-lg">
//           {meses.map((mes, index) => (
//             <tr key={mes.mes}>
//               <td>{mes.mes}</td>
//               <td>
//                 <input
//                   className="text-center w-16"
//                   type="number"
//                   value={mes.valor} 
//                   onChange={(e) => handleModificarValor(index, Number(e.target.value))}
//                 />
//               </td>
//               {/* <td>
//                 <button onClick={() => handleModificarValor(index, 0)}>Reiniciar</button>
//               </td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;

