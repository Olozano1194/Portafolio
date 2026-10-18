import { useState, useEffect, useCallback } from 'react';
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import type { ImageGalleryDemoProps } from '../../../types/demo';

const ImageGalleryDemo = ({ images, titulo, descripcion }: ImageGalleryDemoProps): React.ReactElement => {
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
                    <h1 className='font-extrabold leading-[1.1] mb-4 text-3xl text-on-surface tracking-tighter md:text-5xl'>{titulo}</h1>
                    <p className='leading-relaxed font-body max-w-lg text-on-surface-variant/80 text-lg'>{descripcion}</p>
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
                    <h1 className='font-extrabold leading-[1.1] mb-4 text-3xl text-on-surface tracking-tighter md:text-5xl'>{titulo}</h1>
                    <p className='leading-relaxed font-body max-w-lg text-on-surface-variant/80 text-lg'>{descripcion}</p>
                </header>
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
            </section>

            {selectedImg !== null && selectedImage && (
                <div
                    className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center'
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className='absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors'
                        aria-label='Cerrar'
                    >
                        <MdClose size={36} />
                    </button>

                    {totalImages > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                                className='absolute left-4 z-10 text-white/80 hover:text-white transition-colors'
                                aria-label='Anterior'
                            >
                                <MdChevronLeft size={48} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                className='absolute right-4 z-10 text-white/80 hover:text-white transition-colors'
                                aria-label='Siguiente'
                            >
                                <MdChevronRight size={48} />
                            </button>
                        </>
                    )}

                    <img
                        src={selectedImage.src}
                        className='max-h-[90vh] max-w-[90vw] object-contain rounded-lg select-none'
                        onClick={(e) => e.stopPropagation()}
                        alt={selectedImage.alt}
                        draggable={false}
                    />

                    {totalImages > 1 && (
                        <span className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-label tracking-widest'>
                            {selectedImg + 1} / {totalImages}
                        </span>
                    )}
                </div>
            )}
        </>
    );
};

export default ImageGalleryDemo;