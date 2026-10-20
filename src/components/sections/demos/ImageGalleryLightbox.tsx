import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";

interface LightboxProps {
    selectedImage: { src: string; alt: string; titulo: string } | null;
    selectedImg: number | null;
    totalImages: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const Lightbox = ({ selectedImage, selectedImg, totalImages, onClose, onPrev, onNext }: LightboxProps): React.ReactElement | null => {
    if (!selectedImage || selectedImg === null) return null;

    return (
        <div className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center' onClick={onClose}>
            <button onClick={onClose} className='absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors' aria-label='Cerrar'>
                <MdClose size={36} />
            </button>

            {totalImages > 1 && (
                <>
                    <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className='absolute left-4 z-10 text-white/80 hover:text-white transition-colors' aria-label='Anterior'>
                        <MdChevronLeft size={48} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onNext(); }} className='absolute right-4 z-10 text-white/80 hover:text-white transition-colors' aria-label='Siguiente'>
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
    );
};

export default Lightbox;