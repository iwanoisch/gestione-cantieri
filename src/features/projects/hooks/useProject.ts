import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {mockAddProject, mockDeleteProject, mockEditProject, mockProjectRecentlyEdited} from "../api/project.api.ts";
import {Project} from "../../../common/simpleCardAction/simpleCardAction.type.ts";
import {
    addProject,
    deleteProject,
    editProject,
    loadProjects,
    projectsError,
    projectStart,
} from "../slice/projectsSlice.ts";

export const useProject = () => {
    const dispatch = useAppDispatch();
    const projectState = useAppSelector((state) => state.project);


    const getProjects = async () => {
        dispatch(projectStart())

        try {
            const projects = await mockProjectRecentlyEdited()
            dispatch(loadProjects(projects))
            return {projects}
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Errore sconosciuto'
            dispatch(projectsError(message))
            return {success: false, error: message}
        }
    }

    const createProject = async (project: Omit<Project, 'id'>) => {
        dispatch(projectStart());
        try {
            const newProject = await mockAddProject(project);
            dispatch(addProject(newProject));
            return { success: true, project: newProject };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Errore sconosciuto';
            dispatch(projectsError(message));
            return { success: false, error: message };
        }
    };

    const updateProject = async (id: string, changes: Partial<Project>) => {
        dispatch(projectStart());
        try {
            const updatedProject = await mockEditProject(id, changes);
            dispatch(editProject({ id, changes: updatedProject }));
            return { success: true, project: updatedProject };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Errore sconosciuto';
            dispatch(projectsError(message));
            return { success: false, error: message };
        }
    };

    const removeProject = async (id: string) => {
        dispatch(projectStart());
        try {
            await mockDeleteProject(id);
            dispatch(deleteProject(id));
            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Errore sconosciuto';
            dispatch(projectsError(message));
            return { success: false, error: message };
        }
    };

    return {
        ...projectState,
        getProjects,
        createProject,
        updateProject,
        removeProject
    }
}
