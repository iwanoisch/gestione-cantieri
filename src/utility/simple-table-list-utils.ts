import {Task} from "../common/simpleTable/simpleTable.type.ts";

export const getStatusColor = (status: Task['status']) => {
    switch (status) {
        case 'Scaduto':
            return 'bg-red-100 text-red-800';
        case 'Urgente':
            return 'bg-orange-100 text-orange-800';
        case 'In corso':
            return 'bg-blue-100 text-blue-800';
        case 'Da iniziare':
            return 'bg-gray-100 text-gray-800';
        case 'Completato':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
