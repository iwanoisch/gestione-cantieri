import {colorMap} from "../../utility/simple-card-action-utils.ts";
import {Status} from "../../components/activityTab/ActivityTab.type.ts";

export interface SimpleCardActionProps {
    projectType?: ProjectType;
    title?: string;
    subtitle?: string | string[];
    description?: string;
    id: string;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
}

export type ProjectType =
    'planning'
    | 'construction'
    | 'architecture'
    | 'materials'
    | 'safety'
    | 'logistics'
    | 'default';

export interface Project {
    id: string;
    projectName: string;
    companyPartner: string[];
    description: string;
    projectType?: keyof typeof colorMap;
    dueDate: string;
    assignedTo: string;
    projectId: string | undefined;
    status: Status;
}

export type NewProject = Omit<Project, 'id'>;

