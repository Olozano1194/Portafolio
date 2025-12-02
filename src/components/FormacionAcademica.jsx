import { datos } from "../data/formacionAcademica";

function FormacionAcademica() {
  return (
    <section className="formaAcademica w-full flex flex-col justify-center items-center p-5 border-b-2 border-stone-900">
      <h2
        id="formacionAcademica"
        className="font-bold text-center text-4xl p-5"
      >
        Formación Académica
      </h2>
      <ul className="w-full flex flex-col justify-center items-center flex-wrap text-center gap-5 mt-5 text-3xl cursor-pointer sm:flex-row md:justify-between">
        {datos.map((item) => (
          <li
            key={item.id}
            className="cardAcademic w-full flex items-center flex-col justify-center sm:w-[45%] md:w-[31%] lg:w-[30%] xl:w-[18%]"
          >
            <div className="imgFormacion w-full h-44 flex items-center justify-center bg-gray-200 overflow-hidden aspect-square lg:h-52">
              <img
                className="w-full h-full object-cover"
                // className={`w-48 h-30 rounded-xl ${item.imagen === 'PracticanteAlura' ? 'w-40 h-25': ''} ${item.imagen === 'TecnologoPlatzi' ? 'w-40 h-28': ''} `}
                src={`/assets/formacion-${item.imagen}.png`}
                alt={`Logo ${item.imagen}`}
              />
            </div>
            <span
              className={`spanImgTitle w-72 text-[20px] mt-3 text-blue-600 font-bold md:w-60 md:text-[14px] lg:w-64 lg:text-[16px]`}
            >
              {item.titulacion}
            </span>
            <span className="spanImgTitle w-48 mb-3 text-[1.2rem] text-stone-900 font-semibold md:w-52 md:text-[17px]">
              {item.date}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default FormacionAcademica;
