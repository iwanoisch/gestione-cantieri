import {FC, useEffect, useState} from "react"
import {DialogTitle} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/16/solid";
import {Props} from "./ProjectFormDrawer.type.ts";
import {Project} from "../simple-card-action/simpleCardAction.type.ts";
import * as React from "react";
import {Drawer} from "../drawer/Drawer.tsx";

export const ProjectFormDrawer: FC<Props> = ({isOpen, onClose, onSubmit, projectToEdit}) => {

    const [formData, setFormData] = useState<Partial<Project>>({
        projectName: '',
        description: '',
        companyPartner: [],
        projectType: 'architecture',
        dueDate: '',
        assignedTo: '',
        status: 'Da iniziare'
    });

    useEffect(() => {
        if (projectToEdit) {
            setFormData(projectToEdit);
        } else {
            setFormData({
                projectName: '',
                description: '',
                companyPartner: [],
                projectType: 'architecture',
                dueDate: '',
                assignedTo: '',
                status: 'Da iniziare'
            });
        }
    }, [projectToEdit, isOpen]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //NewProject Usa questo quando ci saranno le chiamate API
        const newProject: Project = {
            id: projectToEdit ? projectToEdit.id : Math.random().toString(36).substring(2, 9).toString(),
            projectId: projectToEdit ? projectToEdit.projectId : `PRJ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
            projectName: formData.projectName!,
            description: formData.description!,
            dueDate: formData.dueDate!,
            assignedTo: formData.assignedTo!,
            status: formData.status!,
            companyPartner: formData.companyPartner || [],
        };
        onSubmit(newProject);
        onClose();
    };

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>

            <form onSubmit={handleSubmit} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1">
                    {/* Header */}
                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                                <DialogTitle className="text-base font-semibold text-gray-900">
                                    {projectToEdit ? 'Modifica Progetto' : 'Nuovo Progetto'}
                                </DialogTitle>
                                <p className="text-sm text-gray-500">
                                    {projectToEdit ? 'Modifica i campi del progetto' : 'Compila i campi per creare un nuovo progetto'}
                                </p>
                            </div>
                            <div className="flex h-7 items-center">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="relative text-gray-400 hover:text-gray-500"
                                >
                                    <XMarkIcon className="size-6"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form fields */}
                    <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        {/* Project name */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                                <label htmlFor="projectName" className="block text-sm/6 font-medium text-gray-900">
                                    Nome Progetto
                                </label>
                            </div>
                            <div className="sm:col-span-2">
                                <input
                                    id="projectName"
                                    name="projectName"
                                    type="text"
                                    required
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                    Descrizione
                                </label>
                            </div>
                            <div className="sm:col-span-2">
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows={3}
                                                    required
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                            </div>
                        </div>

                        {/* Project Type */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                                <label htmlFor="projectType" className="block text-sm/6 font-medium text-gray-900">
                                    Tipo Progetto
                                </label>
                            </div>
                            <div className="sm:col-span-2">
                                <select
                                    id="projectType"
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="architecture">Architettura</option>
                                    <option value="planning">Pianificazione</option>
                                    <option value="construction">Costruzione</option>
                                    <option value="safety">Sicurezza</option>
                                    <option value="logistics">Logistica</option>
                                    <option value="materials">Materiali</option>
                                </select>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                                <label htmlFor="dueDate" className="block text-sm/6 font-medium text-gray-900">
                                    Data Scadenza
                                </label>
                            </div>
                            <div className="sm:col-span-2">
                                <input
                                    id="dueDate"
                                    name="dueDate"
                                    type="date"
                                    required
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Assigned To */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                                <label htmlFor="assignedTo" className="block text-sm/6 font-medium text-gray-900">
                                    Assegnato a
                                </label>
                            </div>
                            <div className="sm:col-span-2">
                                <input
                                    id="assignedTo"
                                    name="assignedTo"
                                    type="text"
                                    required
                                    value={formData.assignedTo}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                                <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                                    Stato
                                </label>
                            </div>
                            <div className="sm:col-span-2">
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="Da iniziare">Da iniziare</option>
                                    <option value="In corso">In corso</option>
                                    <option value="Completato">Completato</option>
                                    <option value="Scaduto">Scaduto</option>
                                    <option value="Urgente">Urgente</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {projectToEdit ? 'Salva Modifiche' : 'Crea Progetto'}
                        </button>
                    </div>
                </div>
            </form>

        </Drawer>

    )
}
