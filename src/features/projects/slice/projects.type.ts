import {Project} from "../../../common/simpleCardAction/simpleCardAction.type.ts";
import {Task} from "../../../common/simpleTable/simpleTable.type.ts";

export interface ProjectsState {
    projects: Project[] | null;
    tasks: Task[] | null;
    isLoading: boolean;
    error: string | null;
}

export interface EditProjectPayload {
    id: string;
    changes: Partial<Project>;
}
