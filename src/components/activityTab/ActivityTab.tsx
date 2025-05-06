import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {CheckBadgeIcon, ChevronDownIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/solid";
import {TailwindTable} from "../../common/tailwind-table/TailwindTable.tsx";
import {TAB_ACTIVITIES_MOCK} from "../../dataMok/TAB_ACTIVITY_MOCK.ts";
import {formatDateToLocale} from "../../utility/date-utils.ts";
import {getStatusColor} from "../../utility/simple-table-list-utils.ts";
import {Activity, Filters} from "./ActivityTab.type.ts";
import {Modal} from "../../common/modal/Modal.tsx";
import {useAlert} from "../../common/alert/useAlert.ts";


export const ActivityTab = () => {
    const {showAlert, hideAlert} = useAlert();
    const {projectId} = useParams<{ projectId: string }>();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
    const [filters, setFilters] = useState<Filters>({
        fromDate: '',
        toDate: '',
        duration: '',
        assignedTo: '',
        status: ''
    });

    // Mock data
    useEffect(() => {
        setActivities(TAB_ACTIVITIES_MOCK);
        setFilteredActivities(TAB_ACTIVITIES_MOCK);
    }, [projectId]);

    // Filtra le attività
    useEffect(() => {
        let result = [...activities];

        if (filters.fromDate) {
            result = result.filter(activity => activity.dueDate >= filters.fromDate);
        }

        if (filters.toDate) {
            result = result.filter(activity => activity.dueDate <= filters.toDate);
        }

        if (filters.assignedTo) {
            result = result.filter(activity =>
                activity.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase())
            );
        }

        if (filters.status) {
            result = result.filter(activity => activity.status === filters.status);
        }

        setFilteredActivities(result);
    }, [filters, activities]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFilters(prev => ({...prev, [name]: value}));
    };

    const handleDelete = (id: number) => {
        // if (window.confirm('Sei sicuro di voler eliminare questa attività?')) {
        //     setActivities(prev => prev.filter(activity => activity.id !== id));
        // }
        const alertId = showAlert({
            type: 'warning',
            title: 'Cancellazione',
            message: 'Stai per eliminare una attività. Sei sicuro?',
            duration: 0,
            links: [
                {
                    text: 'Annulla',
                    onClick: () => hideAlert(alertId),
                    variant: 'secondary'
                },
                {
                    text: 'Conferma',
                    onClick: () => {
                        hideAlert(alertId);
                        setActivities(prev => prev.filter(activity => activity.id !== id))
                    },
                    variant: 'primary'
                }
            ]
        });

    };

    const handleEdit = (activity: Activity) => {
        setCurrentActivity(activity);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setCurrentActivity(null);
        setIsModalOpen(true);
    };

    const handleFilterReset = () => {
        setFilters({
            fromDate: '',
            toDate: '',
            duration: '',
            assignedTo: '',
            status: ''
        });

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newActivity: Activity = {
            id: currentActivity?.id || Date.now(),
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            dueDate: formData.get('dueDate') as string,
            assignedTo: formData.get('assignedTo') as string,
            projectId: projectId,
            status: formData.get('status') as never
        };

        if (currentActivity) {
            setActivities(prev => prev.map(activity =>
                activity.id === currentActivity.id ? newActivity : activity
            ));
        } else {
            setActivities(prev => [...prev, newActivity]);
        }

        setIsModalOpen(false);
    };


    const isTaskCompleted = (status: string) => {
        return status === 'Completato' ? <CheckBadgeIcon className="h-4 w-4 text-green-500"/>
            : <CheckBadgeIcon className="h-4 w-4 text-gray-500"/>
    }

    const columns = [
        {
            key: 'title',
            header: 'Titolo',
            width: 'col-span-2',

            render: (item: Activity) => (
                <>
                    <div className="flex mb-1 gap-1 items-center">
                        {isTaskCompleted(item.status)}
                        <div className='has-tooltip group relative'>
                            <div className="font-medium text-gray-900 truncate max-w-30">
                                {item.title}
                            </div>
                            <div
                                className="tooltip absolute z-50 hidden group-hover:block min-w-[100px] w-auto px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg -mt-9">
                                {item.title}
                            </div>
                        </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </>
            )
        },

        {
            key: 'assignedTo',
            header: 'Responsabili',
            width: 'col-span-2',
            render: (item: Activity) => (<>
                    <div className='has-tooltip group relative'>
                        <div
                            className="tooltip absolute z-50 hidden group-hover:block min-w-[100px] w-auto px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg -mt-9">
                            {item.assignedTo}
                        </div>
                        <div className="text-gray-500 line-clamp-2 max-w-[200px]">{item.assignedTo}</div>
                    </div>
                </>
            )
        },
        {
            key: 'description',
            header: 'Descrizione',
            width: 'col-span-4',
            cellClassName: 'px-3 py-4 text-sm',
            render: (item: Activity) => (<>
                    <div className='has-tooltip group relative'>
                            <span
                                className="tooltip absolute z-50 hidden group-hover:block min-w-[100px] w-auto px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg -mt-9">
                                {item.description}
                            </span>
                        <div className="text-gray-600 line-clamp-2 max-w-[200px]">{item.description}</div>
                    </div>
                </>
            )
        },
        {
            key: 'dueDate',
            header: 'Scadenza',
            width: 'col-span-2 ',
            render: (item: Activity) => (
                <div className="text-gray-500">{formatDateToLocale(item.dueDate)}</div>
            )
        },
        {
            key: 'actions',
            header: 'Azioni',
            width: 'col-span-2 text-right',
            render: (item: Activity) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                        aria-label="Modifica"
                    >
                        <PencilSquareIcon className="h-5 w-5"/>
                    </button>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                        aria-label="Elimina"
                    >
                        <TrashIcon className="h-5 w-5"/>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestione Attività del Progetto</h2>

                    {/* Filtri */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtri</h3>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            {/* Filtro Data Inizio */}
                            <div className="flex-1 min-w-[150px]">
                                <label htmlFor="fromDate" className="block text-sm font-medium text-gray-900 mb-1">
                                    Da data
                                </label>
                                <input
                                    id="fromDate"
                                    type="date"
                                    name="fromDate"
                                    value={filters.fromDate}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Filtro Data Fine */}
                            <div className="flex-1 min-w-[150px]">
                                <label htmlFor="toDate" className="block text-sm font-medium text-gray-900 mb-1">
                                    A data
                                </label>
                                <input
                                    id="toDate"
                                    type="date"
                                    name="toDate"
                                    value={filters.toDate}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Filtro Assegnato a */}
                            <div className="flex-1 min-w-[150px]">
                                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-900 mb-1">
                                    Assegnato a
                                </label>
                                <input
                                    id="assignedTo"
                                    name="assignedTo"
                                    type="text"
                                    value={filters.assignedTo}
                                    onChange={handleInputChange}
                                    placeholder="Cerca per nome"
                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Filtro Stato */}
                            <div className="flex-1 min-w-[150px]">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-900 mb-1">
                                    Stato
                                </label>
                                <div className="relative">
                                    <select
                                        id="status"
                                        name="status"
                                        value={filters.status}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">Tutti</option>
                                        <option value="Scaduto">Scaduto</option>
                                        <option value="Urgente">Urgente</option>
                                        <option value="In corso">In corso</option>
                                        <option value="Da iniziare">Da iniziare</option>
                                        <option value="Completato">Completato</option>
                                    </select>
                                </div>
                            </div>

                            {/* Pulsante Resetta */}
                            <div className="flex-1 min-w-[150px] flex items-end">
                                <button
                                    onClick={handleFilterReset}
                                    className="w-full rounded-md border border-indigo-600 bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Resetta filtri
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabella attività */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Lista Attività</h3>
                            <button
                                onClick={handleCreate}
                                className="flex justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Nuova Attività
                            </button>
                        </div>

                        <TailwindTable columns={columns} data={filteredActivities} maxHeight="600px"/>

                    </div>
                </div>
            </div>

            {/* Modale */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={currentActivity ? 'Modifica Attività' : 'Nuova Attività'}
                    size="lg"
                    position="top"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title"
                                   className="block text-sm/6 font-medium text-gray-900 mb-1">Titolo</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                defaultValue={currentActivity?.title || ''}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div>
                            <label htmlFor="description"
                                   className="block text-sm/6 font-medium text-gray-900 mb-1">Descrizione</label>
                            <textarea
                                name="description"
                                id="description"
                                defaultValue={currentActivity?.description || ''}
                                rows={5}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div>
                            <label htmlFor="dueDate" className="block text-sm/6 font-medium text-gray-900 mb-1">Data
                                scadenza</label>
                            <input
                                id="dueDate"
                                type="date"
                                name="dueDate"
                                defaultValue={currentActivity?.dueDate || ''}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div>
                            <label htmlFor="assignedTo"
                                   className="block text-sm/6 font-medium text-gray-900 mb-1">Responsabili</label>
                            <input
                                id="assignedTo"
                                type="text"
                                name="assignedTo"
                                defaultValue={currentActivity?.assignedTo || ''}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div>
                            <label htmlFor="status"
                                   className="block text-sm/6 font-medium text-gray-900 mb-1">Stato</label>
                            <div className="mt-1 grid grid-cols-1">
                                <select
                                    id="status"
                                    name="status"
                                    defaultValue={currentActivity?.status || 'Da iniziare'}
                                    required
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value="Scaduto">Scaduto</option>
                                    <option value="Urgente">Urgente</option>
                                    <option value="In corso">In corso</option>
                                    <option value="Da iniziare">Da iniziare</option>
                                    <option value="Completato">Completato</option>
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="w-full md:w-auto flex justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-indigo-600 shadow-xs border border-indigo-500-2   hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Annulla
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md text-sm/6 font-semibold text-white shadow-xs bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Salva
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

