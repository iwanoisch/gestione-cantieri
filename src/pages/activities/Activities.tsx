import {PageTitle} from "../../common/page-title/PageTitle.tsx";
import {TailwindTable} from "../../common/tailwind-table/TailwindTable.tsx";
import {activityExpired} from "../../dataMok/ActivityExpired.ts";
import {ColumnDefinition, Task} from "../../common/simple-table/simpleTable.type.ts";
import {getStatusColor} from "../../utility/simple-table-list-utils.ts";

export const Activities = () => {

    const columns: ColumnDefinition<Task>[] = [
        {
            key: 'companyProject',
            header: 'Azienda/Progetto',
            width: 'col-span-3',
            cellClassName: 'border-r border-gray-200 content-center',
            render: (task) => (<>
                <div className='has-tooltip flex flex-row gap-2'>
                            <span
                                className='tooltip inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg -mt-9'>
                                {task.companyProject}
                            </span>
                    <div className="text-sm font-medium text-gray-900 truncate max-w-30 sm:max-w-full">
                        {task.companyProject}
                    </div>
                </div>
            </>),
        },
        {
            key: 'activityTitle',
            header: 'Titolo Attività',
            width: 'col-span-7',
            cellClassName: 'border-r border-gray-200 content-center',
            render: (task) => <div className="text-sm text-gray-900">{task.activityTitle}</div>,
        },
        {
            key: 'dueDate',
            header: 'Scadenza',
            width: 'col-span-2 text-right',
            cellClassName: 'border-r border-gray-200 content-center',
            render: (task) => (
                <div className="flex flex-col items-end">
                    <div className="text-sm text-gray-500 mb-1">{task.dueDate}</div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-5">
            <div className="mx-auto w-full max-w-7xl">
                <PageTitle title={'Attività'}
                           subtitle={'Lista di tutte le attività in corso'}/>
                <hr className="h-px w-full bg-gray-200 border-0 my-8"/>
                <div className="flex flex-col gap-10 my-8">
                    <div className="px-4 sm:px-0  bg-red-50 shadow-sm rounded-lg border border-gray-200">
                        <h2 className="text-xl mx-3 my-4 font-bold text-gray-900 mb-6">Attività in ritardo</h2>
                        <TailwindTable headerClassName={'bg-red-50'} columns={columns} data={activityExpired} maxHeight="380px"/>
                    </div>
                    <div className="px-4 sm:px-0 bg-blue-50 shadow-sm rounded-lg border border-gray-200 ">
                        <h2 className="text-xl mx-3 my-4 font-bold text-gray-900 mb-6 ">Attività di Oggi</h2>
                        <TailwindTable headerClassName={'bg-blue-50'} columns={columns} data={activityExpired} maxHeight="380px"/>
                    </div>
                    <div className="px-4 sm:px-0 bg-gray-50 shadow-sm rounded-lg border border-gray-200">
                        <h2 className="text-xl mx-3 my-4 font-bold text-gray-900 mb-6">Attività di Domani</h2>
                        <TailwindTable headerClassName={'bg-gray-50'}  columns={columns} data={activityExpired} maxHeight="380px"/>
                    </div>
                </div>
            </div>
        </div>)
}
