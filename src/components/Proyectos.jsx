import { proyectos } from "../data/proyectos";
import { Link } from "react-router-dom";


function Proyectos() {
    return (
        <section className="containerProyect w-full overflow-hidden flex flex-col justify-center items-center p-5 border-b-2 border-stone-900">
            <h2 id="proyectos" className="font-bold text-center text-4xl p-5 pb-9">Proyectos</h2>
            
            {
                proyectos.map((proyecto) => (
                    <article key={proyecto.id} className="cardProyect w-full flex flex-col mb-7 md:grid md:grid-cols-12 md:items-center md:gap-6">
                        {/* container img */}
                        <div className="imgProyect order-1 flex justify-center md:order-1 md:col-span-4">
                            <img
                            className="w-80 h-60 cursor-pointer xl:w-96" 
                            src={`/assets/proyecto-${proyecto.img}.png`} 
                            alt={`imagen ${proyecto.img}`} />
                        </div>                                           
                        {/* container text */}
                        <div className="textProyect order-2 mt-4 md:order-2 md:col-span-6 md:flex md:flex-col md:justify-center md:text-left md:mt-0">
                            {/* text principal mobile */}
                            <h3 className="w-full font-bold text-blue-600 text-3xl text-center">{proyecto.title}</h3>                                                    
                            <h4 className="font-bold mt-1 mb-2 text-blue-600 text-xl hidden md:block md:mt-4 md:mb-3 lg:text-xl lg:text-center">{proyecto.subtitle}</h4>
                            <p className="mt-3 mb-6 text-justify text-base md:text-left lg:text-lg">{proyecto.description}</p>                            
                        </div>
                        {/* container btn */}
                        <div className="w-full flex justify-center flex-col items-center gap-5 pb-4 text-white text-lg order-3 md:order-3 md:col-span-2 md:justify-center md:h-full">
                            <Link to={proyecto.repo} className="bg-blue-700 rounded-xl p-2 xl:w-[10rem] xl:text-center" target="_blank">Repositorio</Link>
                            {
                                proyecto.tipo === 'Ver proyecto' ? (
                                    <Link to={`/Demo/${proyecto.id}`} className="bg-slate-500 rounded-xl p-2 md:text-center xl:w-[8.6rem]">Ver Proyecto</Link>
                                ): (
                                    <Link to={`/Videos/${proyecto.id}`} 
                                        className="bg-blue-400 rounded-xl p-2 xl:w-[5rem] xl:text-center">
                                            Video
                                    </Link>
                                )
                            }
                        </div>
                    </article>
                ))
            }
        </section>
    );    
}
export default Proyectos;