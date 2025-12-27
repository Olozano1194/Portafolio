import { proyectos } from "../data/proyectos";
import { Link } from "react-router-dom";


function Proyectos() {
    return (
        <section className="containerProyect w-full overflow-hidden flex flex-col justify-center items-center p-5 border-b-2 border-stone-900">
            <h2 id="proyectos" className="font-bold text-center text-4xl p-5 pb-9">Proyectos</h2>
            
            {
                proyectos.map((proyecto) => (
                    <article key={proyecto.id} className="cardProyect w-full grid grid-cols-1 mb-7 md:grid-cols-12 md:items-center md:gap-6">
                        {/* container img */}
                        <div className="imgProyect order-1 flex justify-center md:order-1 md:col-span-4">
                            <img
                            className="w-80 h-60 cursor-pointer xl:w-96" 
                            src={`/assets/proyecto-${proyecto.img}.png`} 
                            alt={`imagen ${proyecto.img}`} />
                        </div>
                        {/* text principal mobile */}
                        <h3 className="w-full font-bold mb-4 text-center text-blue-600 text-2xl md:hidden">{proyecto.title}</h3>                       
                        {/* container text */}
                        <div className="text-lg text-center p-4 order-2 md:order-2 md:col-span-6 md:flex md:flex-col md:justify-center md:text-left xl:w-auto">                                                    
                            <h3 className="font-bold mt-1 mb-2 text-blue-600 text-xl hidden md:block md:mt-4 md:mb-3 lg:text-3xl lg:text-center">{proyecto.subtitle}</h3>
                            <p className="lg:text-xl lg:text-center md:text-base">{proyecto.description}</p>                            
                        </div>
                        {/* container btn */}
                        <div className="flex justify-center flex-col items-center gap-5 pb-4 text-white text-lg  order-3 md:order-3 md:col-span-2 md:justify-center md:h-full">
                            <Link to={proyecto.repo} className="bg-blue-700 rounded-xl p-2 xl:w-[10rem] xl:text-center" target="_blank">Repositorio</Link>
                            {
                                proyecto.tipo === 'Demo' ? (
                                    <Link to={`/Demo/${proyecto.id}`} className="bg-slate-500 rounded-xl p-2 xl:w-[5rem] xl:text-center" target="_blank">Demo</Link>
                                ): (
                                    <Link to={`/Videos/${proyecto.id}`} 
                                        className="bg-blue-400 rounded-xl p-2 xl:w-[5rem] xl:text-center" target="_blank">
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