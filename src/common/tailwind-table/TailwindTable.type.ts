import * as React from "react";

export interface ColumnDefinition<T> {
    key: string;
    header: string;
    width?: string;
    render: (item: T) => React.ReactNode;
    headerClassName?: string;
    cellClassName?: string;
    sortable?: boolean; // Nuovo campo per attivare l'ordinamento
    sortKey?: string; // Chiave alternativa per l'ordinamento
    defaultSortDirection?: SortDirection | string; // Direzione predefinita
}

export type SortDirection = 'asc' | 'desc' | null;


export interface TailwindTableProps<T> {
    data: T[];
    columns: ColumnDefinition<T>[];
    emptyMessage?: string;
    tClassName?: string;
    headerClassName?: string;
    textHeaderColor?: string;
    rowClassName?: string;
    maxHeight?: string;
    enableSorting?: boolean; // Prop globale per attivare/disattivare l'ordinamento
}
