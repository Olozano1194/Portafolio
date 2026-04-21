import { useTranslation } from "react-i18next";
// icons
import { FaFutbol, FaMusic } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdVideogameAsset } from "react-icons/md";
// images
import imgFutbol from "../../assets/imgFutbol.png";
import imgMusic from "../../assets/imgMusic.png";
import imgGym from "../../assets/imgGym.png";
import imgVideoGame from "../../assets/imgVideoGame.png";



const HobbiesSection = () => {
    const { t } = useTranslation();


    return (
        <section className="bg-surface-container overflow-hidden py-24 px-8" id="hobbies">
            <div className="max-w-7xl mx-auto">
                <section className="flex flex-col gap-16 items-center md:flex-row">
                    <div className="flex-1 space-y-6">
                        <h2 className="font-bold leading-relaxed text-on-surface-variant text-4xl tracking-tight">{t('hobbies.title')}<span className="text-primary">{t('hobbies.subtitle')}</span></h2>
                        <p className="leading-relaxed text-on-surface-variant">
                            {t('hobbies.description')}
                        </p>
                        <div className="flex gap-4">
                            <p className="bg-surface-alt h-16 flex items-center justify-center rounded-full w-16">
                                <span className="text-primary text-xl"><FaFutbol /></span>
                            </p>
                            <p className="bg-surface-alt h-16 flex items-center justify-center rounded-full w-16">
                                <span className="text-primary text-xl"><CgGym /></span>
                            </p>
                            <p className="bg-surface-alt h-16 flex items-center justify-center rounded-full w-16">
                                <span className="text-primary text-xl"><FaMusic /></span>
                            </p><p className="bg-surface-alt h-16 flex items-center justify-center rounded-full w-16">
                                <span className="text-primary text-xl"><MdVideogameAsset /></span>
                            </p>
                        </div>
                    </div>
                    <picture className="flex-1 grid grid-cols-2 gap-4">
                        <img className="h-48 object-cover rounded-xl w-full" src={imgFutbol} alt="Un balón de futsal (microfútbol) clásico y zapatillas de juego sobre un suelo de cemento pulido. Representa la disciplina y el trabajo en equipo en la cancha." />
                        <img className="h-48 mt-8 object-cover rounded-xl w-full" src={imgMusic} alt="Auriculares modernos de diadema sobre un escritorio de madera clara, junto a un smartphone mostrando una interfaz de música. Evoca la concentración y la creatividad." />
                        <img className="h-48 mt-8 object-cover rounded-xl w-full" src={imgGym} alt="Dos mancuernas hexagonales negras sobre una alfombrilla de goma texturizada, con una botella de agua de acero inoxidable. Simboliza la constancia y el esfuerzo físico." />
                        <img className="h-48 object-cover rounded-xl w-full" src={imgVideoGame} alt="Un mando de consola moderno (DualSense) en blanco y negro, sobre una alfombrilla de escritorio de fieltro gris, junto a unos auriculares de gaming negros. Esta imagen cierra la colección, evocando la estrategia y la inmersión digital." />                          
                    </picture>
                </section>
            </div>
        </section>
    );
}
export default HobbiesSection;