import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import {tabsMenuActivities} from "../../utility/menu-items-utils.ts";
import {GanttTab} from "../ganttTab/GanttTab.tsx";
import {ActivityTab} from "../activityTab/ActivityTab.tsx";
import {SimpleCalendar} from "../../common/simple-calendar/SimpleCalendar.tsx";


const ActivityTabContent = () => <div><SimpleCalendar /></div>;
const CalendarTabContent = () => <div>Dettaglio costi e preventivi...</div>;

export const ActivityPanel = () => {
    return (
        <TabGroup className="mt-8">
            <TabList
                className=" flex flex-nowrap md:flex-nowrap gap-5 sm:gap-5 px-1 sm:px-0 space-x-1 border-b border-gray-200 dark:border-gray-700 w-full">

                {tabsMenuActivities.map((tab) => (
                    <Tab
                        key={tab.id}
                        className={({selected}) =>
                            `w-full py-2.5 text-sm font-medium rounded-t-lg transition-colors focus-visible:outline-none ${
                                selected
                                    ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                            }`
                        }
                    >
                        {tab.label}
                    </Tab>
                ))}
            </TabList>
            <TabPanels
                className=" rounded-lg bg-white dark:bg-gray-800 p-6 mt-10 shadow-sm border border-gray-100 dark:border-gray-700">
                <TabPanel><ActivityTab/></TabPanel>
                <TabPanel><GanttTab/></TabPanel>
                <TabPanel><ActivityTabContent/></TabPanel>
                <TabPanel><CalendarTabContent/></TabPanel>
            </TabPanels>
        </TabGroup>
    )
}
