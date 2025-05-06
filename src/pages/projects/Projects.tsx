import {PageTitle} from "../../common/page-title/PageTitle.tsx";
import {MOCK_PROJECTS} from "../../dataMok/MOCK_PROJECTS.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {Filters} from "../../components/activityTab/ActivityTab.type.ts";
import {Project} from "../../common/simple-card-action/simpleCardAction.type.ts";
import {TailwindTable} from "../../common/tailwind-table/TailwindTable.tsx";
import {getStatusColor} from "../../utility/simple-table-list-utils.ts";
import {formatDateToLocale} from "../../utility/date-utils.ts";
import {CheckBadgeIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/solid";
import {useAlert} from "../../common/alert/useAlert.ts";
import {ProjectFormDrawer} from "../../common/Project-form-drawer/ProjectFormDrawer.tsx";

export const Projects = () => {
    const {showAlert, hideAlert} = useAlert();
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [openDrawerModal, setOpenDrawerModal] = useState<boolean>(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [filters, setFilters] = useState<Filters>({
        fromDate: '',
        toDate: '',
        duration: '',
        assignedTo: '',
        status: '',
        name: '',
    });


    useEffect(() => {
        setProjects(MOCK_PROJECTS);
        setFilteredProjects(MOCK_PROJECTS);
    }, []);

    // Filtra i progetti
    useEffect(() => {
        let result = [...projects];

        if (filters.fromDate) {
            result = result.filter(project => project.dueDate >= filters.fromDate);
        }

        if (filters.toDate) {
            result = result.filter(project => project.dueDate <= filters.toDate);
        }

        if (filters.assignedTo) {
            result = result.filter(project =>
                project.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase())
            );
        }

        if (filters.status) {
            result = result.filter(project => project.status === filters.status);
        }

        if (filters.name) {
            result = result.filter(project =>
                project.projectName.toLowerCase().includes(filters.name!.toLowerCase())
            );
        }

        setFilteredProjects(result);
    }, [filters, projects]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFilters(prev => ({...prev, [name]: value}));
    };

    const handleFilterReset = () => {
        setFilters({
            fromDate: '',
            toDate: '',
            duration: '',
            assignedTo: '',
            status: '',
            name: '',
        });

    }

    const handleCreate = () => {
        setCurrentProject(null);
        setOpenDrawerModal(true);
        console.log('Create new project');
    };

    const handleSubmitProject = (newProject: Project) => {
        if (currentProject) {
            setProjects(prev =>
                prev.map(project =>
                    project.id === newProject.id ? newProject : project
                )
            );
        } else {
            setProjects(prev => [...prev, newProject]);
        }
        setFilteredProjects(prev =>
            currentProject
                ? prev.map(project => project.id === newProject.id ? newProject : project)
                : [...prev, newProject]
        );
        setCurrentProject(null);
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setOpenDrawerModal(true);
    };


    const handleDelete = (id: string) => {
        const alertId = showAlert({
            type: 'warning',
            title: 'Cancellazione',
            message: 'Stai per eliminare una attività. Sei sicuro?',
            duration: 0,
            position: 'center-center',
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
                        deleteProject(id);
                    },
                    variant: 'primary'
                }
            ]
        });

    };

    const deleteProject = (id: string) => {
        try {
            setProjects(prev => prev.filter(project => project.id !== id));
            setFilteredProjects(prev => prev.filter(project => project.id !== id));

            showAlert({
                type: 'success',
                message: 'Progetto eliminato con successo',
                duration: 3000
            });
        } catch (error) {
            showAlert({
                type: 'error',
                title: `Errore: ${error}`,
                message: 'Impossibile eliminare il progetto',
                duration: 0
            });
        }
    };

    const isProjectCompleted = (status: string) => {
        return status === 'Completato' ? <CheckBadgeIcon className="h-4 w-4 text-green-500"/>
            : <CheckBadgeIcon className="h-4 w-4 text-gray-500"/>
    }


    const columns = [
        {
            key: 'title',
            header: 'Titolo',
            width: 'col-span-2',
            sortable: true, // Attiva l'ordinamento per questa colonna
            sortKey: 'status', // Opzionale: specifica un campo diverso per l'ordinamento
            defaultSortDirection: 'asc', // Opzionale: direzione predefinita
            render: (item: Project) => (
                <>
                    <div className="flex mb-1 gap-1 items-center">
                        {isProjectCompleted(item.status)}
                        <div className='has-tooltip group relative'>
                            <div className="font-medium text-gray-900 truncate max-w-30">
                                {item.projectName}
                            </div>
                            <div
                                className="tooltip absolute z-50 hidden group-hover:block min-w-[100px] w-auto px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg -mt-9">
                                {item.projectName}
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
            sortable: true,
            render: (item: Project) => (
                <div className='has-tooltip group relative'>
                    <div
                        className="tooltip absolute z-50 hidden group-hover:block min-w-[100px] w-auto px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg -mt-9">
                        {item.assignedTo}
                    </div>
                    <div className="text-gray-500 line-clamp-2 max-w-[200px]">{item.assignedTo}</div>
                </div>
            )
        },
        {
            key: 'description',
            header: 'Descrizione',
            width: 'col-span-4',
            cellClassName: 'px-3 py-4 text-sm',
            render: (item: Project) => (<>
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
            render: (item: Project) => (
                <div className="text-gray-500">{formatDateToLocale(item.dueDate)}</div>
            )
        },
        {
            key: 'actions',
            header: 'Azioni',
            width: 'col-span-2 text-right',
            render: (item: Project) => (
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

    return <>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-5">
            <div className="mx-auto w-full max-w-7xl">
                <PageTitle title={'Progetti'}
                           subtitle={'Lista di tutti i progetti in corso'}/>
                <hr className="h-px w-full bg-gray-200 border-0 my-8"/>

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

                        {/* Filtro Progetto */}
                        <div className="flex-1 min-w-[150px]">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                                Progetto
                            </label>
                            <div className="relative">
                                <select
                                    id="projectName"
                                    name="name"
                                    value={filters.name}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Tutti</option>
                                    {filteredProjects.map((project) => (
                                        <option key={project.id}
                                                value={project.projectName}>{project.projectName}</option>
                                    ))}
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

                {/* Tabella progetti */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Lista Attività</h3>
                        <button
                            onClick={handleCreate}
                            className="flex justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Aggiungi Progetto
                        </button>
                    </div>

                    <TailwindTable columns={columns} data={filteredProjects} maxHeight="600px" enableSorting/>

                </div>
            </div>
            <ProjectFormDrawer isOpen={openDrawerModal}
                               onClose={() => {
                                   setOpenDrawerModal(false);
                                   setCurrentProject(null);
                               }}
                               onSubmit={handleSubmitProject}
                               projectToEdit={currentProject}
            />

        </div>

    </>
}
