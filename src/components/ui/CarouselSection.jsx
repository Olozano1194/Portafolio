import { useTranslation } from "react-i18next";

export default function CarouselSection({ id, translationKey, items, getIcon, reverse = false, isLast = false, titleClass = '' }) {
  const { t } = useTranslation();

  return (
    <section className={`w-full overflow-hidden flex flex-col items-center p-5 ${titleClass} ${!isLast ?'border-b-2 border-stone-900' : ''} bg-bg-section dark:bg-dark-section`}>
      <h2 id={id} className={`text-4xl font-bold`}>{t(`${translationKey}.title`)}</h2>
      <div className="w-full overflow-hidden mt-5">
        <ul className={`carousel-track flex flex-nowrap text-3xl cursor-pointer ${reverse ? 'reverse' : '' }`}>
          {items.map((item) => (
            <li
              key={item.id}
              className="carousel-item flex flex-col items-center justify-center min-w-[120px]"
            >
              {getIcon(item.icon)}
              <span>{t(`${translationKey}.items.${item.id}.description`)}</span>
            </li>
          ))}
          {items.map((item) => (
            <li
              key={`copy-${item.id}`}
              className="carousel-item flex flex-col items-center justify-center min-w-[120px]"
            >
              {getIcon(item.icon)}
              <span>{t(`${translationKey}.items.${item.id}.description`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
