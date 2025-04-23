export interface Activity {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    assignedTo: string;
    projectId: string | undefined;
    status: Status;
}

export interface Filters {
    fromDate: string;
    toDate: string;
    duration: string | number;
    assignedTo: string;
    status: string;
}

export type Status = 'Scaduto' | 'Urgente' | 'In corso' | 'Da iniziare' | 'Completato';
