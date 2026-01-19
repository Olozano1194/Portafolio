import {Link} from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFile  } from 'react-icons/fa';



function Redes() {
    return (
        <section id='redes' className="redesDiv text-justify text-[1rem] text-text-primary border-b-2 border-stone-900 p-7 md:text-[1.3rem] dark:bg-dark-bg">
            <article className='font-ubuntu leading-9 dark:text-bg-card'>
                <p>
                    Hola, soy <span className='text-text-primary font-bold dark:text-primary'>Oscar Eduardo Lozano    Bocanegra,</span>
                </p>
                <p>
                    <span className='text-text-primary font-bold dark:text-primary'>Ingeniero de sistemas(ITFIP)</span>, apasionado por el desarrollo web.
                </p> 
                <p>
                    Mi enfoque principal es el ecosistema <span className='text-text-primary font-bold dark:text-primary'>Front-End</span>, donde desarrollo interfaces dinámicas, modernas y funcionales utilizando <span className='text-text-primary font-bold dark:text-primary'>JavaScript, React y Tailwind CSS</span>.
                </p>
                <p>
                    En este portafolio puedes explorar mis proyectos en <span className='text-text-primary font-bold dark:text-primary'>GitHub</span>, conocer mi perfil profesional en <span className='text-text-primary font-bold dark:text-primary'>LinkedIn</span> o descarga mi <span className='text-text-primary font-bold dark:text-primary'>CV</span>.
                </p>
                <p>
                    Estoy en constante aprendizaje y preparado para aportar soluciones técnicas en entornos de desarrollo profesional.
                </p>
                <span>¡Te invito a explorar mis proyectos!.</span>
            </article> 
            <div className='flex items-center justify-center gap-10 p-4 text-4xl dark:text-bg-section'>
                <Link to={'https://www.linkedin.com/in/OlozanoBocanegra'} target='_blank' className='hover:text-[#0e76a8] redes xl:text-5xl'><FaLinkedin /></Link>
                <Link to={'https://github.com/Olozano1194'} target='_blank' className='hover:text-[#171515] redes xl:text-5xl'><FaGithub /></Link>
                <Link to={'curriculum/CV_Oscar_Lozano_Front_Developer_Jr.pdf'} target='_blank' className='hover:text-green-600 redes xl:text-5xl'><FaFile /></Link>
            </div>
                  
        </section>
    )
}
export default Redes;

