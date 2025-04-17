//
// export const StakedList = () => {
//      const tasks = [
//         {
//             id: '1',
//             companyProject: 'Azienda 1 - Progetto 1',
//             activityTitle: 'Prima attività di progettazione cantiere',
//             dueDate: '15/06/2025',
//             status: 'In corso'
//         },
//         {
//             id: '2',
//             companyProject: 'Azienda 2 - Progetto Edificio A',
//             activityTitle: 'Approvazione planimetrie',
//             dueDate: '20/06/2025',
//             status: 'Da iniziare'
//         },
//         {
//             id: '3',
//             companyProject: 'Azienda 3 - Ristrutturazione',
//             activityTitle: 'Ordine materiali edili',
//             dueDate: '10/05/2025',
//             status: 'Scaduto'
//         },
//         {
//             id: '4',
//             companyProject: 'Azienda 4 - Nuovo cantiere',
//             activityTitle: 'Consegna documentazione sicurezza',
//             dueDate: '12/06/2025',
//             status: 'Urgente'
//         },
//         {
//             id: '5',
//             companyProject: 'Azienda 1 - Progetto 1',
//             activityTitle: 'Prima attività di progettazione cantiere',
//             dueDate: '15/06/2025',
//             status: 'In corso'
//         },
//         {
//             id: '6',
//             companyProject: 'Azienda 2 - Progetto Edificio A',
//             activityTitle: 'Approvazione planimetrie',
//             dueDate: '20/06/2025',
//             status: 'Da iniziare'
//         },
//         {
//             id: '7',
//             companyProject: 'Azienda 3 - Ristrutturazione',
//             activityTitle: 'Ordine materiali edili',
//             dueDate: '10/05/2025',
//             status: 'Scaduto'
//         },
//         {
//             id: '8',
//             companyProject: 'Azienda 4 - Nuovo cantiere',
//             activityTitle: 'Consegna documentazione sicurezza',
//             dueDate: '12/06/2025',
//             status: 'Urgente'
//         },
//         // Aggiungi altri task qui...
//     ];
//
//     const getStatusColor = (status: 'status') => {
//         switch (status) {
//             case 'Scaduto':
//                 return 'bg-red-100 text-red-800';
//             case 'Urgente':
//                 return 'bg-orange-100 text-orange-800';
//             case 'In corso':
//                 return 'bg-blue-100 text-blue-800';
//             case 'Da iniziare':
//                 return 'bg-gray-100 text-gray-800';
//             default:
//                 return 'bg-gray-100 text-gray-800';
//         }
//     };
//
//     return (
//         <div className="mt-10">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Attività in scadenza</h2>
//
//             <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
//                 {/* Intestazioni colonne */}
//                 <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                     <div className="col-span-3">Azienda/Progetto</div>
//                     <div className="col-span-7">Titolo Attività</div>
//                     <div className="col-span-2 text-right">Scadenza</div>
//                 </div>
//
//                 {/* Corpo tabella con scroll */}
//                 <div className="divide-y divide-gray-200 max-h-81 overflow-y-auto">
//                     {tasks.map((task) => (
//                         <div key={task.id} className="grid grid-cols-12 hover:bg-gray-50">
//                             {/* Colonna Azienda/Progetto */}
//                             <div className="col-span-3 px-6 py-4 whitespace-nowrap border-r border-gray-200">
//                                 <div className="text-sm font-medium text-gray-900">{task.companyProject}</div>
//                             </div>
//
//                             {/* Colonna Titolo Attività */}
//                             <div className="col-span-7 px-6 py-4 border-r border-gray-200">
//                                 <div className="text-sm text-gray-900">
//                                     {task.activityTitle}
//                                 </div>
//                             </div>
//
//                             {/* Colonna Scadenza */}
//                             <div className="col-span-2 px-6 py-4">
//                                 <div className="flex flex-col items-end">
//                                     <div className="text-sm text-gray-500 mb-1">
//                                         {task.dueDate}
//                                     </div>
//                                     <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
//                     {task.status}
//                   </span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
