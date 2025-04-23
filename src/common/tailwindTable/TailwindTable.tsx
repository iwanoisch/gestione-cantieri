import {TailwindTableProps} from "./TailwindTable.type.ts";

export const TailwindTable = <T, >({
                                       data,
                                       columns,
                                       emptyMessage = "Nessun dato disponibile",
                                       className = "",
                                       headerClassName = "bg-gray-50",
                                       rowClassName = "hover:bg-gray-50",
                                       maxHeight = "500px"
                                   }: TailwindTableProps<T>) => {
    return (
        <div className={`mt-8 flow-root ${className}`}>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden">
                        {/* Container con altezza massima e scroll */}
                        <div
                            className="overflow-auto"
                            style={{ maxHeight: maxHeight }}
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
                                            className={`sticky top-0 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap ${
                                                column.headerClassName || ""
                                            }`}
                                        >
                                            {column.header}
                                        </th>
                                    ))}
                                </tr>
                                </thead>

                                {/* Corpo tabella scrollabile */}
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={columns.length}
                                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                                        >
                                            {emptyMessage}
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item, index) => (
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
