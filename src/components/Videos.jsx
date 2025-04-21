import { useParams, Navigate } from 'react-router-dom';
// import Video from '/portafolio/videos/videos-AluraHotel.mp4';
import ReactPlayer from 'react-player';
import { proyectos } from '../data/proyectos';

const Videos = () => {
    const { videosId } = useParams();
    const proyecto = proyectos.find((proyecto) => proyecto.id === parseInt(videosId));

    if (!proyecto || proyecto.tipo !== 'Video') {
        return <Navigate to="/404" />;
                
    }

    //Verificamos si estamos en producción o desarrollo
    //const isProduction = import.meta.env.Mode === 'production';

    //Usamos una ruta dinámica dependiendo del entorno
    //const videoUrl = isProduction ? `https://Olozano1194.github.io/portafolio/videos/videos-${proyecto.img}.mp4` : `/videos/videos-${proyecto.img}.mp4`;

    return (
        <section className='w-full overflow-hidden flex flex-col justify-center items-center p-5 border-t-2 border-stone-900'>
            <h1 className='text-4xl font-bold'>{proyecto.title}</h1>

            <ReactPlayer
                url={`/videos/videos-${proyecto.img}.mp4`}
                controls={true}
                width="800px"
                height="600px"
                 
            />
                 
        </section>
    );  
    
}
export default Videos;