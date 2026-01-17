import { useParams, Link } from 'react-router-dom';
import { proyectos } from '../data/proyectos';
import CarruselDemo from './carruselDemo/CarruselDemo';


const Demo = () => {
    const { demoId } = useParams();
    const proyecto = proyectos.find((proyecto) => proyecto.id === parseInt(demoId));

    return (
        <section className='w-full overflow-hidden flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold mb-6'>{proyecto.title}</h1>
            <p className='flex justify-center items-center text-lg'>{proyecto.imgDemo.demoDescription}</p>
            {
                proyecto.credenciales && (
                    <div className='flex flex-col items-center mt-6'>
                        <h3 className='text-xl'>Credenciales por si desea navegar en el Demo:</h3>
                        <p className='text-xl'>Usuario: <strong>{proyecto.credenciales.user}</strong></p>
                        <p className='text-xl'>Contraseña: <strong>{proyecto.credenciales.pass}</strong></p>
                    </div>                    
                )
            }
            <div className='flex flex-col items-center mt-5'>
                <Link
                    to={proyecto.Demo}
                    target='_blanck'
                    className='bg-slate-500 font-bold rounded-xl px-4 py-2 text-2xl text-gray-100'
                >
                    Ver Demo
                </Link>
            </div>
            {
                proyecto.credenciales && (
                    <article className="w-full flex flex-col items-center justify-center lg:w-[1000px]">
                         <h4 className='mt-10 mb-10 text-2xl font-semibold '>Imagenes del proyecto</h4>
                        {/* {
                            proyecto.imgDemo.img.map((image, index) => (
                                <div key={index} className="w-full flex flex-col items-center justify-center md:justify-between md:flex-row">
                                    <img
                                        key={index}
                                        className="w-80 h-60 md:mr-10 xl:mr-0 xl:w-96 p-5 rounded-3xl cursor-pointer" 
                                        src={image} 
                                        alt={`imagen ${proyecto.imgDemo.title[index]}`} />
                                    <div className="w-96 xl:w-[400px] text-center text-lg p-2">
                                        <h3 className="font-bold text-blue-600 text-2xl">{proyecto.imgDemo.title[index]}</h3>
                                        <p className="mt-1 mb-2 md:mt-4 md:mb-3">{proyecto.imgDemo.description[index]}</p>
                                    </div> 
                                </div>
                                                               
                            ))                            
                        }             */}
                        {/* {proyecto.imgDemo && ( */}
                            <CarruselDemo
                                imagenes={proyecto.imgDemo.img}
                                title={proyecto.imgDemo.title}
                                descriptions={proyecto.imgDemo.description}
                            /> 

                        {/* )}                         */}
                    </article>
                )                
            }            
            
        </section>
    );
};
export default Demo;