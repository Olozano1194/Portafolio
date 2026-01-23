import { useParams, Link, useNavigate } from 'react-router-dom';
import { proyectos } from '../data/proyectos';
import CarruselDemo from './carruselDemo/CarruselDemo';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


const Demo = () => {
    const { demoId } = useParams();
    const proyecto = proyectos.find((proyecto) => proyecto.id === parseInt(demoId));
    const navigate = useNavigate();
    const { t } = useTranslation();

    if (!proyecto) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Proyecto no encontrado</h2>
                <button 
                    onClick={() => navigate(-1)} 
                    className="bg-primary text-white px-4 py-2 rounded-md"
                >
                    Volver
                </button>
            </div>
        );
    }

    // Obtenemos las descripciones como un array
    const descriptions = t(`demo.items.${demoId}.descriptions`, { returnObjects: true });

    return (
        <>
        <button onClick={() => navigate(-1)} className="w-7 flex items-center mb-4 p-2 text-xl font-bold text-text-muted shadow-md shadow-slate-800 hover:text-text-primary hover:scale-110 dark:text-dark-text-primary dark:hover:text-dark-text-primary dark:shadow-dark-text-secondary dark:bg-text-secondary"
        >
            <FaArrowLeft />
        </button>
        {/* Section */}
        <section className='w-full overflow-hidden flex flex-col justify-center items-center'>
            {/* title */}
            <h1 className='text-4xl font-bold mb-6'>
                {t(`demo.items.${demoId}.title`)}
            </h1>
            {/* Descriptions */}
            <ul className='text-justify max-w-4xl space-y-3 mb-6'>
                {Array.isArray(descriptions) && descriptions.map((desc, index) => (
                    <li key={index} className='flex items-start text-lg'>
                        <span className='text-primary mr-2'>✓</span>
                        <span>{desc}</span>
                    </li>
                ))}
            </ul>
            {
                proyecto.credenciales && (
                    <div className='flex flex-col items-center mt-6'>
                        <h3 className='text-xl'>
                            {t(`demo.items.${demoId}.credentials.intro`)}
                        </h3>
                        <p className='text-xl'>
                            {t(`demo.items.${demoId}.credentials.userLabel`)}
                            <strong>
                                {proyecto.credenciales.user}
                            </strong>
                        </p>
                        <p className='text-xl'>
                            {t(`demo.items.${demoId}.credentials.passwordLabel`)}
                            <strong>
                                {proyecto.credenciales.pass}
                            </strong>
                        </p>
                    </div>                    
                )
            }
            {/* btn */}
            <div className='flex flex-col items-center mt-5'>
                <Link
                    to={proyecto.Demo}
                    target='_blanck'
                    className='bg-text-secondary font-bold rounded-xl px-4 py-2 text-2xl text-bg-card dark:bg-accent dark:hover:text-dark-text-primary'
                >
                    {t(`demo.items.${demoId}.btn`)}
                </Link>
            </div>
            {
                proyecto.credenciales && (
                    <article className="w-full flex flex-col items-center justify-center lg:w-[1000px]">
                         <h4 className='mt-10 mb-10 text-2xl font-semibold '>
                            {t(`demo.items.${demoId}.imgSection.title`)}
                        </h4>
                        <CarruselDemo
                            demoId={demoId}
                            imagenes={proyecto.imgDemo.img}
                        />      
                    </article>
                )                
            }            
            
        </section>
        </>
    );
};
export default Demo;