import {Activity} from "../components/activityTab/ActivityTab.type.ts";

export const TAB_ACTIVITIES_MOCK: Activity[] = [
    {
        id: 1,
        title: 'UI Design',
        description: 'Creare i mockup delle pagine, disegni documentazioni accurate e tanto altro. Questo include la progettazione di tutte le interfacce utente, la creazione di wireframe dettagliati, la definizione della palette dei colori e la preparazione degli asset grafici per lo sviluppo.',
        dueDate: '2023-06-15',
        assignedTo: 'Mario Rossi',
        projectId: '1',
        status: 'Completato'
    },
    {
        id: 2,
        title: 'Sviluppo backend',
        description: 'Implementare le API principali per il sistema, inclusi i moduli di autenticazione, gestione utenti, e elaborazione dati. Creare i servizi RESTful e GraphQL necessari per il frontend.',
        dueDate: '2023-06-20',
        assignedTo: 'Luigi Bianchi',
        projectId: '1',
        status: 'In corso'
    },
    {
        id: 3,
        title: 'Testing',
        description: 'Eseguire test di integrazione',
        dueDate: '2023-06-25',
        assignedTo: 'Anna Verdi',
        projectId: '1',
        status: 'Da iniziare'
    },
    {
        id: 4,
        title: 'Documentazione tecnica',
        description: 'Preparare la documentazione completa per le API, includendo esempi di richieste e risposte, diagrammi di sequenza e specifiche tecniche dettagliate per ogni endpoint.',
        dueDate: '2023-06-18',
        assignedTo: 'Carlo Neri',
        projectId: '1',
        status: 'Urgente'
    },
    {
        id: 5,
        title: 'Ottimizzazione database',
        description: 'Analizzare e ottimizzare le query SQL, creare indici appropriati e rivedere la struttura del database per migliorare le prestazioni.',
        dueDate: '2023-05-30',
        assignedTo: 'Giulia Bianchi',
        projectId: '1',
        status: 'Scaduto'
    },
    {
        id: 6,
        title: 'Deploy su staging',
        description: 'Configurare l\'ambiente di staging e deployare la versione corrente del software per i test interni.',
        dueDate: '2023-07-01',
        assignedTo: 'Marco Verdi',
        projectId: '1',
        status: 'Da iniziare'
    },
    {
        id: 7,
        title: 'Implementazione caching',
        description: 'Aggiungere layer di caching per le API più utilizzate, configurando Redis e definendo le strategie di invalidazione della cache.',
        dueDate: '2023-06-22',
        assignedTo: 'Luigi Bianchi',
        projectId: '1',
        status: 'In corso'
    },
    {
        id: 8,
        title: 'Setup CI/CD',
        description: 'Configurare la pipeline di integrazione continua e deployment continuo su GitLab CI/CD, includendo i test automatici e i controlli di qualità del codice.',
        dueDate: '2023-06-10',
        assignedTo: 'Paolo Rossi',
        projectId: '1',
        status: 'Completato'
    },
    {
        id: 9,
        title: 'Ricerca prestazioni frontend',
        description: 'Identificare e risolvere i colli di bottiglia nelle prestazioni del frontend, ottimizzare il bundle JavaScript e migliorare il rendering delle pagine.',
        dueDate: '2023-06-28',
        assignedTo: 'Sara Gialli',
        projectId: '1',
        status: 'Urgente'
    },
    {
        id: 10,
        title: 'Implementazione logging',
        description: 'Configurare un sistema centralizzato di logging con Elasticsearch, Logstash e Kibana per monitorare gli errori e le attività del sistema.',
        dueDate: '2023-05-25',
        assignedTo: 'Andrea Blu',
        projectId: '1',
        status: 'Scaduto'
    },
    {
        id: 11,
        title: 'Refactoring modulo pagamenti',
        description: 'Ristrutturare il codice del modulo pagamenti per migliorarne la manutenibilità, aggiungere nuovi metodi di pagamento e implementare i test mancanti.',
        dueDate: '2023-07-05',
        assignedTo: 'Mario Rossi',
        projectId: '1',
        status: 'Da iniziare'
    },
    {
        id: 12,
        title: 'Aggiornamento dipendenze',
        description: 'Aggiornare tutte le dipendenze del progetto alle ultime versioni stabili, risolvendo eventuali breaking changes.',
        dueDate: '2023-06-15',
        assignedTo: 'Luigi Bianchi',
        projectId: '1',
        status: 'In corso'
    },
    {
        id: 13,
        title: 'Implementazione autenticazione a due fattori',
        description: 'Aggiungere il supporto per l\'autenticazione a due fattori (2FA) usando SMS e applicazioni autenticatori.',
        dueDate: '2023-06-30',
        assignedTo: 'Anna Verdi',
        projectId: '1',
        status: 'Urgente'
    },
    {
        id: 14,
        title: 'Creazione dashboard admin',
        description: 'Sviluppare una dashboard amministrativa con metriche chiave, log attività e strumenti di gestione.',
        dueDate: '2023-06-17',
        assignedTo: 'Carlo Neri',
        projectId: '1',
        status: 'Completato'
    },
    {
        id: 15,
        title: 'Migrazione database',
        description: 'Eseguire la migrazione del database dalla versione 11 a 14 di PostgreSQL, testando tutte le funzionalità dopo l\'aggiornamento.',
        dueDate: '2023-05-20',
        assignedTo: 'Giulia Bianchi',
        projectId: '1',
        status: 'Scaduto'
    },
    {
        id: 16,
        title: 'Implementazione notifiche push',
        description: 'Integrare il servizio Firebase Cloud Messaging per inviare notifiche push agli utenti su dispositivi mobili.',
        dueDate: '2023-07-10',
        assignedTo: 'Marco Verdi',
        projectId: '1',
        status: 'Da iniziare'
    },
    {
        id: 17,
        title: 'Ottimizzazione immagini',
        description: 'Implementare un sistema per la compressione e ottimizzazione automatica delle immagini caricate dagli utenti.',
        dueDate: '2023-06-19',
        assignedTo: 'Paolo Rossi',
        projectId: '1',
        status: 'In corso'
    },
    {
        id: 18,
        title: 'Test di sicurezza',
        description: 'Eseguire penetration test e analisi di vulnerabilità usando strumenti come OWASP ZAP e Burp Suite.',
        dueDate: '2023-06-12',
        assignedTo: 'Sara Gialli',
        projectId: '1',
        status: 'Completato'
    },
    {
        id: 19,
        title: 'Configurazione monitoraggio',
        description: 'Configurare Prometheus e Grafana per monitorare le prestazioni del sistema in tempo reale.',
        dueDate: '2023-06-24',
        assignedTo: 'Andrea Blu',
        projectId: '1',
        status: 'Urgente'
    },
    {
        id: 20,
        title: 'Onboarding nuovo team member',
        description: 'Preparare documentazione e sessioni di training per il nuovo sviluppatore che si unirà al team la prossima settimana.',
        dueDate: '2023-07-03',
        assignedTo: 'Mario Rossi',
        projectId: '1',
        status: 'Da iniziare'
    }
];
