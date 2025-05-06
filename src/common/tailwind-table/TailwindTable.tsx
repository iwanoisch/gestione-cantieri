import {SortDirection, TailwindTableProps} from "./TailwindTable.type.ts";
import {useCallback, useMemo, useState} from "react";
import {ChevronDownIcon, ChevronUpIcon, ArrowsUpDownIcon} from "@heroicons/react/24/solid";

export const TailwindTable = <T, >({
                                       data,
                                       columns,
                                       emptyMessage = "Nessun dato disponibile",
                                       tClassName = "",
                                       headerClassName = "bg-gray-50",
                                       rowClassName = "hover:bg-gray-50",
                                       maxHeight = "500px",
                                       textHeaderColor = 'text-gray-900',
                                       enableSorting = false,
                                   }: TailwindTableProps<T>) => {
    const initialSortColumn = columns.find((col) => col.sortable) || columns[0];

    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: SortDirection;
    }>({
        key: initialSortColumn.sortKey || initialSortColumn.key,
        direction: (initialSortColumn.defaultSortDirection as SortDirection) || "asc",
    });

    // Dati ordinati
    const sortedData = useMemo(() => {
        if (!enableSorting) return [...data];

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof T];
            const bValue = b[sortConfig.key as keyof T];

            if (aValue === bValue) return 0;

            // Ordinamento per stringhe
            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            // Ordinamento per date
            if (aValue instanceof Date && bValue instanceof Date) {
                return sortConfig.direction === "asc"
                    ? aValue.getTime() - bValue.getTime()
                    : bValue.getTime() - aValue.getTime();
            }

            // Ordinamento generico
            return sortConfig.direction === "asc"
                ? aValue < bValue
                    ? -1
                    : 1
                : aValue < bValue
                    ? 1
                    : -1;
        });
    }, [data, sortConfig, enableSorting]);

    const requestSort = useCallback(
        (key: string) => {
            if (!enableSorting) return;

            const column = columns.find((c) => c.key === key);
            if (!column?.sortable) return;

            const sortKey = column.sortKey || key;

            setSortConfig((prev) => {
                if (prev.key !== sortKey) {
                    return {
                        key: sortKey,
                        direction: (column.defaultSortDirection as SortDirection) || "asc",
                    };
                }

                return {
                    key: sortKey,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            });
        },
        [enableSorting, columns]
    );

    return (
        <div className={`mt-8 flow-root ${tClassName}`}>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden">
                        {/* Container con altezza massima e scroll */}
                        <div
                            className="overflow-auto"
                            style={{maxHeight: maxHeight}}
                        >
                            {/* Tabella con header fisso */}
                            <table className="min-w-full divide-y divide-gray-300">
                                {/* Header fisso */}
                                <thead className={`sticky top-0 z-10 ${headerClassName}`}>
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={`header-${column.key}`}
                                            scope="col"
                                            className={`sticky top-0 px-3 py-3.5 text-left text-sm font-semibold ${textHeaderColor} whitespace-nowrap ${
                                                column.headerClassName || ""
                                            } ${
                                                enableSorting && column.sortable
                                                    ? 'cursor-pointer hover:bg-gray-100'
                                                    : ''
                                            }`}
                                            onClick={() => requestSort(column.key)}
                                        >
                                            <div className="flex items-center">
                                                {column.header}
                                                {enableSorting && column.sortable && (
                                                    <span className="ml-1 flex-none">
                                                            {sortConfig?.key === (column.sortKey || column.key) ? (
                                                                sortConfig.direction === 'asc' ? (
                                                                    <ChevronUpIcon className="h-4 w-4"/>
                                                                ) : (
                                                                    <ChevronDownIcon className="h-4 w-4"/>
                                                                )
                                                            ) : (
                                                                <span className="text-gray-400">
                                                                    <ArrowsUpDownIcon className="h-4 w-4 text-gray-800"/>
                                                                </span>
                                                            )}
                                                        </span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                                </thead>

                                {/* Corpo tabella scrollabile */}
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {sortedData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={columns.length}
                                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                                        >
                                            {emptyMessage}
                                        </td>
                                    </tr>
                                ) : (
                                    sortedData.map((item, index) => (
                                        <tr key={`row-${index}`} className={rowClassName}>
                                            {columns.map((column) => (
                                                <td
                                                    key={`cell-${column.key}-${index}`}
                                                    className={`px-3 py-4 text-sm ${
                                                        column.cellClassName || "text-gray-500"
                                                    }`}
                                                >
                                                    {column.render(item)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
