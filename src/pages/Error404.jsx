import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/ui/SEO';
// Icons
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';


const Error404 = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <>
        <SEO title={t('seo.error404.title')} description={t('seo.error404.description')} />
        <main className="bg-background w-full min-h-screen flex flex-col justify-center items-center">
            <div className="text-center text-primary font-bold items-center flex flex-col">
                <span className='w-full flex flex-col justify-center items-center text-5xl md:w-96'><ExclamationTriangleIcon className="w-48 text-yellow-400" />Error 404</span>
                <h1 className='text-xl font-bold pt-10 pb-4 md:text-2xl xl:text-4xl'>¡Oops! Página no encontrada</h1>
                <p className='text-md font-semibold px-3 pb-3 md:text-lg xl:text-2xl'>
                    Lo sentimos, la página que estás buscando no existe.
                </p>
                <button 
                    className='border-solid border-2 border-sky-600 rounded-lg p-3 text-secondary text-lg font-semibold bg-btn-primary hover:bg-btn-primary/90 hover:scale-110 cursor-pointer md:mt-3 lg:text-xl'
                    onClick={handleRedirect}
                >
                    Regresar al inicio
                </button>
            </div>
        </main>
        </>
    );
}
export default Error404;