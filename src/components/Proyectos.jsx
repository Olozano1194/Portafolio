import { proyectos } from "../data/proyectos";
import { Link } from "react-router-dom";


function Proyectos() {
    return (
        <section className="section-title w-full overflow-hidden flex flex-col justify-center items-center p-5 border-b-2 border-stone-900 md:p-0 dark:text-bg-card">
            <h2 id="proyectos" className="font-bold text-center text-4xl p-5 pb-9">Proyectos</h2>
            
            {
                proyectos.map((proyecto) => (
                    <article key={proyecto.id} className="card w-full flex flex-col mb-7 md:grid md:grid-cols-12 md:items-center md:gap-6">
                        {/* container img */}
                        <div className="imgProyect order-2 flex justify-center md:order-1 md:col-span-4">
                            <img
                            className="w-80 h-60 cursor-pointer md:w-96 md:h-64" 
                            src={`/assets/proyecto-${proyecto.img}.png`} 
                            alt={`imagen ${proyecto.img}`} />
                        </div>
                        {/* text principal mobile */}
                        <h3 className="w-full order-1 font-bold pt-3 text-primary mb-4 text-3xl text-center md:hidden">{proyecto.title}</h3>                                           
                        {/* container text */}
                        <div className="textProyect order-3 mt-4 md:order-2 md:col-span-6 md:flex md:flex-col md:justify-center md:text-left md:mt-0">
                            {/* text principal Desktop */}
                            <h3 className="w-full font-bold hidden text-primary text-3xl text-center md:block">{proyecto.title}</h3>           
                            <h4 className="font-bold mt-1 mb-2 text-secondary text-xl hidden md:block md:mt-4 md:mb-3 lg:text-xl lg:text-center">{proyecto.subtitle}</h4>
                            <p className="mt-3 mb-6 px-2 text-justify text-base md:px-0 lg:text-lg">{proyecto.description}</p>                            
                        </div>
                        {/* container btn */}
                        <div className="w-full flex justify-center flex-col items-center gap-5 pb-4 text-white text-lg order-4 md:order-3 md:col-span-2 md:justify-center md:h-full">
                            <Link to={proyecto.repo} className="bg-blue-700 rounded-xl p-2 w-full max-w-[9rem] text-center whitespace-nowrap md:text-[1rem] lg:text-lg xl:max-w-[10rem]" target="_blank">Repositorio</Link>
                            {
                                proyecto.tipo === 'Ver proyecto' ? (
                                    <Link to={`/Demo/${proyecto.id}`} className="bg-slate-500 rounded-xl p-2 md:text-center  md:text-[0.93rem] lg:text-lg  xl:w-[8.6rem]">Ver Proyecto</Link>
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