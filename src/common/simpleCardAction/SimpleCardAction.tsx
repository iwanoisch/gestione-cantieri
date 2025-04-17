import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {EllipsisVerticalIcon} from '@heroicons/react/24/solid';
import {SimpleCardActionProps} from "./simpleCardAction.type.ts";
import {colorMap} from "../../utility/simple-card-action-utils.ts";

export const SimpleCardAction = ({
                                     projectType = 'default',
                                     title,
                                     subtitle,
                                     description,
                                     id,
                                     onDelete,
                                     onEdit
                                 }: SimpleCardActionProps) => {

    const colors = colorMap[projectType];

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onDelete) onDelete(id);
    };


    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onEdit) onEdit(id);
    };

    return (
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 relative">
            {/*<div className="border-b-2 border-neutral-100 px-6 py-4 dark:border-neutral-500 flex justify-between items-center">*/}
            <div className={`border-b-2 ${colors.border} px-6 py-4 ${colors.bg} rounded-t-lg`}>
                <div>
                    {/*<h5 className="text-sm  text-gray-900 dark:text-neutral-300 font-medium text-left">*/}
                    <h5 className={`text-sm font-medium text-left ${colors.text}`}>
                        {title}
                    </h5>
                    {/*<p className="text-sm text-gray-500 dark:text-neutral-400 text-left">*/}
                    <p className={`text-sm text-left ${colors.text} opacity-80`}>
                        {Array.isArray(subtitle) && subtitle.map((item, index) => (
                            <span key={index}>
                                {item}
                                {index < subtitle.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                </div>
            </div>

            {/* Spostato il menu fuori dal flex container e posizionato assolutamente */}
            <div className="absolute top-2 right-2"> {/* Modificato qui */}
                <Menu as="div" className="relative">
                    <div>
                        {/*<MenuButton className="relative flex items-center rounded-full text-sm focus:outline-none hover:bg-gray-100 dark:hover:bg-neutral-600 p-1">*/}
                        <MenuButton
                            className={`relative flex items-center rounded-full text-sm focus:outline-none hover:bg-opacity-70 p-1 ${colors.text}`}>
                            <span className="absolute -inset-1.5"/>
                            <span className="sr-only">Open card menu</span>
                            <EllipsisVerticalIcon
                                className="size-5 text-gray-900 dark:text-neutral-300"/> {/* Ridotta la dimensione */}
                        </MenuButton>
                    </div>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-neutral-700 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                        <MenuItem key={'Edit'}>
                            {({focus, close}) => (
                                <button
                                    onClick={(e) => {
                                        handleEdit(e);
                                        close();
                                    }}
                                    className={`block w-full text-left px-4 py-2 text-sm ${
                                        focus ? 'bg-gray-100 dark:bg-neutral-600' : 'text-gray-900 dark:text-neutral-300'
                                    }`}
                                >
                                    Modifica
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem key={'Delete'}>
                            {({focus, close}) => (
                                <button
                                    onClick={(e) => {
                                        handleDelete(e);
                                        close();
                                    }}
                                    className={`block w-full text-left px-4 py-2 text-sm ${
                                        focus ? 'bg-gray-100 dark:bg-neutral-600' : 'text-gray-900 dark:text-neutral-300'
                                    }`}
                                >
                                    Cancella
                                </button>
                            )}
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>

            <div className="px-6 py-4">
                <h5 className="text-sm tracking-wide text-gray-900 dark:text-neutral-50 line-clamp-5"> {/* Aggiunto line-clamp-3 */}
                    {description}
                </h5>
            </div>
        </div>
    );
};
