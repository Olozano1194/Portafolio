import { useLocation, useNavigate } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../../utils/scrollToSection';
import { useTheme } from '../../hooks/useTheme';
import { MdDarkMode, MdLightMode, MdLanguage } from "react-icons/md";

const LOGO_SRC = '/logo.webp';

const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
    return classes.filter(Boolean).join(' ');
};

const getSectionId = (href: string): string => {
    return href.replace('#', '');
};

const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

interface NavItem {
    name: string;
    href: string;
    current: boolean;
}

// Logo handler: scroll to top if on home, navigate to home if elsewhere
const handleLogoClick = (isHome: boolean, navigate: ReturnType<typeof useNavigate>): void => {
    if (isHome) {
        scrollToTop();
    } else {
        navigate('/');
    }
};

const Header = (): React.ReactElement => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const isHome = location.pathname === '/';

    const navigation: NavItem[] = [        
        { name: t('nav.about'), href: '#sobreMi', current: false},
        { name: t('nav.education'), href: '#formacionAcademica', current: false },
        { name: t('nav.projects'), href: '#proyectos', current: false },
        { name: t('nav.skills'), href: '#skill', current: false},        
        { name: t('nav.hobbies'), href: '#hobbies', current: false},    
        { name: t('nav.contact'), href: '#contacto', current: false}
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string): void => {
        e.preventDefault();
        const sectionId = getSectionId(href);
        if (isHome) {
            scrollToSection(sectionId);
        } else {
            navigate('/', { state: { scrollTo: sectionId }, replace: true });
        }
    };

    const changeLanguage = (): void => {
       const newLang = i18n.language === 'es' ? 'en' : 'es';
       i18n.changeLanguage(newLang);
    };

    return (
        <Disclosure as="nav" className="backdrop-blur-xl bg-background/70 fixed w-full top-0 z-50">
            <div className="font-headline w-full mx-auto px-4 sm:px-3 lg:px-16">
                <div className="flex gap-6 h-16 items-center justify-between">
                    {/* Logo y nombre */}
                    <div className="flex gap-2 w-auto items-center">
                        <img
                            className="rounded-lg size-9 h-8 w-auto cursor-pointer"
                            src={LOGO_SRC}
                            alt="logo"
                            onClick={() => handleLogoClick(isHome, navigate)}
                        />
                        <button
                            onClick={() => handleLogoClick(isHome, navigate)}
                            className="font-bold text-xl tracking-tight text-on-background cursor-pointer hidden md:block"
                        >
                            {t('nav.icons')}
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
                                    onClick={(e) => handleNavClick(e, item.href)}
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
                            <button 
                                onClick={toggleTheme}
                                className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary'>
                                {isDark ? <MdLightMode /> : <MdDarkMode />}
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
                                onClick={(e) => {
                                    close();
                                    handleNavClick(e, item.href);
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
                            <button 
                                onClick={changeLanguage}
                                className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary lg:text-2xl'>
                            <MdLanguage />
                            </button>                            
                            <button 
                                onClick={toggleTheme}
                                className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary lg:text-2xl'>
                                {isDark ? <MdLightMode /> : <MdDarkMode />}
                            </button>
                        </div>
                    </div>
                )}
            </DisclosurePanel>
        </Disclosure >
    );
};
export default Header;