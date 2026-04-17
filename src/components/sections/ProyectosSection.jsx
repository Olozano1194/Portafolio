import { proyectos } from "../../data/proyectos";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// icons
import { MdArrowForward } from "react-icons/md";


function ProyectosSection() {
    const { t } = useTranslation();


    return (
        <section className="bg-surface-container py-24 px-8" id="proyectos">
            <div className="max-w-7xl mx-auto">
                <section className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="font-bold mb-4 text-5xl text-on-surface tracking-tighter">{t('projects.title')}</h2>
                        <p className="max-w-lg pt-6 text-on-surface-variant md:text-lg">{t('projects.description')}</p>
                    </div>
                    <div className="hidden md:block">
                        <button className="cursor-pointer font-label flex gap-2 items-center text-primary transition-all hover:gap-4 md:text-lg">
                            Ver Todo
                            <span className="text-2xl"><MdArrowForward /></span>
                        </button>
                    </div>
                </section>
                {/* Cards */}
                <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
                    {
                        proyectos.map((proyecto) => (
                            <article
                                key={proyecto.id}
                                className={`bg-surface-alt h-112.5 group overflow-hidden rounded-2xl relative ${proyecto.col}`}
                            >
                                {/* Imagen */}
                                <img
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    src={`/assets/proyecto-${proyecto.img}.png`}
                                    alt={`imagen ${proyecto.img}`}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-surface-container to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>

                                {/* Contenido */}
                                <div className="absolute bottom-0 p-8 space-y-2">
                                    <h3 className="text-3xl font-bold text-on-surface">
                                        {t(`projects.items.${proyecto.id}.title`)}
                                    </h3>

                                    <p className="text-sm text-on-surface-variant max-w-md">
                                        {t(`projects.items.${proyecto.id}.description`)}
                                    </p>
                                    {/* BOTONES */}
                                    <div className="flex gap-3 pt-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                        {/* Repo */}
                                        <a
                                            href={proyecto.repo}
                                            target="_blank"
                                            className="px-4 py-2 text-sm rounded-lg bg-primary text-on-primary"
                                        >
                                            {t("projects.repository")}
                                        </a>
                                        {/* Condicional */}
                                        {proyecto.tipo === "Ver proyecto" ? (
                                            <Link
                                                to={`/Demo/${proyecto.id}`}
                                                className="px-4 py-2 text-sm rounded-lg bg-secondary text-on-secondary"
                                            >
                                                {t("projects.viewProject")}
                                            </Link>
                                        ) : (
                                            <Link
                                                to={`/Videos/${proyecto.id}`}
                                                className="px-4 py-2 text-sm rounded-lg bg-secondary text-on-secondary"
                                            >
                                                {t("projects.video")}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))
                    }
                </section>
            </div>   
        </section>
    );
}
export default ProyectosSection;