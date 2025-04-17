import * as React from "react";

export interface SimpleTableProps<T>  {
    data: T[];
    columns: ColumnDefinition<T>[];
    emptyMessage?: string;
    className?: string;
    headerClassName?: string;
    rowClassName?: string;
};

export type ColumnDefinition<T> = {
    key: string;
    header: string;
    width: string; // es. 'col-span-3'
    render: (item: T) => React.ReactNode;
    headerClassName?: string;
    cellClassName?: string;
};

export interface Task {
    id: string;
    companyProject: string;
    activityTitle: string;
    dueDate: string;
    status: Status;
}

export type Status = 'Scaduto' | 'Urgente' | 'In corso' | 'Da iniziare' | 'Completato';
