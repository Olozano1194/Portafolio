import logo from '../assets/logoOscar1.jpeg';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { GoMoon } from "react-icons/go";
import { useTranslation } from 'react-i18next';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const { t, i18n } = useTranslation();
    
    const navigation = [
        { name: t('nav.home'), href: '#redes', current: true},
        { name: t('nav.about'), href: '#sobreMi', current: false},
        { name: t('nav.education'), href: '#formacionAcademica', current: false },
        { name: t('nav.projects'), href: '#proyectos', current: false },
        { name: t('nav.skills'), href: '#skill', current: false},
        { name: t('nav.softSkill'), href: '#softSkill', current: false},
        { name: t('nav.hobbies'), href: '#hobbies', current: false},    
        { name: t('nav.contact'), href: '#contacto', current: false}
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <>
            <Disclosure as="nav" className="w-full flex justify-between text-text-primary "> 
                <div className="w-full flex justify-between sm:pr-2 lg:px-8">
                    <div className="relative flex h-16 items-center justify-start w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 dark:text-dark-text-primary hover:bg-dark-text-muted hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <span className="absolute -inset-0.5" />
                                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                                </DisclosureButton>
                        </div>
                        <div className="flex sm:items-stretch justify-between w-full">
                            <div className="flex shrink-0 items-center">
                                <img
                                    className='logo rounded-lg size-9 h-8 w-auto' 
                                    src={logo}
                                    alt='logo' />
                                    
                            </div>
                            {/* Desktop Navigation */}
                            <div className="hidden sm:flex ml-auto justify-end">
                                <div className="flex space-x-3">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                            item.current ? 'hover:bg-text-primary text-bg-section dark:hover:bg-text-secondary' : 'text-bg-card hover:bg-dark-card hover:text-dark-text dark:hover:bg-text-secondary',
                                            'rounded-md py-2 md:text-sm lg:text-xl font-medium linkNav',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                {/* Language Switcher - Desktop */}
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => changeLanguage('es')}
                                        className={classNames(
                                            'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                                            i18n.language === 'es' 
                                                ? 'bg-primary text-bg-section' 
                                                : 'bg-bg-card text-text-secondary hover:bg-dark-card dark:bg-bg-card dark:text-dark-text-muted dark:hover:bg-text-secondary'
                                        )}
                                    >
                                        ES
                                    </button>
                                    <button
                                        onClick={() => changeLanguage('en')}
                                        className={classNames(
                                            'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                                            i18n.language === 'en' 
                                                ? 'bg-primary text-bg-section' 
                                                : 'bg-bg-card text-text-secondary hover:bg-dark-card dark:bg-bg-card dark:text-dark-text-muted dark:hover:bg-text-secondary'
                                        )}
                                    >
                                        EN
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile menu panel */}
                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                            item.current ? 'text-dark-text-primary dark:text-primary' : 'text-text-primary dark:text-dark-text-primary hover:text-primary',
                            'block rounded-md px-3 py-2 text-lg font-medium transition-colors',
                        )}
                        >
                        {item.name}
                        </DisclosureButton>
                    ))}
                        {/* Language Switcher - Mobile */}
                        <div className="flex gap-2 px-3 py-2">
                            <button
                                onClick={() => changeLanguage('es')}
                                className={classNames(
                                    'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    i18n.language === 'es' 
                                        ? 'bg-primary text-bg-card' 
                                        : 'bg-bg text-text-secondary dark:bg-gray-700 dark:text-dark-text-secondary'
                                )}
                            >
                                Español
                            </button>
                            <button
                                onClick={() => changeLanguage('en')}
                                className={classNames(
                                    'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    i18n.language === 'en' 
                                        ? 'bg-primary text-bg-card' 
                                        : 'bg-bg text-text-secondary dark:bg-gray-700 dark:text-dark-text-secondary'
                                )}
                            >
                                English
                            </button>
                        </div>
                    </div>
                </DisclosurePanel>
                {/* Dark/Light */}
                <button 
                    onClick={toggleDarkMode}
                    className="text-text-primary text-2xl hover:text-accent transition-colors dark:text-dark-text-primary"
                >
                    <GoMoon />                    
                </button>
            </Disclosure>            
        </>
    );
}
export default Navbar;