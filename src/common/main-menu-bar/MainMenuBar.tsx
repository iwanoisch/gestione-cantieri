import {BellIcon} from '@heroicons/react/24/outline'
import {
    Bars3Icon,
    XMarkIcon
} from "@heroicons/react/16/solid";
import {
    Button,
    Disclosure,
    DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition,
} from '@headlessui/react'
import Avatar from "../avatar/Avatar.tsx";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {mainMenuItems, mobileMenuItems, subMenuItems, userMenuItems} from "../../utility/menu-items-utils.ts";
import {useAuth} from "../../features/auth/hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

const MainMenuBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const ariaCurrent = (isCurrent: boolean) => {
        return isCurrent ? "page" : undefined;
    }

    const classNameCurrent = (isCurrent: boolean) => {
        return isCurrent ? "bg-gray-100 text-black rounded-md px-3 py-2 text-sm font-medium" : "text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium";
    }

    const mobileClassNameCurrent = (isCurrent: boolean) => {
        return isCurrent ? " block border-l-4 border-indigo-600 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700" : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800";
    }

    const subMenuClassNameCurrent = (isCurrent: boolean) => {
        return isCurrent ? "text-gray-900 inline-flex items-center border-b-2 border-indigo-600 px-1 pt-1 text-sm font-medium" : "text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium";
    }


    return (
        <>
            <div className="bg-white shadow-sm">
                <Disclosure as="nav" aria-label="HomePage navigation">
                    {({open}) => (
                        <>
                            {/* Barra di navigazione principale */}
                            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    {/* Logo e menu principale */}
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-auto"
                                                src="/images/logo.svg"
                                                alt="Your Company"
                                            />
                                        </div>
                                        {user && <div className="hidden md:ml-6 md:flex md:space-x-4">
                                            {mainMenuItems.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    aria-current={ariaCurrent(location.pathname === item.href)}
                                                    className={classNameCurrent(location.pathname === item.href)}>
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>}
                                    </div>

                                    {/* Ricerca e notifiche */}
                                    {user && <>
                                      <div
                                          className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                        <div className="w-full max-w-lg lg:max-w-xs">
                                          <label htmlFor="search" className="sr-only">
                                            Search
                                          </label>
                                          <div className="relative">
                                            <div
                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                type="search"
                                                placeholder="Cerca aziende, persone"
                                                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                aria-label="Search"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                        {/* Menu mobile e profilo */}
                                      <div className="flex items-center md:hidden">
                                        <DisclosureButton
                                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            aria-expanded={open}
                                            aria-controls="mobile-menu"
                                        >
                                          <span className="absolute -inset-0.5"/>
                                          <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                            )}
                                        </DisclosureButton>
                                      </div>

                                      <div className="hidden md:ml-4 md:flex md:items-center">
                                        <Button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                                            aria-label="View notifications"
                                        >
                                          <BellIcon className="h-6 w-6"/>
                                          <span
                                              className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                        </Button>

                                          {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                          <div>
                                            <MenuButton
                                                className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-8"
                                                aria-label="User menu"
                                            >
                                              <span className="absolute -inset-1.5"/>
                                              <span className="sr-only">Open user menu</span>
                                              <div
                                                  className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 w-10 h-10 text-base"
                                                  title={user?.name || 'Utente'}
                                              >
                                                <Avatar name={user?.name || 'Utente'}/>
                                              </div>
                                              <div className="text-left self-end">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {user?.role || 'Ruolo'}
                                                </p>
                                              </div>
                                            </MenuButton>
                                          </div>
                                          <Transition
                                              enter="transition ease-out duration-100"
                                              enterFrom="transform opacity-0 scale-95"
                                              enterTo="transform opacity-100 scale-100"
                                              leave="transition ease-in duration-75"
                                              leaveFrom="transform opacity-100 scale-100"
                                              leaveTo="transform opacity-0 scale-95"
                                          >
                                            <MenuItems
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                {userMenuItems.map((item) => (
                                                    <MenuItem key={item.name}>
                                                        {({active, close}) => (
                                                            item.action === "logout" ? (
                                                                <button
                                                                    onClick={() => {
                                                                        close();
                                                                        logout();
                                                                        navigate('/', { replace: true });
                                                                    }}
                                                                    className={`${
                                                                        active ? "bg-gray-100" : ""
                                                                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                                >
                                                                    {item.name}
                                                                </button>
                                                            ) : (
                                                                <a
                                                                    href={item.href}
                                                                    onClick={close}
                                                                    className={`${
                                                                        active ? "bg-gray-100" : ""
                                                                    } block px-4 py-2 text-sm text-gray-700`}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )
                                                        )}
                                                    </MenuItem>
                                                ))}
                                            </MenuItems>
                                          </Transition>
                                        </Menu>
                                      </div>
                                    </>}
                                    {!user && (
                                        <Button
                                            onClick={() => {
                                                console.log('Login clicked');
                                                navigate('/login');
                                            }}
                                            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                            Login
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Mobile menu */}
                            <DisclosurePanel id="mobile-menu"
                                             className="md:hidden absolute inset-x-0 inset-y-0 top-16 z-50 bg-white shadow-lg">
                                <div className="space-y-1 pb-3 pt-2">
                                    {mobileMenuItems.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={mobileClassNameCurrent(location.pathname === item.href)}
                                            aria-current={ariaCurrent(location.pathname === item.href)}
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}

                                    <hr className="h-px bg-gray-200 border-0 mt-4 mb-4"/>

                                    {subMenuItems.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={mobileClassNameCurrent(location.pathname === item.href)}
                                            aria-current={ariaCurrent(location.pathname === item.href)}
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </div>
                                <hr className="h-px bg-gray-200 border-0"/>

                                {/* Sezione profilo utente mobile */}
                                <div className="pb-4 pt-4">
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 w-10 h-10 text-base">
                                                <Avatar name={user?.name || 'Utente'}/>
                                            </div>

                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">
                                                {user?.name || 'Utente'}
                                            </div>
                                            <div className="text-sm font-medium text-gray-500">
                                                {user?.username || 'Email'}
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                                            aria-label="View notifications"
                                        >
                                            <BellIcon className="h-6 w-6"/>
                                            <span
                                                className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                        </Button>
                                    </div>

                                    {/* Menu utente mobile */}
                                    <div className="mt-3 space-y-1">
                                        {userMenuItems.map((item) => (
                                            item.action === "logout" ? (
                                                <DisclosureButton
                                                    key={item.name}
                                                    as="button"
                                                    onClick={() => {
                                                        logout();
                                                        navigate('/', { replace: true });
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                                >
                                                    {item.name}
                                                </DisclosureButton>
                                            ) : (
                                                <DisclosureButton
                                                    key={item.name}
                                                    as="a"
                                                    href={item.href}
                                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                                >
                                                    {item.name}
                                                </DisclosureButton>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </DisclosurePanel>

                            {/* Sotto-menu (sub-navigation) - Solo desktop */}
                            {user && <>
                              <hr className="h-px bg-gray-200 border-0"/>
                              <nav aria-label="Secondary navigation"
                                   className="hidden md:block bg-white border-b border-gray-200">
                                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                                  <div className="flex h-12 items-center space-x-8">
                                      {subMenuItems.map((item) => (
                                          <a
                                              key={item.name}
                                              href={item.href}
                                              className={subMenuClassNameCurrent(location.pathname === item.href)}
                                              aria-current={ariaCurrent(location.pathname === item.href)}
                                          >
                                              {item.name}
                                          </a>
                                      ))}
                                  </div>
                                </div>
                              </nav>
                            </>}
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    );
}

export default MainMenuBar
