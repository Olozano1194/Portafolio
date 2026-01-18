//import { Link } from 'react-scroll';
//import SobreMi from "./Redes";
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
        <Disclosure as="nav" className="w-full flex justify-between">
            <div className="flex justify-between w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-start w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-slate-50 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                                        item.current ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
                        item.current ? 'hover:bg-gray-700 text-gray-300' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-0.5 text-sm font-medium',
                    )}
                    >
                    {item.name}
                    </DisclosureButton>
                ))}
                </div>
            </DisclosurePanel>
    </Disclosure>


            {/* <div className='lg:flex lg:items-center lg:gap-2 lg:w-8/12 lg:p-3'>
                <img
                className='logo rounded-lg size-9' 
                src={logo}
                alt='logo' />

                <h2 className='title flex justify-center items-center text-stone-50 font-bold hover:text-slate-300 cursor-pointer md:text-[1.2rem]'>Oscar Eduardo Lozano Bocanegra</h2>
            </div>
            
            <nav className='menu flex items-center justify-center gap-2 text-stone-50 md:gap-4 lg:justify-end lg:w-full'>
                <Link to='skill' smooth={true} duration={500} className='linkNav text-[0.78rem] md:text-[1.3rem] md:pl-3 lg:text-[1.1rem]' >Sobre Mi</Link>
                <Link to='skill' smooth={true} duration={500} className='linkNav text-[0.78rem] md:text-[1.3rem] lg:text-[1.1rem]' >Skills</Link>
                <Link to='softSkill' smooth={true} duration={500} className='linkNav text-[0.78rem] md:text-[1.3rem] lg:text-[1.1rem]' >Soft Skill</Link>
                <Link to='hobbies' smooth={true} duration={500} className='linkNav text-[0.78rem] md:text-[1.3rem] lg:text-[1.1rem]'>Hobbies</Link>
                <Link to='formacionAcademica' smooth={true} duration={500} className='linkNav text-[0.78rem] md:text-[1.1rem] lg:text-[1.2rem]' >Formación</Link>
                <Link to='proyectos' smooth={true} duration={500} className='linkNav text-[0.78rem] md:text-[1.3rem] lg:text-[1.1rem]' >Proyectos</Link>
                <Link to='contacto' smooth={true} duration={500} className='linkNav text-[0.78rem] md:text-[1.3rem] lg:text-[1.1rem] lg:pr-2 ' >Contacto</Link>
                        
            </nav> */}
        </>

    );

}
export default Navbar;