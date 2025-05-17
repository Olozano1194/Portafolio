import { proyectos } from "../data/proyectos";
import { Link } from "react-router-dom";


function Proyectos() {
    return (
        <section className="containerProyect w-full overflow-hidden flex flex-col justify-center items-center p-5 border-b-2 border-stone-900">
            <h2 id="proyectos" className="font-bold text-center text-4xl p-5 pb-9">Proyectos</h2>
            
            {
                proyectos.map((proyecto) => (
                    <article key={proyecto.id} className="cardProyect w-full flex items-center justify-center flex-col mb-7 md:justify-between md:flex-row">
                        <div className="imgProyect">
                            <img
                            className="w-80 h-60 cursor-pointer md:mr-10 xl:mr-0 xl:w-96" 
                            src={`/assets/proyecto-${proyecto.img}.png`} 
                            alt={`imagen ${proyecto.img}`} />
                        </div>                        
                        
                        <div className="w-80 text-center text-lg p-4 xl:w-[400px]">
                            <h3 className="font-bold text-blue-600 text-2xl">{proyecto.title}</h3>
                            <p className="mt-1 mb-2 md:mt-4 md:mb-3">{proyecto.subtitle}</p>
                            <p>{proyecto.description}</p>                            
                        </div>
                            
                        <div className="flex justify-center flex-col items-center gap-5 pb-4 text-white text-lg md:ml-10 xl:ml-0">
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