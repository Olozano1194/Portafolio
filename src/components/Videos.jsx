import { useParams, useNavigate } from 'react-router-dom';
// import Video from '/portafolio/videos/videos-AluraHotel.mp4';
import ReactPlayer from 'react-player';
import { proyectos } from '../data/proyectos';
import { FaArrowLeft } from "react-icons/fa";

const Videos = () => {
    const { videosId } = useParams();
    const proyecto = proyectos.find((proyecto) => proyecto.id === parseInt(videosId));
    const navigate = useNavigate();

    if (!proyecto || proyecto.tipo !== 'Video') {
        return navigate('/');
                
    }

    //Verificamos si estamos en producción o desarrollo
    //const isProduction = import.meta.env.Mode === 'production';

    //Usamos una ruta dinámica dependiendo del entorno
    //const videoUrl = isProduction ? `https://Olozano1194.github.io/portafolio/videos/videos-${proyecto.img}.mp4` : `/videos/videos-${proyecto.img}.mp4`;

    return (
        <>
        <button onClick={() => navigate(-1)} className="w-7 flex items-center mb-4 p-2 text-xl font-bold text-gray-600 shadow-md shadow-slate-800 hover:text-gray-900 hover:scale-110"><FaArrowLeft /></button>
        <section className='w-full overflow-hidden flex flex-col justify-center items-center p-5 border-t-2 border-stone-900'>
            <div className='w-full flex justify-center pb-7'>
                <h1 className='text-4xl font-bold'>{proyecto.title}</h1>
            </div>          

            <ReactPlayer
                url={`/videos/videos-${proyecto.img}.mp4`}
                controls={true}
                width="800px"
                height="400px"
                 
            />
                 
        </section>
        </>
    );
}
export default Videos;