import {PageTitle} from "../../common/pageTitle/PageTitle.tsx";
import {useParams} from "react-router-dom";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import {tabsMenuProfile} from "../../utility/menu-items-utils.ts";
import {ActivityPanel} from "../../components/activityPanel/activityPanel.tsx";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {useState} from "react";


const ReportTabContent = () => <div>Relazioni di avanzamento lavori...</div>;
const BudgetTabContent = () => <div>Dettaglio costi e preventivi...</div>;
const FilesTabContent = () => <div>Documenti e allegati...</div>;
const LinksTabContent = () => <div>Collegamenti utili...</div>;
const TeamTabContent = () => <div>Componenti del team...</div>;
const EditTabContent = () => <div>Modifica progetto...</div>;


export const Project = () => {
    const {projectId} = useParams<{ projectId: string }>();
    const [selectedIndex, setSelectedIndex] = useState(0);


    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-5">
            <div className="mx-auto w-full max-w-7xl">
                <PageTitle title={`Dettaglio Progetto ${projectId}`} subtitle={'Descrizione Progetto'}/>

                <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} className="mt-8 ">
                    <div className="hidden sm:block">
                        <TabList
                            className=" flex flex-wrap md:flex-nowrap gap-5 sm:gap-5 px-1 sm:px-0 space-x-1 border-b border-gray-200 dark:border-gray-700 w-full">

                            {tabsMenuProfile.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    className={({selected}) =>
                                        `w-auto md:w-full py-2.5 text-sm font-medium rounded-t-lg transition-colors focus-visible:outline-none ${
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
                    </div>
                    <div className="grid grid-cols-1 sm:hidden">
                        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                        <select
                            // defaultValue={({selected}) => selected.label}
                            value={selectedIndex}
                            onChange={(e) => setSelectedIndex(Number(e.target.value))}
                            aria-label="Select a tab"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        >
                            {tabsMenuProfile.map((tab, idx) => (
                                <option key={tab.label} value={idx}>{tab.label}</option>
                            ))}
                        </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                        />
                    </div>
                    <TabPanels
                        className=" rounded-lg bg-white dark:bg-gray-800 p-6 mt-10 shadow-sm border border-gray-100 dark:border-gray-700">
                        <TabPanel><ActivityPanel/></TabPanel>
                        <TabPanel><ReportTabContent/></TabPanel>
                        <TabPanel><BudgetTabContent/></TabPanel>
                        <TabPanel><FilesTabContent/></TabPanel>
                        <TabPanel><LinksTabContent/></TabPanel>
                        <TabPanel><TeamTabContent/></TabPanel>
                        <TabPanel><EditTabContent/></TabPanel>
                    </TabPanels>
                </TabGroup>

            </div>
        </div>
    )
}
