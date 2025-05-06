export const mainMenuItems = [
    {name: "DASBOARD", href: "/dashboard", current: true},
    {name: "BACHECA LAVORO", href: "#", current: false},
    {name: "MYB PER TE", href: "#", current: false},
    {name: "PROJECT MANAGEMENT", href: "#", current: false},
];

export const subMenuItems = [
    {name: "Pannello di controllo", href: "/dashboard", current: true},
    {name: "Attività", href: "/activities", current: false},
    {name: "Calendario", href: "/calendar", current: false},
    {name: "Progetti", href: "/projects", current: false},
];

export const mobileMenuItems = [
    {name: "Dashboard", href: "/dashboard", current: true},
    {name: "Bacheca lavoro", href: "#", current: false},
    {name: "Project management", href: "#", current: false},
];

export const userMenuItems = [
    {name: "Profilo utente", href: "#"},
    {name: "Impostazioni", href: "#"},
    {name: "Logout", action: "logout"},
];

export const tabsMenuProfile = [
    {id: 'attivita', label: 'Attività',},
    {id: 'relazione', label: 'Relazione',},
    {id: 'budget', label: 'Budget',},
    {id: 'file', label: 'File',},
    {id: 'link', label: 'Link',},
    {id: 'team', label: 'Team',},
    {id: 'modifica', label: 'Modifica',}
];

export const tabsMenuActivities = [
    {id: 'attivita', label: 'Attività',},
    {id: 'gantt', label: 'Gantt',},
    {id: 'calendario', label: 'Calendario',},

];
