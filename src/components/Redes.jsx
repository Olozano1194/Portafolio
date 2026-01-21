import {Link} from 'react-router-dom';
import { FaLinkedin, FaGithub, FaFile  } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';



function Redes() {
    const { t } = useTranslation();

    return (
        <section id='redes' className="redesDiv text-justify text-[1rem] text-text-primary border-b-2 border-stone-900 p-7 md:text-[1.3rem] dark:bg-dark-bg">
            <article className='font-ubuntu leading-9 dark:text-bg-card'>
                <p>
                    {t('home.greeting.intro')}<span className='text-text-primary font-bold dark:text-primary'>{t('home.greeting.name')}</span>
                </p>
                <p>
                    <span className='text-text-primary font-bold dark:text-primary'>{t('home.title.eng')}</span>{t('home.title.intro')}
                </p> 
                <p>
                    {t('home.description.intro')}<span className='text-text-primary font-bold dark:text-primary'>{t('home.description.front')}</span>{t('home.description.intros')} <span className='text-text-primary font-bold dark:text-primary'>{t('home.description.technologies')}</span>.
                </p>

                <p>
                    {t('home.portfolio.intro')}<span className='text-text-primary font-bold dark:text-primary'>{t('home.portfolio.git')}</span>{t('home.portfolio.perfil')}<span className='text-text-primary font-bold dark:text-primary'>{t('home.portfolio.linkedin')}</span>{t('home.portfolio.download')}<span className='text-text-primary font-bold dark:text-primary'>CV</span>.
                </p>
                <p>
                    {t('home.learning')}
                </p>
                <span>{t('home.cta')}</span>
            </article> 
            <div className='flex items-center justify-center gap-10 p-4 text-4xl dark:text-bg-section'>
                <Link to={'https://www.linkedin.com/in/OlozanoBocanegra'} target='_blank' className='hover:text-[#0e76a8] redes xl:text-5xl'><FaLinkedin /></Link>
                <Link to={'https://github.com/Olozano1194'} target='_blank' className='hover:text-[#171515] redes xl:text-5xl'><FaGithub /></Link>
                <Link to={'curriculum/CV_Oscar_Lozano_Front_Developer_Jr.pdf'} target='_blank' className='hover:text-green-600 redes xl:text-5xl'><FaFile /></Link>
            </div>
                  
        </section>
    )
}
export default Redes;

