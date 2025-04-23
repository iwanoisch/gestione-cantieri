import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/16/solid";
import * as React from "react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
type ModalPosition = "center" | "top" | "top-right" | "bottom";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: ModalSize;
    position?: ModalPosition;
    hideCloseButton?: boolean;
};

const sizeClasses: Record<ModalSize, string> = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    full: "sm:max-w-full sm:w-full",
};

const positionClasses: Record<ModalPosition, string> = {
    center: "items-center",
    top: "items-start sm:pt-10",
    "top-right": "items-start justify-end pt-4 pr-4 sm:pt-10 sm:pr-10",
    bottom: "items-end pb-4 sm:pb-10",
};

export const Modal = ({
                          isOpen,
                          onClose,
                          title,
                          children,
                          size = "md",
                          position = "center",
                          hideCloseButton = false,
                      }: ModalProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* Sfondo */}
            <DialogBackdrop className="fixed inset-0 bg-black/30" />

            {/* Contenitore principale */}
            <div className={`fixed inset-0 overflow-y-auto flex ${positionClasses[position]} justify-center p-0 sm:p-4`}>
                <DialogPanel
                    className={`w-full min-h-screen sm:min-h-0 bg-white shadow-xl ${sizeClasses[size]} ${
                        size === "full" ? "h-full" : "max-h-[90vh]"
                    } flex flex-col rounded-none sm:rounded-lg`}
                >
                    {/* Header */}
                    {(title || !hideCloseButton) && (
                        <div className="flex items-center justify-between p-4 sticky top-0 bg-white z-10 rounded-t-lg">
                            {title && <h2 className="text-xl font-semibold">{title}</h2>}
                            {!hideCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label="Chiudi modale"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Contenuto */}
                    <div className={`flex-1 overflow-y-auto p-4 ${size === "full" ? "" : ""}`}>
                        {children}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};
