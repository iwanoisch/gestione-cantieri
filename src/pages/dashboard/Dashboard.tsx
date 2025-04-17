import {PageTitle} from "../../common/pageTitle/PageTitle.tsx";
import {SimpleTable} from "../../common/simpleTable/SimpleTable.tsx";
import {activityExpired} from "../../dataMok/ActivityExpired.ts";
import {getStatusColor} from "../../utility/simple-table-list-utils.ts";
import {ColumnDefinition, Task} from "../../common/simpleTable/simpleTable.type.ts";
import {SimpleCardAction} from "../../common/simpleCardAction/SimpleCardAction.tsx";
import {Project} from "../../common/simpleCardAction/simpleCardAction.type.ts";
import {useCallback, useEffect, useState} from "react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import {useProject} from "../../features/projects/hooks/useProject.ts";
import {useNavigate} from "react-router-dom";


export const Dashboard = () => {
    const {projects, getProjects, removeProject,} = useProject();
    const navigate = useNavigate();
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);

    const fetchProjects = useCallback(async () => {
        const data = await getProjects();
        return data.projects;
    }, [getProjects]);

    useEffect(() => {
        if (!projects) {
            (async () => {
                await fetchProjects();
            })();
        }
    }, [fetchProjects, projects, showAllProjects]);

    // Aggiorna la visualizzazione
    useEffect(() => {
        if (!projects) return;
        setDisplayedProjects(
            showAllProjects
                ? projects
                : projects.slice(0, 6)
        );
    }, [showAllProjects, projects]);


    const handleEdit = async (id: string) => {
        navigate(`/project/${id}`);
    };

    const handleDelete = async (id: string) => {
        const result = await removeProject(id);
        if (result.success) {
            //TODO Mostra conferma sei sicuro?
        }
    };

    const columns: ColumnDefinition<Task>[] = [
        {
            key: 'companyProject',
            header: 'Azienda/Progetto',
            width: 'col-span-3',
            cellClassName: 'border-r border-gray-200 content-center',
            render: (task) => <div className="text-sm font-medium text-gray-900">{task.companyProject}</div>,
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
        <>
            <div className="w-full px-4 sm:px-6 lg:px-8 py-5">
                <div className="mx-auto w-full max-w-7xl">
                    <PageTitle title={'Dashboard'}
                               subtitle={'Lista dei task in scadenza e dei progetti in evidenza'}/>
                    <hr className="h-px w-full bg-gray-200 border-0 my-8"/>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Attività in scadenza</h2>
                    <SimpleTable
                        data={activityExpired}
                        columns={columns}
                        emptyMessage="Nessun prodotto disponibile"
                    />
                    <h2 className="text-2xl font-bold text-gray-900 my-8 ">Progetti modificati di recente</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedProjects.map((activity) => (

                            <SimpleCardAction
                                key={activity.id}
                                id={activity.id}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                title={activity.projectName}
                                subtitle={activity.companyPartner}
                                description={activity.description}
                                projectType={activity.projectType}
                            />

                        ))}
                    </div>
                    <div className="mx-auto w-full max-w-7xl py-8 justify-items-center ">
                        {projects && projects.length > 6 && (
                            <button
                                onClick={() => setShowAllProjects(!showAllProjects)}
                                className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                            >
                                {showAllProjects ? (
                                    <>
                                        <span>Mostra meno</span>
                                        <ChevronUpIcon className="ml-1 h-4 w-4"/>
                                    </>
                                ) : (
                                    <>
                                        <span>Mostra tutti</span>
                                        <ChevronDownIcon className="ml-1 h-4 w-4"/>
                                        <span
                                            className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                            {projects.length}
                                        </span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

