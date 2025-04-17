export const HomePage = () => {
    return <>
        <div className="relative isolate">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 transform-gpu overflow-hidden blur-3xl "
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#10b981] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl py-12 sm:px-12 px-6 lg:px-8">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div
                        className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Nuova versione disponibile.{' '}
                        <a href="#" className="font-semibold text-indigo-600">
                            <span aria-hidden="true" className="absolute inset-0"/>
                            Scopri di più <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        Gestione Cantieri 4.0
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                        La soluzione completa per ottimizzare tempi, risorse e budget nei tuoi cantieri edili.
                        Monitora in tempo reale l'avanzamento dei lavori e coordina team e fornitori.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/login"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Accedi all'applicazione
                        </a>
                        <a href="#features" className="text-sm/6 font-semibold text-gray-900">
                            Scopri le funzionalità <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3b82f6] to-[#10b981] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                />
            </div>
        </div>

        {/* Sezione funzionalità */}
        <div id="features" className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Efficienza operativa</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Tutto ciò che serve per gestire i tuoi cantieri
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Dalla pianificazione alla rendicontazione, tutte le funzioni in un'unica piattaforma integrata.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {[
                            {
                                name: 'Pianificazione avanzata',
                                description: 'Diagrammi di Gantt interattivi per una pianificazione precisa delle attività e delle risorse.',
                                icon: CalendarIcon,
                            },
                            {
                                name: 'Tracciamento materiali',
                                description: 'Gestione intelligente dei materiali con alert automatici per gli approvvigionamenti.',
                                icon: CubeIcon,
                            },
                            {
                                name: 'Reportistica in tempo reale',
                                description: 'App personalizzabili con indicatori KPI e report generati automaticamente.',
                                icon: ChartBarIcon,
                            },
                        ].map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true"/>
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    </>
}

// Aggiungi queste importazioni in cima al tuo file
import {CalendarIcon, CubeIcon, ChartBarIcon} from '@heroicons/react/24/outline';
