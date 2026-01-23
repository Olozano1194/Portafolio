import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Modal from 'react-modal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

Modal.setAppElement('#root');

const CarruselDemo = ({ demoId, imagenes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();


  return (
    <>
      {/* Carrusel visible */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        className="w-[370px] max-w-xl cursor-pointer md:w-[600px] lg:w-[800px]"
      >
        {imagenes.map((img, i) => {
          // Obtener traducciones para cada img
          const imgData = t(`demo.items.${demoId}.imgSection.items.${i}`, { returnObjects: true });

          return (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={imgData.title || `Imagen ${i + 1 }`}
                className="w-full rounded-xl"
                onClick={() => { setActiveIndex(i); setModalOpen(true); }}
              />
              <div className="text-center mt-2">
                <h3 className="font-bold text-blue-600 text-xl">
                  {imgData.title}
                </h3>
                <p className="text-base">
                  {imgData.description}
                </p>
              </div>
            </SwiperSlide>
          );          
        })}
      </Swiper>
      {/* Modal para ver imágenes en grande */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="w-[400px] bg-black p-5 max-w-3xl mx-auto mt-10 rounded-xl md:w-[700px] lg:w-[900px]"
        overlayClassName="fixed inset-0 bg-black/80 z-50 flex justify-center items-start"
      >
        <Swiper
          modules={[Navigation]}
          navigation
          initialSlide={activeIndex}
          spaceBetween={20}
          slidesPerView={1}
        >
          {imagenes.map((img, i) => {
            // Obtener traducciones para cada img
            const imgData = t(`demo.items.${demoId}.imgSection.items.${i}`, { returnObjects: true });

            return (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={imgData.title || `Imagen ${ i + 1 }`}
                  className="w-full max-h-[85vh] object-contain"
                />
                <div className="text-center mt-2 text-white">
                  <h3 className="font-bold text-2xl">
                    {imgData.title}
                  </h3>
                  <p className="text-lg">
                    {imgData.description}
                  </p>
                </div>
              </SwiperSlide>
            );              
            })}
            {/* Botón para cerrar el modal */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
        </Swiper>
      </Modal>
    </>
  );
};
export default CarruselDemo;
