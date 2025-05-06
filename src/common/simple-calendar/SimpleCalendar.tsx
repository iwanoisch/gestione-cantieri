import {format, parse, startOfWeek, getDay} from "date-fns";

import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import {it} from "date-fns/locale/it";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const myevents = [
    {
        id: 0,
        title: "training",
        start: new Date(2021, 5, 8, 9, 0, 0),
        end: new Date(2021, 5, 8, 13, 0, 0),
        resourceId: 1
    },
    {
        id: 1,
        title: "late lunch",
        start: new Date(2021, 5, 8, 14, 0, 0),
        end: new Date(2021, 5, 8, 16, 30, 0),
        resourceId: 2
    },
    {
        id: 2,
        title: "fight",
        start: new Date(2021, 5, 8, 8, 30, 0),
        end: new Date(2021, 5, 8, 12, 30, 0),
        resourceId: 3
    },
    {
        id: 3,
        title: "party",
        start: new Date(2021, 5, 8, 7, 0, 0),
        end: new Date(2021, 5, 8, 10, 30, 0),
        resourceId: 4
    }
];

export const myresources = [
    {id: 1, title: "spiderman"},
    {id: 2, title: "batman"},
    {id: 3, title: "aquaman"},
    {id: 4, title: "microman"}
];


const locales = {
    'it-IT': it,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

export const itIT = {
    month: 'Mese',
    week: 'Settimana',
    day: 'Giorno',
    agenda: 'Agenda',
    today: 'Oggi',
    previous: 'Precedente',
    next: 'Successivo',
    yesterday: 'Ieri',
    tomorrow: 'Domani',
    showMore: (total: number) => `+${total} altri`,
    noEventsInRange: 'Nessun evento in questo periodo.',
    date: 'Data',
    time: 'Ora',
    event: 'Evento',
};

export const SimpleCalendar = () => (
    <>
        <div className="calendars">
            <div>
                <Calendar
                    events={myevents}
                    localizer={localizer}
                    defaultView="month"
                    defaultDate={new Date(2021, 5, 8)}
                    style={{height: 700}}
                    messages={itIT}
                    culture="it-IT"
                />
            </div>

        </div>
    </>
);
