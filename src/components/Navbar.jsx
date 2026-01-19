import logo from '../assets/logoOscar1.jpeg';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const navigation = [
    { name: 'Home', href: '#redes', current: true},
    { name: 'Sobre Mi', href: '#sobreMi', current: false},
    { name: 'Formación', href: '#formacionAcademica', current: false },
    { name: 'Proyectos', href: '#proyectos', current: false },
    { name: 'Skills', href: '#skill', current: false},
    { name: 'Soft Skill', href: '#softSkill', current: false},
    { name: 'Hobbies', href: '#hobbies', current: false},    
    { name: 'Contacto', href: '#contacto', current: false}
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {  
    return (
        <>
            <Disclosure as="nav" className="w-full flex justify-between text-text-primary "> 
                <div className="flex justify-between w-full px-2 sm:px-3 lg:px-8">
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
                            <div className="hidden sm:flex ml-auto justify-end">
                                <div className="flex space-x-3">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                            item.current ? 'hover:bg-text-primary text-bg-section dark:hover:bg-text-secondary' : 'text-bg-section hover:bg-text-primary hover:text-dark-text dark:hover:bg-text-secondary',
                                            'rounded-md md:px-1 py-2 md:text-lg  lg:text-xl font-medium linkNav',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    </div>
                </DisclosurePanel>
                <button 
                    onClick={() => {document.documentElement.classList.toggle('dark')}}
                    className="text-text-muted hover:text-accent transition-colors"
                >
                    🌙
                </button>
            </Disclosure>            
        </>
    );
}
export default Navbar;