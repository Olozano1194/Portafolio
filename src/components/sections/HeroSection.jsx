import { useTranslation } from 'react-i18next';
import { ArrowRightIcon } from "@heroicons/react/16/solid";
// utils
import { scrollToSection } from "../../utils/scrollToSection";


const HeroSection = () => {
    const { t } = useTranslation();


    return (
        <section className="overflow-hidden pt-32 pb-24 px-8 relative" id="inicio">
            <div className="grid gap-16 items-center max-w-7xl mx-auto lg:grid-cols-2">
                <section className="space-y-8">
                    <p className="bg-surface-container font-label inline-flex items-center px-3 py-1 rounded-full text-primary text-sm tracking-widest uppercase">Junior Developer Portfolio</p>
                    <h1 className="font-extrabold leading-none text-6xl text-on-surface tracking-tighter md:text-8xl">
                        {t('home.greeting.intro')}
                        <span className="italic text-primary">
                            {t('home.greeting.name')}
                        </span>
                    </h1>
                    <p className="leading-relaxed max-w-2xl text-xl text-on-surface-variant">
                        {t('home.description.intro')}
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => scrollToSection('proyectos')} 
                            className="bg-linear-to-r cursor-pointer duration-300 font-semibold from-primary px-8 py-4 rounded-xl to-primary-container text-on-primary transition-all hover:scale-105 active:scale-95">
                            {t('home.description.btnProjects')}
                        </button>
                        <button
                            onClick={() => scrollToSection('contacto')}
                            className="bg-surface-container border border-white/5 cursor-pointer duration-300 font-semibold from-primary px-8 py-4 rounded-xl text-on-surface transition-all hover:bg-surface-alt">
                            {t('home.description.btnContact')}
                        </button>
                    </div>
                </section>
                <section className="relative">
                    <picture className="aspect-square overflow-hidden shadow-2xl md:aspect-3/2">
                        <img
                            className="h-full object-cover rounded-2xl w-full" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhXMSpFZraCNW23z8RjZ1eFJt1FsQW_1KPX3K1lahsxr50Dts3QAecBLSg2--BVQws6RJCipi9rDtmIxHGyuC-w33l-5r-WVk6q7aCwxfIgSZqeqFYGzwLk2K6YMBRdyseb0AurJjbJaoVNepjw9odys-_hoGKHgvRB1VsnCgr1Yv9UdikUt32qYSZsXo3RJRUFuXt-vg-5nconznhi14_a1xEojwC1U8JvVz_5kA4Uk_CVnJ-OPypqOVoF6kBwgIc6qE6yEj4Ap9b" alt="high-tech abstract digital architecture visualization with glowing lines and deep blue atmospheric lighting" />
                    </picture>
                    <div className="absolute bg-surface-container backdrop-blur-xl border border-on-border/10 -bottom-6 -left-6 max-w-xs p-6 rounded-xl shadow-xl md:ml-2 lg:ml-0">
                        <p className="font-label mb-2 text-xs tracking-widest text-primary uppercase">{t('home.card.title')}</p>
                        <p className="text-sm text-on-surface">{t('home.card.description')}</p>
                    </div>
                </section>                
            </div>            
        </section>
    );
};
export default HeroSection;