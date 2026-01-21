import { useTranslation } from 'react-i18next';
import imgPerfil from '../assets/foto_perfil.png'

function SobreMi() {
    const { t } = useTranslation();
    return (
        <section id='sobreMi' className="flex justify-center items-center flex-col p-7 border-b-2 border-stone-900">
            <div className='rounded-full'>
                <img src={imgPerfil} alt="img-perfil" className='rounded-full w-60' />
            </div>

            <div className='flex flex-col justify-center items-center text-text-primary text-[1.05rem] text-justify md:text-[1.3rem] dark:text-bg-card'>
                <h2 className='text-4xl font-bold mt-5 mb-4'>{t('about.title')}</h2>
                <article className='font-ubuntu leading-9'>
                    <p>
                        {t('about.greeting.intro')}<span className='text-text-primary font-bold dark:text-primary'>{t('about.greeting.name')}</span> {t('about.greeting.description')}
                    </p>
                    <p className='mt-6'>
                        {t('about.intro.description')}<span className='text-text-primary font-bold dark:text-primary'>{t('about.intro.dev')}</span>
                    </p>
                    <p className='mt-6'>
                        {t('about.foundations.icon')} {t('about.foundations.title')} {t('about.foundations.description.intro')} <span className='text-text-primary font-bold dark:text-primary'>{t('about.foundations.description.alura')}</span ><span className='text-text-primary font-bold dark:text-primary'>{t('about.foundations.description.platzi')}</span>{t('about.foundations.description.and')}<span className='text-text-primary font-bold dark:text-primary'>{t('about.foundations.description.tic')}</span>{t('about.foundations.description.programming')}<span className='text-text-primary font-bold dark:text-primary'>{t('about.foundations.description.java')}</span> y <span className='text-text-primary font-bold dark:text-primary'>{t('about.foundations.description.js')}</span>{t('about.foundations.description.db')}<span className='text-text-primary font-bold dark:text-primary'>{t('about.foundations.description.mysql')}</span>
                    </p>
                    <p className='mt-5 mb-6'>
                        {t('about.modernStack.icon')} {t('about.modernStack.title')} {t('about.modernStack.description.intro')}<span className='text-text-primary font-bold dark:text-primary'>{t('about.modernStack.description.react')} {t('about.modernStack.description.type')}</span><span className='text-text-primary font-bold dark:text-primary'>{t('about.modernStack.description.django')}</span>{t('about.modernStack.description.goal')}
                    </p>
                    <p>
                        {t('about.goal.intro')} <span className='text-text-primary font-bold dark:text-primary'>{t('about.goal.analysis')}</span>{t('about.goal.my')}<span className='text-text-primary font-bold dark:text-primary'>{t('about.goal.adaptability')}</span> {t('about.goal.description')}
                    </p>

                </article>                
            </div>
        </section>

    );
}
export default SobreMi;