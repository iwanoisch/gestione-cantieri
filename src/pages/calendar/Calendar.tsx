import {PageTitle} from "../../common/page-title/PageTitle.tsx";
import {SimpleCalendar} from "../../common/simple-calendar/SimpleCalendar.tsx";

export const Calendar = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-5">
            <div className="mx-auto w-full max-w-7xl">
                <PageTitle title={'Calendario'}
                           subtitle={'Lista di tutte le attività in corso'}/>
                <hr className="h-px w-full bg-gray-200 border-0 my-8"/>
                <SimpleCalendar/>
            </div>
        </div>
    )
};
