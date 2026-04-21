import { datos } from "../../data/formacionAcademica";
import { useTranslation } from "react-i18next";
// icons
import { IoSchool } from "react-icons/io5";

function FormacionAcademica() {
  const { t } = useTranslation();


  return (
    <section className="bg-surface py-24 px-8" id="formacionAcademica">
      <section className="max-w-7xl mx-auto">
        <h2 className="font-label mb-12 text-sm text-primary/50 tracking-[0.3em] uppercase">
          {t('education.title')}
        </h2> 
        <article className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {datos.map((item, index) => (
            <article
              key={item.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="card-formacion opacity-0 translate-y-3 animate-fadeInUp border border-on-border/5 rounded-xl space-y-4 flex flex-col items-center pb-3 text-center"
            >
              {/* Imagen */}
              <div className="imgFormacion w-full h-40 overflow-hidden rounded-t-lg">
                <img
                  className="w-full h-full object-cover"
                  src={`/assets/formacion-${item.imagen}.png`}
                  alt={`Logo ${item.imagen}`}
                />
              </div>
              {/* Título */}
              <h3 className="font-headline text-lg text-primary leading-tight line-clamp-2">
                {t(`education.items.${item.id}.degree`)}
              </h3>
              {/* Institución */}
              <p className="text-sm text-on-surface-variant">
                {t(`education.items.${item.id}.degree`)}
              </p>
              {/* Fecha */}
              <p className="font-label text-primary/70 text-xs">
                {item.date}
              </p>
            </article>
          ))}
        </article>
      </section>
      </section>
  );
}
export default FormacionAcademica;
