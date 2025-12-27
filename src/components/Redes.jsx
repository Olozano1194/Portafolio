import {Link} from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFile  } from 'react-icons/fa';



function Redes() {
    return (
        <section id='redes' className="redesDiv text-justify text-[1rem] text-slate-950 border-b-2 border-stone-900 p-7 md:text-[1.4rem]">
            <p>Hola, soy <span className='text-black font-bold'>Oscar Eduardo Lozano    Bocanegra</span>
            </p>
            <p>Ingeniero de sistemas<span className='font-bold'>(ITFIP)</span>.<br></br> apasionado por el desarrollo web. Mi enfoque principal es el ecosistema Front-End, donde construyo interfaces dinámicas y funcionales utilizando JavaScript, React y Tailwind CSS.<br></br>
            Puedes Explorar mis proyectos en GitHub, ver mi perfil profesional en LinkedIn o descarga mi CV.<br></br>
            Estoy en constante aprendizaje y listo para aportar soluciones técnicas en entornos de desarrollo profesional. ¡Te invito a explorar mis proyectos!.                
            </p>

            <div className='flex items-center justify-center gap-10 p-4 text-4xl'>
                <Link to={'https://www.linkedin.com/in/OlozanoBocanegra'} target='_blank' className='hover:text-[#0e76a8] redes xl:text-5xl'><FaLinkedin /></Link>
                <Link to={'https://github.com/Olozano1194'} target='_blank' className='hover:text-[#171515] redes xl:text-5xl'><FaGithub /></Link>
                <Link to={'curriculum/CurriculumOscarLozanoV3.pdf'} target='_blank' className='hover:text-green-600 redes xl:text-5xl'><FaFile /></Link>
            </div>
                  
        </section>
    )
}

export default Redes;

