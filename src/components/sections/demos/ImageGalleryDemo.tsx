import { useState, useEffect, useCallback } from 'react';
import { MdCheckCircle, MdArrowOutward } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import type { ImageGalleryDemoProps } from '../../../types/demo';
import Lightbox from './ImageGalleryLightbox';

const ImageGalleryDemo = ({ 
    images, 
    titulo, 
    descripcion, 
    proyectoId,
    stack, 
    year,
    verProyecto,
    credenciales,
    architecturalStack 
}: ImageGalleryDemoProps): React.ReactElement => {
    const { t } = useTranslation();

    const projectYear = year || '2024';
    const projectStack = stack || [];
    const caseStudyLabel = t('demoProject.caseStudy');
    const projectDetailsTitle = t('demoProject.projectDetailsTitle');
    const credentialsLabel = t('demoProject.credentials');
    const userLabel = t('demoProject.user');
    const passwordLabel = t('demoProject.password');
    const viewProjectLabel = t('demoProject.viewProject');
    const shareLabel = t('demoProject.share');
    const performanceFocus = t('demoProject.performanceFocus');
    const architecturalStackLabel = t('demoProject.architecturalStack');

    const demoDesc = t(`demoProject.projectDetails.${proyectoId}.description`);
    const projDesc = t(`projects.items.${proyectoId}.description`);
    const projectDescription = demoDesc || projDesc || descripcion;

    const projectFeatures = t(`demoProject.projectDetails.${proyectoId}.features`, { returnObjects: true }) || [];
    const projectPerformance = t(`demoProject.projectDetails.${proyectoId}.performance`);
    const archStack = architecturalStack || { frontend: '', backend: '', database: '', infrastructure: '' };

    const tieneDemoUrl = verProyecto && verProyecto.trim() !== '' && verProyecto !== '/' && verProyecto !== '#';
    const credentialsEntries = Object.entries(credenciales ?? {});

    const [selectedImg, setSelectedImg] = useState<number | null>(null);

    const totalImages = images.length;

    const openLightbox = useCallback((index: number) => setSelectedImg(index), []);
    const closeLightbox = useCallback(() => setSelectedImg(null), []);
    const goToPrev = useCallback(() => setSelectedImg((prev) => prev !== null ? (prev - 1 + totalImages) % totalImages : null), [totalImages]);
    const goToNext = useCallback(() => setSelectedImg((prev) => prev !== null ? (prev + 1) % totalImages : null), [totalImages]);

    useEffect(() => {
        if (selectedImg === null) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [selectedImg, closeLightbox, goToPrev, goToNext]);

    const firstImage = images[0];
    const selectedImage = selectedImg !== null ? images[selectedImg] : null;

    if (totalImages === 0 || !firstImage) {
        return (
            <section className='max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-10'>
                <header className='mb-16'>
                    <div className='flex flex-col gap-6 justify-between md:items-end md:flex-row'>
                        <div className='max-w-3xl'>
                            <span className='block font-label mb-4 text-sm tracking-widest text-primary uppercase'>{caseStudyLabel} / {projectYear}</span>
                            <h1 className='font-extrabold leading-[1.1] mb-4 text-3xl text-on-surface tracking-tighter md:text-5xl'>{titulo}</h1>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            {projectStack.map((tech, index) => (
                                <span key={index} className='bg-surface-container font-label font-medium px-4 py-1.5 rounded-full text-xs text-on-surface-variant'>{tech}</span>
                            ))}
                        </div>
                    </div>
                </header>
                <div className='flex items-center justify-center h-96 text-on-surface-variant'>
                    <span>No hay imágenes disponibles</span>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className='max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-10'>
                <header className='mb-16'>
                    <div className='flex flex-col gap-6 justify-between md:items-end md:flex-row'>
                        <div className='max-w-3xl'>
                            <span className='block font-label mb-4 text-sm tracking-widest text-primary uppercase'>{caseStudyLabel} / {projectYear}</span>
                            <h1 className='font-extrabold leading-[1.1] mb-4 text-3xl text-on-surface tracking-tighter md:text-5xl'>{titulo}</h1>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            {projectStack.map((tech, index) => (
                                <span key={index} className='bg-surface-container font-label font-medium px-4 py-1.5 rounded-full text-xs text-on-surface-variant'>{tech}</span>
                            ))}
                        </div>
                    </div>
                </header>
                <section className='grid grid-cols-1 gap-6 items-start md:grid-cols-12'>
                    <div className='space-y-12 md:col-span-5'>
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
                        {credenciales && (
                            <section className='bg-surface-container/50 border border-white/5 p-4 rounded-xl'>
                                <h2 className='font-label mb-6 text-xs tracking-widest text-primary'>
                                    {credentialsLabel}
                                </h2>
                                <div className='space-y-4'>
                                    {credentialsEntries.map(([key, value], index) => (
                                        <div
                                            key={key}
                                            className={`flex items-center justify-between ${index !== credentialsEntries.length - 1
                                                ? 'border-b border-white/5 pb-4'
                                                : ''
                                                }`}
                                        >
                                            <span className='font-label text-sm text-on-surface-variant'>
                                                {{
                                                    user: userLabel,
                                                    pass: passwordLabel,
                                                }[key]}
                                            </span>
                                            <code className='font-medium text-primary tracking-wider'>
                                                {value}
                                            </code>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        <section className='flex gap-4'>
                            {tieneDemoUrl ? (
                                <>
                                <a href={verProyecto} target='_blank' className='bg-linear-to-r cursor-pointer font-bold flex flex-1 gap-2 items-center justify-center from-primary py-4 rounded-xl to-primary-container text-on-primary transition-all active:scale-95 hover:brightness-110'>
                                    {viewProjectLabel}<MdArrowOutward />
                                </a>
                                <button className='bg-surface-alt cursor-pointer p-4 rounded-xl text-on-surface transition-colors hover:bg-on-surface-variant' title={shareLabel}>
                                    <FaShareAlt />
                                </button>
                                </>
                            ) : (
                                <div className='flex-1'></div>
                            )}
                        </section>
                    </div>
                    <div className='space-y-6 md:col-span-7'>
                        <div className='aspect-16/10 border border-white/5 bg-surface-container group overflow-hidden relative rounded-xl'>
                            <img
                                src={firstImage.src}
                                className='cursor-pointer duration-700 group-hover:scale-105 h-full object-cover transition-transform w-full'
                                alt={firstImage.alt}
                                onClick={() => openLightbox(0)}
                            />
                            <div onClick={() => openLightbox(0)} className='absolute bg-linear-to-t cursor-pointer flex from-background/60 inset-0 items-end opacity-0 p-8 to-transparent transition-opacity group-hover:opacity-100'>
                                <p className='font-label text-sm text-on-surface'>{firstImage.titulo}</p>
                            </div>
                        </div>
                        {totalImages > 1 && (
                            <div className='grid grid-cols-2 gap-6 mt-6'>
                                {images.slice(1).map((img, index) => (
                                    <div
                                        key={index}
                                        className='aspect-square bg-surface-container border border-white/5 cursor-pointer group overflow-hidden rounded-xl'
                                        onClick={() => openLightbox(index + 1)}
                                    >
                                        <img src={img.src} className='duration-700 group-hover:scale-105 h-full object-cover transition-transform w-full' alt={img.alt} />
                                    </div>
                                ))}
                            </div>
                        )}
                        {projectPerformance && (
                            <div className='border-l-4 border-primary bg-surface-alt p-8 rounded-xl'>
                                <h3 className='font-bold mb-2 text-xl text-on-surface'>{performanceFocus}</h3>
                                <p className='text-on-surface-variant text-sm'>{projectPerformance}</p>
                            </div>
                        )}
                    </div>
                </section>
                <section className='border-t border-white/5 mt-24 pt-24'>
                    <h2 className='font-bold mb-12 text-3xl text-on-surface-variant tracking-tighter'>{architecturalStackLabel}</h2>
                    <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
                        {Object.entries(archStack).map(([key, value]) => (
                            <div key={key} className='space-y-2'>
                                <p className='font-label text-xs text-primary tracking-widest md:text-lg'>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </p>
                                <p className='font-medium text-on-surface/60'>{value}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </section>

            <Lightbox
                selectedImage={selectedImage ?? null}
                selectedImg={selectedImg}
                totalImages={totalImages}
                onClose={closeLightbox}
                onPrev={goToPrev}
                onNext={goToNext}
            />
        </>
    );
};

export default ImageGalleryDemo;