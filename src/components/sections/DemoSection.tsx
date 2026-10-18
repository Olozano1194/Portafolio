import { useParams, useNavigate } from 'react-router-dom';
import { proyectos } from '../../data/proyectos';
import { useTranslation } from 'react-i18next';
import SEO from '../ui/SEO';
import { getParamAsNumber } from '../../types/routing';
import { isVideoDemo, isImageGalleryDemo, isInteractiveDemo } from '../../types/demo';
import type { DemoProps } from '../../types/demo';
import { asProyectoId } from '../../types/branded';
import VideoDemo from './demos/VideoDemo';
import ImageGalleryDemo from './demos/ImageGalleryDemo';
import InteractiveDemo from './demos/InteractiveDemo';

const DemoSection = (): React.ReactElement => {
    const params = useParams<{ id: string }>();
    const proyectoId = asProyectoId(getParamAsNumber(params, 'id'));
    const proyecto = proyectos.find((p) => p.id === proyectoId);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const projectNotFound = t('demoProject.projectNotFound');
    const goBack = t('demoProject.goBack');

    if (!proyecto) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">{projectNotFound}</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-primary text-on-primary px-4 py-2 rounded-md"
                >
                    {goBack}
                </button>
            </div>
        );
    }

    const projectTitle = t(`projects.items.${proyectoId}.title`);
    const projectDescription = t(`projects.items.${proyectoId}.description`);

    let demoProps: DemoProps;

    if (proyecto.tipo === 'Ver proyecto') {
        const imgDemo = proyecto.imgDemo?.img || [];
        const credenciales = proyecto.credenciales;
        const verProyecto = proyecto.ver_proyecto;
        
        const tieneDemoUrl = verProyecto && verProyecto.trim() !== '' && verProyecto !== '/' && verProyecto !== '#';
        
        if (imgDemo.length > 0 && !tieneDemoUrl && credenciales) {
            demoProps = {
                type: 'interactive',
                proyectoId,
                titulo: projectTitle,
                descripcion: projectDescription,
                iframeUrl: verProyecto || '',
                credenciales,
            };
        } else if (imgDemo.length > 0) {
            demoProps = {
                type: 'images',
                proyectoId,
                titulo: projectTitle,
                descripcion: projectDescription,
                images: imgDemo.map((src, index) => ({
                    src,
                    alt: `${projectTitle} - ${index + 1}`,
                    titulo: `${projectTitle} - Imagen ${index + 1}`,
                })),
            };
        } else if (tieneDemoUrl) {
            demoProps = {
                type: 'video',
                proyectoId,
                titulo: projectTitle,
                descripcion: projectDescription,
                videos: [{ src: verProyecto, titulo: projectTitle }],
            };
        } else {
            demoProps = {
                type: 'images',
                proyectoId,
                titulo: projectTitle,
                descripcion: projectDescription,
                images: [],
            };
        }
    } else {
        demoProps = {
            type: 'video',
            proyectoId,
            titulo: projectTitle,
            descripcion: projectDescription,
            videos: [{ src: `/videos/videos-${proyecto.img}.mp4`, titulo: projectTitle }],
        };
    }

    return (
        <>
            <SEO
                title={projectTitle}
                description={projectDescription}
            />
            {isVideoDemo(demoProps) && <VideoDemo {...demoProps} />}
            {isImageGalleryDemo(demoProps) && <ImageGalleryDemo {...demoProps} />}
            {isInteractiveDemo(demoProps) && <InteractiveDemo {...demoProps} />}
        </>
    );
};
export default DemoSection;