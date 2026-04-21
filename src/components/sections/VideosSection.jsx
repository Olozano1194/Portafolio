import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { proyectos } from '../../data/proyectos';
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const VideosSection = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const proyecto = proyectos.find((proyecto) => proyecto.id === parseInt(id));
    const navigate = useNavigate();
    
    const backBtn = t('videoProject.backBtn');
    const browserNotSupported = t('videoProject.browserNotSupported');
    const theChallenge = t('videoProject.theChallenge');
    const uptimeReliability = t('videoProject.uptimeReliability');
    const techStackLabel = t('videoProject.techStack');
    const viewCaseStudy = t('videoProject.viewCaseStudy');
    const categoryLabel = t('videoProject.category');
    const yearLabel = t('videoProject.year');
    
    // Datos dinámicos del proyecto
    const projectCategory = proyecto?.category || 'Proyecto';
    const projectYear = proyecto?.year || '2024';
    const projectStack = proyecto?.stack || [];
    const projectChallenge = proyecto?.challenge ? t(`projects.projectDetails.${id}.challenge`) : t(`projects.projectDetails.${id}.challenge`);

    useEffect(() => {
        if (!proyecto || proyecto.tipo !== 'Video') {
            navigate('/');
        };
    }, [proyecto, navigate]);

    if (!proyecto) return null;


    return (
        <section className='max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-10'>
            <div className='mb-12'>
                <button onClick={() => navigate(-1)} className="group gap-2 inline-flex items-center text-primary transition-colors hover:text-primary-container"><FaArrowLeft />{backBtn}</button>
            </div>
            <header className='mb-16'>
                <div className='flex flex-col gap-6 justify-between md:items-end md:flex-row'>
                    <div className='max-w-4xl'>
                        <h1 className='font-bold mb-4 text-3xl text-on-background tracking-tighter md:text-5xl'>{t(`projects.items.${id}.title`)}</h1>
                        <div className='flex gap-3'>
                            <span className='bg-surface-container font-label px-3 py-1 rounded-full text-xs text-on-surface-variant uppercase'>{categoryLabel}: {projectCategory}</span>
                            <span className='bg-surface-container font-label px-3 py-1 rounded-full text-xs text-on-surface-variant uppercase'>{yearLabel}: {projectYear}</span>
                        </div>
                    </div>
                    <div className='leading-relaxed font-body max-w-lg text-on-surface-variant/80 text-lg'>
                        {t(`projects.items.${id}.description`)}                        
                    </div>
                </div>
            </header>
            {/* section video */}
            <section className='group relative'>
                <div className='aspect-video bg-surface-alt border border-on-border/15 overflow-hidden shadow-2xl relative rounded-xl w-full'>
                    <video
                        controls
                        width="100%"
                        height="100%"
                        className="absolute top-0 left-0"
                        preload="metadata"
                    >
                        <source src={`/videos/videos-${proyecto.img}.mp4`} type="video/mp4" />
                        {browserNotSupported}
                    </video>
                </div>
            </section>
            {/* Description footer */}
            <section className='grid grid-cols-1 gap-12 mt-24 md:grid-cols-12'>
                <div className='md:col-span-8'>
                    <h2 className='font-bold font-headline mb-6 text-3xl text-on-surface-variant'>{theChallenge}</h2>
                    <p className='leading-relaxed mb-8 text-lg text-on-surface-variant'>{projectChallenge}</p>
                    <div className='grid grid-cols-2 gap-8 mt-12'>
                        <div className='bg-surface-container p-8 rounded-xl'>
                            <p className='font-label font-bold mb-2 text-3xl text-primary'>99.9%</p>
                            <span className='font-label text-on-surface-variant text-xs tracking-widest uppercase'>{uptimeReliability}</span>
                        </div>
                        <div className='bg-surface-container p-8 rounded-xl'>
                            <p className='font-label font-bold flex flex-col mb-2 text-3xl text-primary'>99.9%</p>
                            <span className='font-label text-on-surface-variant text-xs tracking-widest uppercase'>{uptimeReliability}</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-8 md:col-span-4'>
                    <div className='bg-surface-container p-8 rounded-xl'>
                        <h3 className='font-label mb-6 text-xs text-on-surface tracking-widest uppercase'>{techStackLabel}</h3>
                        <div className='flex flex-wrap gap-2'>
                            {projectStack.map((tech, index) => (
                                <span key={index} className='bg-surface border border-on-border/15 px-3 py-1 text-on-surface font-label text-[10px] rounded'>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className='bg-primary cursor-pointer flex font-bold gap-2 items-center justify-center py-4 rounded-xl text-on-primary transition-transform hover:scale-[1.02] w-full'>
                        {viewCaseStudy}
                    </button>
                </div>
            </section>
        </section>
    );
}
export default VideosSection;