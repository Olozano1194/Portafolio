import { useLocation, useNavigate } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
// utils
import { scrollToSection } from '../../utils/scrollToSection';
import logo from '../../assets/logoOscar.png';
// icons
import { MdDarkMode, MdLanguage } from "react-icons/md";

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
};

const getSectionId = (href) => {
    return href.replace('#', '');
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Logo handler: scroll to top if on home, navigate to home if elsewhere
const handleLogoClick = (isHome, navigate) => {
    if (isHome) {
        scrollToTop();
    } else {
        navigate('/');
    }
};

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    const navigation = [        
        { name: t('nav.about'), href: '#sobreMi', current: false},
        { name: t('nav.education'), href: '#formacionAcademica', current: false },
        { name: t('nav.projects'), href: '#proyectos', current: false },
        { name: t('nav.skills'), href: '#skill', current: false},        
        { name: t('nav.hobbies'), href: '#hobbies', current: false},    
        { name: t('nav.contact'), href: '#contacto', current: false}
    ];

    const handleNavClick = (href) => {
        scrollToSection(getSectionId(href));
    };

    const changeLanguage = () => {
       const newLang = i18n.language === 'es' ? 'en' : 'es';
       i18n.changeLanguage(newLang);
    };

    return (
        <Disclosure as="nav" className="backdrop-blur-xl bg-background/70 fixed w-full top-0 z-50 dark:bg-background/70">
            <div className="font-headline w-full mx-auto px-4 sm:px-3 lg:px-16">
                <div className="flex gap-6 h-16 items-center justify-between">
                    {/* Logo y nombre */}
                    <div className="flex gap-1 w-auto items-center">
                        <img
                            className="hidden rounded-lg size-9 h-8 w-auto cursor-pointer sm:block"
                            src={logo}
                            alt="logo"
                            onClick={() => handleLogoClick(isHome, navigate)}
                        />
                        <button
                            onClick={() => handleLogoClick(isHome, navigate)}
                            className="font-bold text-xl tracking-tight text-on-background cursor-pointer md:text-lg"
                        >
                            The Digital Architect
                        </button>
                    </div>
                    {/* Botón menú móvil */}
                    <div className="sm:hidden">
                        <DisclosureButton className="p-2 rounded-b-md hover:bg-on-background text-on-background/80 focus:outline-none focus:ring-2 focus:ring-primary">
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-4 sm:flex lg:gap-12">
                        <div className="flex gap-4 lg:gap-8">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'border-b-2 border-primary font-semibold text-primary transition-colors' : 'text-on-background/70 hover:text-on-background',
                                        'text-sm lg:text-base',
                                    )}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        {/* language and dark/light */}
                        <div className='flex gap-4 items-center'>
                            <button
                                onClick={changeLanguage} 
                                className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary'>
                                <MdLanguage />
                            </button>                            
                            <button className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary'>
                            <MdDarkMode />
                            </button>
                        </div>                        
                    </div>
                </div>
            </div>
            {/* Mobile menu panel */}
            <DisclosurePanel className="absolute bg-background/70 backdrop-blur-sm right-0 rounded-bl-lg top-16 shadow-lg p-4 sm:hidden">
                {({ close }) => (
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="button"
                                onClick={() => {
                                    close(); // cierra el menú móvil
                                    handleNavClick(item.href); // luego hace scroll
                                }}
                                className={classNames(
                                    item.current ? 'flex font-semibold justify-end text-primary transition-colors' : 'flex justify-end text-on-background/70 hover:text-on-background w-full',
                                    'px-3 py-2 font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                        {/* language and dark/light */}
                        <div className='flex gap-4 justify-end'>
                            <button className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary lg:text-2xl'>
                            <MdLanguage />
                            </button>                            
                            <button className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary lg:text-2xl'>
                            <MdDarkMode />
                            </button>
                        </div>
                    </div>
                )}
            </DisclosurePanel>
        </Disclosure >
    );
};
export default Navbar;