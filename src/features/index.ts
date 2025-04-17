import {default as initReducer} from "./init/slice/initSlice.ts";
import {default as authReducer} from "./auth/slice/authSlice.ts";
import {default as projectsReducer} from "./projects/slice/projectsSlice.ts";


export const reducers = {
    init: initReducer,
    auth: authReducer,
    project: projectsReducer
    // Aggiungi altri reducer della feature qui se necessario
};
