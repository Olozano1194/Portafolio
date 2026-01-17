import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');

const CarruselDemo = ({ imagenes, title, descriptions }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

//   if(!imagenes || imagenes.length === 0) return null;

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
        {imagenes.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={title[i]}
              className="w-full rounded-xl"
              onClick={() => { setActiveIndex(i); setModalOpen(true); }}
            />
            <div className="text-center mt-2">
              <h3 className="font-bold text-blue-600 text-xl">{title[i]}</h3>
              <p className="text-base">{descriptions[i]}</p>
            </div>
          </SwiperSlide>
        ))}
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
          {imagenes.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={title[i]}
                className="w-full max-h-[85vh] object-contain"
              />
              <div className="text-center mt-2 text-white">
                <h3 className="font-bold text-2xl">{title[i]}</h3>
                <p>{descriptions[i]}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </>
  );
};

export default CarruselDemo;
