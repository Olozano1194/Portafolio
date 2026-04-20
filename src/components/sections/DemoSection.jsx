import { useParams, useNavigate } from 'react-router-dom';
import { proyectos } from '../../data/proyectos';
import CarruselDemo from '../carruselDemo/CarruselDemo';
// icons
import { MdCheckCircle, MdArrowOutward } from "react-icons/md";
import { FaArrowLeft, FaShareAlt, FaSignInAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


const DemoSection = () => {
    const { id } = useParams();
    const proyecto = proyectos.find((proyecto) => proyecto.id === parseInt(id));
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Traducciones
    const projectNotFound = t('demoProject.projectNotFound');
    const goBack = t('demoProject.goBack');
    const caseStudyLabel = t('demoProject.caseStudy');
    const projectDetailsTitle = t('demoProject.projectDetailsTitle');
    const featuresLabel = t('demoProject.features');
    const credentialsLabel = t('demoProject.credentials');
    const userLabel = t('demoProject.user');
    const passwordLabel = t('demoProject.password');
    const viewProjectLabel = t('demoProject.viewProject');
    const shareLabel = t('demoProject.share');
    const mainInterface = t('demoProject.mainInterface');
    const performanceFocus = t('demoProject.performanceFocus');
    const architecturalStackLabel = t('demoProject.architecturalStack');
    const frontendLabel = t('demoProject.frontend');
    const backendLabel = t('demoProject.backend');
    const databaseLabel = t('demoProject.database');
    const infrastructureLabel = t('demoProject.infrastructure');

    // Datos dinámicos del proyecto - usar clave numérica
    const projectId = parseInt(id);
    const projectTitle = t(`projects.items.${projectId}.title`);
    const projectYear = proyecto?.year || '2024';
    const projectStack = proyecto?.stack || [];
    const projectCategory = proyecto?.category || 'Proyecto';
    
    // Descripción y features con fallback a projects.items
    const demoDesc = t(`demoProject.projectDetails.${projectId}.description`);
    const projDesc = t(`projects.items.${projectId}.description`);
    const projectDescription = demoDesc || projDesc;
    
    const projectFeatures = t(`demoProject.projectDetails.${projectId}.features`, { returnObjects: true }) || [];
    const projectPerformance = t(`demoProject.projectDetails.${projectId}.performance`);
    const architecturalStack = proyecto?.architecturalStack || { frontend: '', backend: '', database: '' };
    const credentials = proyecto?.credenciales;
    const verProyecto = proyecto?.ver_proyecto;
    const imgDemo = proyecto?.imgDemo?.img || [];
    
    // Verificar si hay una URL válida para el proyecto
    const tieneDemoUrl = verProyecto && verProyecto.trim() !== '' && verProyecto !== '/' && verProyecto !== '#';

    if (!proyecto) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">{projectNotFound}</h2>
                <button 
                    onClick={() => navigate(-1)} 
                    className="bg-primary text-white px-4 py-2 rounded-md"
                >
                    {goBack}
                </button>
            </div>
        );
    }

    return (
        <>
        {/* Section */}
        <section className='max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-10'>
            <header className='mb-16'>
                <div className='flex flex-col gap-6 justify-between md:items-end md:flex-row'>
                    <div className='max-w-3xl'>
                        <span className='block font-label mb-4 text-sm tracking-widest text-primary uppercase'>{caseStudyLabel} / {projectYear}</span>
                        <h1 className='font-extrabold leading-[1.1] mb-4 text-3xl text-on-surface tracking-tighter md:text-5xl'>{projectTitle}</h1>
                    </div>
                    <div className='flex flex-wrap gap-3'>
                        {projectStack.map((tech, index) => (
                            <span key={index} className='bg-surface-container font-label font-medi px-4 py-1.5 rounded-full text-xs text-on-surface-variant'>{tech}</span>
                        ))}
                    </div>
                </div>
            </header>
            {/* Main Content */}
            <section className='grid grid-cols-1 gap-6 items-start md:grid-cols-12'>
                {/* Left Column */}
                <div className='space-y-12 md:col-span-5'>
                    {/* Description */}
                    <section className='bg-surface-alt border border-white/5 p-8 rounded-xl'>
                        <h2 className='font-label mb-6 text-xs text-primary tracking-widest'>{projectDetailsTitle}</h2>
                        <p className='leading-relaxed mb-8 text-lg text-on-surface-variant'>{projectDescription}</p>
                        <ul className='space-y-6'>
                            {Array.isArray(projectFeatures) && projectFeatures.map((feature, index) => (
                                <li key={index} className='flex gap-4 items-center'>
                                    <span className='text-primary mt-1'><MdCheckCircle /></span>
                                    <span className='leading-snug text-on-surface/80'>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                    {/* Credentials */}
                    {credentials && (
                        <section className='bg-surface-container/50 border border-white/5 p-4 rounded-xl'>
                            <h2 className='font-label mb-6 text-xs tracking-widest text-primary'>{credentialsLabel}</h2>
                            <div className='space-y-4'>
                                <div className='border-b border-white/5 flex items-center justify-between pb-4'>
                                    <span className='font-label text-sm text-on-surface-variant'>{userLabel}</span>
                                    <code className='font-medium text-primary tracking-wider'>{credentials.user}</code>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='font-label text-sm text-on-surface-variant'>{passwordLabel}</span>
                                    <code className='font-medium text-primary tracking-wider'>{credentials.pass}</code>
                                </div>
                            </div>
                        </section>
                    )}
                    {/* CTA */}
                    <section className='flex gap-4'>
                        {tieneDemoUrl ? (
                            <a href={verProyecto} target='_blank' className='bg-linear-to-r cursor-pointer font-bold flex flex-1 gap-2 items-center justify-center from-primary py-4 rounded-xl to-primary-container text-on-primary transition-all active:scale-95 hover:brightness-110'>
                                {viewProjectLabel}<MdArrowOutward />
                            </a>
                        ) : (
                            <div className='flex-1'></div>
                        )}
                        <button className='bg-surface-alt cursor-pointer p-4 rounded-xl text-on-surface transition-colors hover:bg-on-surface-variant'>
                            <FaShareAlt />
                        </button>
                    </section>                    
                    </div>
                {/* Right Column */}
                <div className='space-y-6 md:col-span-7'>
                    {/* Primary Img - Primera imagen del proyecto */}
                    <div className='aspect-16/10 border border-white/5 bg-surface-container group overflow-hidden relative rounded-xl'>
                        {imgDemo[0] ? (
                            <>
                                <img src={imgDemo[0]} className='duration-700 group-hover:scale-105 h-full object-cover transition-transform w-full' alt={`${projectTitle} - Interface`} />
                                <div className='absolute bg-linear-to-t flex from-background/60 inset-0 items-end opacity-0 p-8 to-transparent transition-opacity group-hover:opacity-100'>
                                    <p className='font-label text-sm text-on-surface'>{mainInterface}</p>
                                </div>
                            </>
                        ) : (
                            <div className='flex items-center justify-center h-full text-on-surface-variant'>
                                <span>No hay imagen disponible</span>
                            </div>
                        )}
                    </div>
                    {/* Secondary Gallery - Siguientes imágenes */}
                    <div className='grid grid-cols-2 gap-6'>
                        {imgDemo.slice(1, 3).map((img, index) => (
                            <div key={index} className='aspect-square bg-surface-container border border-white/5 group overflow-hidden rounded-xl'>
                                <img src={img} className='duration-700 group-hover:scale-105 h-full object-cover transition-transform w-full' alt={`${projectTitle} - ${index + 2}`} />
                            </div>
                        ))}
                    </div>
                    {/* Feature - Solo mostrar si hay performance */}
                    {projectPerformance && (
                        <div className='border-l-4 border-primary bg-surface-alt p-8 rounded-xl'>
                            <h3 className='font-bold mb-2 text-xl text-on-surface'>{performanceFocus}</h3>
                            <p className='text-on-surface-variant text-sm'>{projectPerformance}</p>
                        </div>
                    )}
                </div>                
            </section>
            {/* Details */}
            <section className='border-t border-white/5 mt-24 pt-24'>
                <h2 className='font-bold mb-12 text-3xl text-on-surface-variant tracking-tighter'>{architecturalStackLabel}</h2>
                <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
                    <div className='space-y-2'>
                        <p className='font-label text-xs text-primary tracking-widest md:text-lg'>{frontendLabel}</p>
                        <p className='font-medium text-on-surface/60'>{architecturalStack.frontend}</p>
                    </div>
                    <div className='space-y-2'>
                        <p className='font-label text-xs text-primary tracking-widest md:text-lg'>{backendLabel}</p>
                        <p className='font-medium text-on-surface/60'>{architecturalStack.backend}</p>
                    </div>
                    <div className='space-y-2'>
                        <p className='font-label text-xs text-primary tracking-widest md:text-lg'>{databaseLabel}</p>
                        <p className='font-medium text-on-surface/60'>{architecturalStack.database}</p>
                    </div>
                    <div className='space-y-2'>
                        <p className='font-label text-xs text-primary tracking-widest md:text-lg'>{infrastructureLabel}</p>
                        <p className='font-medium text-on-surface/60'>{architecturalStack.infrastructure}</p>
                    </div>
                </div>
            </section>
        </section>
        </>
    );
};
export default DemoSection;