import { useState, useEffect, useCallback } from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import type { VideoDemoProps } from '../../../types/demo';

const VideoDemo = ({ videos, titulo, descripcion }: VideoDemoProps): React.ReactElement => {
    const [selectedVideo, setSelectedVideo] = useState(0);

    const totalVideos = videos.length;

    const goToPrev = useCallback(() => setSelectedVideo((prev) => (prev - 1 + totalVideos) % totalVideos), [totalVideos]);
    const goToNext = useCallback(() => setSelectedVideo((prev) => (prev + 1) % totalVideos), [totalVideos]);

    useEffect(() => {
        if (totalVideos <= 1) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [totalVideos, goToPrev, goToNext]);

    const currentVideo = videos[selectedVideo];

    return (
        <section className='max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-10'>
            <header className='mb-16'>
                <h1 className='font-extrabold leading-[1.1] mb-4 text-3xl text-on-surface tracking-tighter md:text-5xl'>{titulo}</h1>
                <p className='leading-relaxed font-body max-w-lg text-on-surface-variant/80 text-lg'>{descripcion}</p>
            </header>
            <div className='aspect-video bg-surface-alt border border-on-border/15 overflow-hidden shadow-2xl relative rounded-xl w-full'>
                <video
                    controls
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    preload="metadata"
                >
                    <source src={currentVideo?.src} type="video/mp4" />
                    Tu navegador no soporta video HTML5.
                </video>
            </div>
            {totalVideos > 1 && (
                <div className='flex gap-4 justify-center mt-6'>
                    <button
                        onClick={goToPrev}
                        className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary'
                        aria-label='Video anterior'
                    >
                        <MdChevronLeft size={32} />
                    </button>
                    <span className='flex items-center text-on-surface-variant font-label text-sm'>{selectedVideo + 1} / {totalVideos}</span>
                    <button
                        onClick={goToNext}
                        className='cursor-pointer duration-300 p-2 rounded-full text-on-background/70 text-lg transition-all active:scale-95 hover:text-primary'
                        aria-label='Video siguiente'
                    >
                        <MdChevronRight size={32} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default VideoDemo;