import { Link } from 'react-router-dom';
// utils
import { scrollToSection } from '../../utils/scrollToSection';
// icons
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { SiReaddotcv } from "react-icons/si";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-background py-12 px-8 w-full">
            <section className="flex flex-col font-label gap-6 items-center justify-between max-w-7xl mx-auto text-sm tracking-widest uppercase md:flex-row">
                <div className='text-on-surface text-xs uppercase'>@{new Date().getFullYear()} {t('footer.description')}</div>
                {/* Redes Sociales */}
                <ul className="flex gap-8">
                    <a href="https://www.linkedin.com/in/olozanobocanegra" target="_blank" className="text-on-surface-variant text-2xl transition-colors hover:text-primary"><FaLinkedin /></a>
                    <a href="https://github.com/Olozano1194" target="_blank" className="text-on-surface-variant text-2xl transition-colors hover:text-primary"><FaGithub /></a>
                    <a href="../../../public/curriculum/CV_Oscar_Lozano_Front_Developer_Jr.pdf" target="_blank" className="text-on-surface-variant text-2xl transition-colors hover:text-primary"><SiReaddotcv /></a>
                </ul>                
            </section>            
        </footer>
    );
};
export default Footer;