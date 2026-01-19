export default function CarouselSection({ id, title, items, getIcon, reverse = false, isLast = false, titleClass = '' }) {
  return (
    <section className={`w-full overflow-hidden flex flex-col items-center p-5 ${titleClass} ${!isLast ?'border-b-2 border-stone-900' : ''}`}>
      <h2 id={id} className={`text-4xl font-bold`}>{title}</h2>
      <div className="w-full overflow-hidden mt-5">
        <ul className={`carousel-track flex flex-nowrap text-3xl cursor-pointer ${reverse ? 'reverse' : '' }`}>
          {items.map((item) => (
            <li
              key={item.id}
              className="carousel-item flex flex-col items-center justify-center min-w-[120px]"
            >
              {getIcon(item.icon)}
              <span>{item.description}</span>
            </li>
          ))}
          {items.map((item) => (
            <li
              key={`copy-${item.id}`}
              className="carousel-item flex flex-col items-center justify-center min-w-[120px]"
            >
              {getIcon(item.icon)}
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
