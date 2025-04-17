import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EditProjectPayload, ProjectsState} from "./projects.type.ts";
import {Project} from "../../../common/simpleCardAction/simpleCardAction.type.ts";
import {Task} from "../../../common/simpleTable/simpleTable.type.ts";


export const initialState: ProjectsState = {
    projects: null,
    tasks: [],
    isLoading: false,
    error: null,
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        projectStart:(state) => {
            state.isLoading = true;
            state.error = null;
        },
        loadProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loadTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addProject: (state, action: PayloadAction<Project>) => {
            if (state.projects) {
                state.projects.unshift(action.payload);
            }
        },
        editProject: (state, action: PayloadAction<EditProjectPayload>) => {
            if (state.projects) {
                const index = state.projects.findIndex(
                    p => p.id === action.payload.id
                );
                if (index !== -1) {
                    state.projects[index] = {
                        ...state.projects[index],
                        ...action.payload.changes
                    };
                }
            }
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            if (state.projects) {

                state.projects = state.projects.filter(
                    p => p.id !== action.payload
                );
            }
        },
        projectsError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    }
});


export const {
    projectStart,
    loadProjects,
    loadTasks,
    addProject,
    editProject,
    deleteProject,
    projectsError
} = projectsSlice.actions;

export default projectsSlice.reducer;
