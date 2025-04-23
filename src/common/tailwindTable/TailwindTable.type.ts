import * as React from "react";

export interface ColumnDefinition<T> {
    key: string;
    header: string;
    width?: string;
    render: (item: T) => React.ReactNode;

    headerClassName?: string;
    cellClassName?: string;
}

export interface TailwindTableProps<T> {
    data: T[];
    columns: ColumnDefinition<T>[];
    emptyMessage?: string;
    className?: string;
    headerClassName?: string;
    rowClassName?: string;
    maxHeight?: string;
}
