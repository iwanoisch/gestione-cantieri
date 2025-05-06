import {Project} from "../../../common/simple-card-action/simpleCardAction.type.ts";
import {MOCK_PROJECTS_RECENTLY_EDITED} from "../../../dataMok/MOCK_PROJECTS_RECENTLY_EDITED.ts";

export const mockProjectRecentlyEdited = async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simula ritardo rete

    const projects = MOCK_PROJECTS_RECENTLY_EDITED;

    if (!projects) {
        throw new Error('Errore nell repereire i progetti ')
    }

    return projects;
}

export const mockAddProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newProject = {
        ...project,
        id: `proj-${Date.now()}`,
    };
    return newProject;
};

export const mockEditProject = async (id: string, changes: Partial<Project>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const projects = [...MOCK_PROJECTS_RECENTLY_EDITED];
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) throw new Error('Progetto non trovato');

    const updatedProject = {
        ...projects[index],
        ...changes,
        id // Mantieni lo stesso ID
    };

    return updatedProject;
};

export const mockDeleteProject = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = MOCK_PROJECTS_RECENTLY_EDITED.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Progetto non trovato');
};
