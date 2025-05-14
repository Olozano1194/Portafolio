import { datos } from "../data/formacionAcademica";


function FormacionAcademica() {
    return (
        <section className="formaAcademica w-full flex flex-col justify-center items-center p-5 border-b-2 border-stone-900">
            <h1 id="formacionAcademica" className="font-bold text-center text-4xl p-5">Formación Académica</h1>
            <ul  className="w-full flex flex-col justify-center items-center flex-wrap text-center gap-5 mt-5 text-3xl cursor-pointer md:flex-row md:justify-between" >
                { datos.map((item) => (
                    <li key={item.id} className='cardAcademic w-full flex items-center flex-col justify-center md:w-[31%] lg:w-[30%] xl:w-[18%]'>
                        <div className="imgFormacion w-full flex items-center justify-center bg-gray-200 overflow-hidden">
                            <img
                                className="w-[100%] bg-cover max-h-full object-contain md:w-full"
                                // className={`w-48 h-30 rounded-xl ${item.imagen === 'PracticanteAlura' ? 'w-40 h-25': ''} ${item.imagen === 'TecnologoPlatzi' ? 'w-40 h-28': ''} `} 
                                src={`/assets/formacion-${item.imagen}.png`}
                                alt={`Logo ${item.imagen}`} 
                            />
                        </div>
                        <span className={`spanImgTitle w-64 text-[1.3rem] mt-3 text-blue-600 font-bold md:w-48 md:text-[15px] lg:w-52 lg:text-[16px]`}>{item.titulacion}</span>
                        <span className="spanImgTitle w-48 text-[1.2rem] text-stone-900 font-semibold md:w-52 md:text-[17px]">{item.date}</span>
                    </li>
                    ))
                }
            </ul>
        </section>
    );
    
}
export default FormacionAcademica;


            
            