import {Project} from "../simple-card-action/simpleCardAction.type.ts";

export interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (project: Project) => void;
    projectToEdit?: Project | null;
}
