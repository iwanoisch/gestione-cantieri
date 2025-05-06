import {Project} from "../common/simple-card-action/simpleCardAction.type.ts";

export const MOCK_PROJECTS_RECENTLY_EDITED: Project[] = [
    {
        id: '1',
        projectName: 'Ristrutturazione Palazzo Storico',
        companyPartner: ["EdilRestauro srl", "Archistudio", "Materiali Preziosi"],
        description: `Intervento di restauro conservativo su palazzo ottocentesco situato in zona vincolata. L'opera prevede:
- Consolidamento strutturale con micropali e cerchiature in acciaio corten
- Sostituzione completa degli impianti elettrici, idraulici e di climatizzazione
- Recupero degli elementi decorativi originali (stucchi, pavimenti alla veneziana)
- Adeguamento alle normative antisismiche e di efficientamento energetico
- Installazione di un ascensore vetrato interno con minimo impatto visivo
Durata stimata: 18 mesi. Budget approvato: €2.850.000. Direzione lavori affidata all'arch. Bianchi.`,
        projectType: 'architecture',
        dueDate: '2024-12-15',
        assignedTo: 'Arch. Marco Bianchi',
        projectId: 'PRJ-001',
        status: 'In corso'
    },
    {
        id: '2',
        projectName: 'Nuovo Complesso Residenziale',
        companyPartner: ["Costruzioni Moderne spa", "Progettazione Zero"],
        description: 'Realizzazione di 4 edifici a 7 piani con 120 unità abitative (da monolocali a quadrilocali), parcheggio interrato per 300 posti auto e 5.000 mq di aree verdi con giochi bambini e percorsi jogging. Progetto certificato LEED Gold.',
        projectType: 'planning',
        dueDate: '2025-06-30',
        assignedTo: 'Ing. Sofia Rossi',
        projectId: 'PRJ-002',
        status: 'Da iniziare'
    },
    {
        id: '3',
        projectName: 'Ponte Pedonale sul Fiume',
        companyPartner: ["Infrastrutture Italia", "MetalWorks"],
        description: `Opera infrastrutturale di collegamento tra i due quartieri divisi dal fiume. Caratteristiche tecniche:
- Lunghezza totale: 85 metri
- Struttura portante: travi in acciaio duplex EN 1.4462
- Pavimentazione: lastre di vetro stratificato antiscivolo con illuminazione LED integrata
- Fondazioni: plinti in cemento armato fino a 12m di profondità
- Barriere antivento e sistema di riscaldamento superficiale anti-ghiaccio
Tempi di realizzazione: 14 mesi. Fornitura materiali garantita da Acciaierie Venete.`,
        projectType: 'construction',
        dueDate: '2024-09-30',
        assignedTo: 'Ing. Luca Ferrari',
        projectId: 'PRJ-003',
        status: 'Urgente'
    },
    {
        id: '4',
        projectName: 'Sistema di Sicurezza Cantiere',
        companyPartner: ["SafeBuild", "TecnoAlarm"],
        description: 'Implementazione sistema sicurezza di ultima generazione comprendente: 8 telecamere PTZ 4K con analisi comportamentale AI, 12 sensori di movimento perimetrali, 5 stazioni SOS con allarme silenzioso, sistema di geofencing per mezzi pesanti, e piattaforma di monitoraggio centralizzata H24/7.',
        projectType: 'safety',
        dueDate: '2024-05-15',
        assignedTo: 'Tec. Giovanni Neri',
        projectId: 'PRJ-004',
        status: 'Completato'
    },
    {
        id: '5',
        projectName: 'Logistica Materiali Edili',
        companyPartner: ["Trasporti Pesanti", "Magazzini Centrali"],
        description: `Riorganizzazione completa della catena logistica per 23 cantieri attivi nella regione. Soluzioni implementate:
- 3 hub strategici con magazzini automatizzati
- Flotta di 18 mezzi con telemetria avanzata
- Sistema RFID per tracciamento materiali
- App per gestione ordini in tempo reale
- Ottimizzazione rotte con riduzione del 35% dei km percorsi
Partner tecnologico: Logitech Solutions. Investimento totale: €420.000.`,
        projectType: 'logistics',
        dueDate: '2024-08-20',
        assignedTo: 'Log. Manager Paola Verdi',
        projectId: 'PRJ-005',
        status: 'In corso'
    },
    {
        id: '6',
        projectName: 'Fornitura Cemento Speciale',
        companyPartner: ["CementiTech", "Edilizia Veloce"],
        description: 'Fornitura di 5.000 tonnellate di cemento ad alta resistenza Rck 50 N/mm² per il progetto "Torri Azzurre". Caratteristiche: classe di esposizione XS3, resistenza ai solfati, basso calore di idratazione. Consegna a lotti settimanali da settembre 2023 a marzo 2024.',
        projectType: 'materials',
        dueDate: '2023-12-31',
        assignedTo: 'Resp. Acquisti Carla Bianchi',
        projectId: 'PRJ-006',
        status: 'Scaduto'
    },
    {
        id: '7',
        projectName: 'Centro Commerciale Green',
        companyPartner: ["EcoBuild", "Verde Progetti", "Energia Pulita"],
        description: `Mega-progetto sostenibile da 28.000 mq complessivi. Elementi chiave:
- Copertura fotovoltaica da 1,2 MW con accumulo a batterie
- Sistema di recupero acque piovane (capacità 5.000 litri)
- Facciata ventilata con pannelli in legno certificato FSC
- Illuminazione a LED con sensori di presenza
- 12.000 piante per forestazione urbana
Certificazioni: LEED Platinum, Well Gold. Tempi: progettazione 8 mesi, costruzione 22 mesi. Costo preventivato: €48 milioni.`,
        projectType: 'architecture',
        dueDate: '2026-02-28',
        assignedTo: 'Arch. Elena Romano',
        projectId: 'PRJ-007',
        status: 'Da iniziare'
    }
];
