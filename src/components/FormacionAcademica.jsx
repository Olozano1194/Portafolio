import { datos } from "../data/formacionAcademica";
import { useTranslation } from "react-i18next";

function FormacionAcademica() {
  const { t } = useTranslation();
  return (
    <section className="section-title w-full flex flex-col justify-center items-center p-5 border-b-2 border-stone-900">
      <h2
        id="formacionAcademica"
        className="font-bold text-center text-4xl p-5"
      >
        {t('education.title')}
      </h2>
      <ul className="w-full flex flex-col justify-center items-center flex-wrap text-center gap-5 mt-5 text-3xl cursor-pointer sm:flex-row md:justify-between">
        {datos.map((item) => (
          <li
            key={item.id}
            className="card w-full flex items-center flex-col justify-center sm:w-[45%] md:w-[31%] lg:w-[30%] xl:w-[18%]"
          >
            {/* container img */}
            <div className="imgFormacion w-full h-44 flex items-center justify-center bg-bg-section overflow-hidden aspect-square lg:h-52">
              <img
                className="w-full h-full object-cover"
                src={`/assets/formacion-${item.imagen}.png`}
                alt={`Logo ${item.imagen}`}
              />
            </div>
            <span
              className={`spanImgTitle w-72 text-[20px] mt-3 text-primary font-bold leading-tight line-clamp-2 md:w-60 md:text-[14px] lg:w-64 lg:text-[16px]`}
            >
              {t(`education.items.${item.id}.degree`)}
            </span>
            <span className="spanImgTitle w-48 mb-3 text-[1.2rem] text-text-primary font-semibold md:w-52 md:text-[17px] dark:text-text-primary">
              {item.date}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default FormacionAcademica;
