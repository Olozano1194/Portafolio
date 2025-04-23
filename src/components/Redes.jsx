import {Link} from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFile  } from 'react-icons/fa';



function Redes() {
    return (
        <section id='redes' className="redesDiv text-justify text-[1.05rem] text-slate-950 border-b-2 border-stone-900 p-7 md:text-[1.4rem]">
            <p>Hola, soy <span className='text-black font-bold'>Oscar Eduardo Lozano    Bocanegra</span>
            </p>

            <p>Ingeniero de sistemas, graduado de la institución de educación superior      <span className='font-bold'>ITFIP</span>.<br></br> Me he estado especializando en desarrollo Front-End con experiencia en tecnologías como JavaScript, React y Tailwind.<br></br>
            Explora mis proyectos en GitHub, mi perfil profesional en LinkedIn o descarga mi CV.<br></br>
            ¡Gracias por visitar! Espero que disfrutes explorando mi trabajo.                
            </p>

            <div className='flex items-center justify-center gap-10 p-4 text-4xl'>
                <Link to={'https://www.linkedin.com/in/OlozanoBocanegra'} target='_blank' className='hover:text-[#0e76a8] redes xl:text-5xl'><FaLinkedin /></Link>
                <Link to={'https://github.com/Olozano1194'} target='_blank' className='hover:text-[#171515] redes xl:text-5xl'><FaGithub /></Link>
                <Link to={'curriculum/CurriculumOscarLozanoV2.pdf'} target='_blank' className='hover:text-green-600 redes xl:text-5xl'><FaFile /></Link>
            </div>
                  
        </section>
    )
}

export default Redes;

