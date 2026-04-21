import { useTranslation } from 'react-i18next';
import imgPerfil from '../../assets/fotoPerfil.png';

function SobreMiSection() {
    const { t } = useTranslation();


    return (
        <section id='sobreMi' className="bg-surface-container py-24 px-8">
            <section className='max-w-7xl mx-auto'>
                <div className='grid gap-12 lg:grid-cols-12'>
                    <div className='lg:col-span-5'>
                        <h2 className='font-bold mb-8 text-4xl text-on-surface tracking-tight'>{t('about.title')}</h2>
                        <div className='aspect-4/5 overflow-hidden'>
                            <img src={imgPerfil} 
                                alt="professional portrait of a confident developer in a modern workspace with natural soft lighting and neutral background" className='duration-700 grayscale h-full object-cover rounded-2xl transition-all w-full hover:grayscale-0' 
                            />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center space-y-8 lg:col-span-7'>
                        <p className='font-light leading-relaxed text-2xl text-on-surface-variant'>{t('about.greeting.description')}</p>
                        <div className='grid grid-cols-2 gap-8 py-8'>
                            <div>
                                <h4 className='font-bold font-label mb-2 text-primary text-3xl'>+5</h4>
                                <p className='text-sm text-on-surface-variant tracking-widest uppercase'>{t('about.cards.1.degree')}</p>
                            </div>
                            <div>
                                <h4 className='font-bold font-label mb-2 text-primary text-3xl'>100%</h4>
                                <p className='text-sm text-on-surface-variant tracking-widest uppercase'>{t('about.cards.2.degree')}</p>
                            </div>

                        </div>
                        <p className='leading-loose text-on-surface/80'>
                            {t('about.intro.description')}
                        </p>                       
                    </div>  
                </div>
            </section>
            </section>
    );
}
export default SobreMiSection;