import {User} from "../features/auth/slice/auth.type.ts";

export const MOCK_USERS: User[] = [
    {
        id: '1',
        username: 'admin',
        password: 'password',
        role: 'admin',
        name: 'Amministratore',
        company: 'Edilizia SPA'
    },
    {
        id: '2',
        username: 'capocantiere',
        password: 'password',
        role: 'capocantiere',
        name: 'Mario Rossi',
        company: 'Costruzioni Rossi'
    },
    {
        id: '3',
        username: 'progettista',
        password: 'password',
        role: 'progettista',
        name: 'Luigi Bianchi',
        company: 'Progetti Edili'
    }
]
