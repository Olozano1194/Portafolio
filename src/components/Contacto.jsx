import { useForm } from "react-hook-form"; //importación del useForm para validar el formulario
import { BiMessageAltDetail, BiRename } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { FiTag } from "react-icons/fi";
// Notifications
import toast from "react-hot-toast";

function Contacto() {
    const { register, handleSubmit, formState: {errors}, reset } = useForm();
    
    const onSubmit = handleSubmit(() => {
        //console.log(data);
        toast.success('Mensaje enviado.')
        reset();
    })

    return (
        <footer className="w-full overflow-hidden flex flex-col justify-center items-center p-3">
            <h2 id="contacto" className="font-bold text-center text-4xl p-2 md:pb-4">Contacto</h2>
            <h3 className="text-xl p-3 md:p-1">¿Quieres contactarme?</h3>
            <p className="text-xl p-1">Complete el siguiente formulario y me pondré en contacto con usted lo antes posible.</p>

            <form onSubmit={onSubmit} className="w-full max-w-5xl flex flex-col justify-center items-center text-center gap-5 mt-5 text-xl cursor-pointer md:flex-wrap md:justify-between md:flex-row md:gap-0 md:mt-1 lg:mt-5 xl:px-7 xl:w-[1200px]">
                {/* section name and email */}
                <section className="w-full grid grid-cols-1 gap-5 md:grid-cols-2">
                    <label htmlFor="nombre" className="w-full">
                        <span className="w-full flex justify-center items-center font-bold gap-1 mb-1 text-xl text-gray-900"><BiRename />Nombre</span>
                        <input 
                            type="text"
                            className="w-full p-2 border-l-rose-50 placeholder:text-gray-500 rounded-lg resize-none text-gray-600 outline-none md:mt-2"
                            placeholder="Nombre"
                            id="nombre" 
                            {...register('nombre', {
                                required: {
                                    value: true,
                                    message: 'El nombre es requerido'
                                },
                                minLength: {
                                    value: 4,
                                    message: 'El nombre debe tener al menos 4 caracteres'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'El nombre debe tener maximo de 20 caracteres'
                                }
                            })}
                        />
                        {errors.nombre && <span className="text-rose-800 text-lg">{errors.nombre.message}
                        </span>}
                    </label>
                    <label htmlFor="email" className="w-full">
                        <span className="w-full flex justify-center items-center font-bold gap-1 mb-1 text-xl text-gray-900"><MdOutlineEmail />Email</span>
                        <input 
                            type="email"
                            id="email"
                            className="w-full p-2 border-l-rose-50 placeholder:text-gray-500 rounded-lg resize-none text-gray-600 outline-none md:mt-2"
                            {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'El email es requerido'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'El email no es válido'
                                    }
                                })
                            }
                            placeholder="Email"
                        />
                        {errors.email && <span className="text-rose-800 text-lg">{errors.email.message}</span>}
                    </label>
                </section>
                {/* Asunto */}
                <section className="w-full flex justify-center md:mt-7">
                    <label htmlFor="asunto" className="w-full flex flex-col justify-center md:w-2/3 lg:w-1/2">
                        <span className="w-full flex justify-center items-center font-bold gap-1 mb-1 text-xl text-gray-900 "><FiTag />Asunto</span>
                        <input 
                            type="text"
                            className="w-full p-2 border-l-rose-50 placeholder:text-gray-500 rounded-lg resize-none text-gray-600 outline-none md:mt-2 mx-auto"
                            placeholder="Asunto"
                            id="asunto" 
                            {...register('asunto', {
                                required: {
                                    value: true,
                                    message: 'El asunto es requerido'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'El asunto debe tener al menos 6 caracteres'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'El asunto debe tener maximo de 20 caracteres'
                                }
                            })}
                        />
                        {errors.asunto && <span className="text-rose-800 text-lg">{errors.asunto.message}
                        </span>}
                </label>
                </section>
                {/* Message */}
                <label htmlFor="mensaje" className="w-full flex flex-col items-center mt-2">
                    <span className="w-full flex justify-center items-center font-bold gap-1 mb-1 text-xl text-gray-900 md:mt-5"><BiMessageAltDetail /> Mensaje</span>                  
                    <textarea
                        htmlFor="mensaje"
                        className="w-full p-2 border-l-rose-50 placeholder:text-gray-500 rounded-lg resize-none text-gray-600 outline-none md:mt-2 md:w-4/5 md:h-36"
                        id="mensaje"
                        {...register('mensaje',
                            { required:
                                { value: true,
                                  message: 'El mensaje es requerido',
                                },
                                minLength: {
                                    value: 10,
                                    message: 'El mensaje debe tener al menos 10 caracteres'
                                },
                                maxLength: {
                                    value: 70,
                                    message: 'El mensaje debe tener maximo 70 caracteres'
                                }
                            }
                        )}
                        placeholder="Escribir Mensaje">
                    </textarea>
                    {errors.mensaje && <span className="text-rose-800 text-lg">{errors.mensaje.message}</span>}
                </label>
                {/* btn */}
                <label htmlFor="" className="w-full mt-3 text-center ">
                    <input 
                        type="submit"
                        className="cursor-pointer bg-blue-200 font-semibold p-3 rounded-xl hover:bg-blue-400 hover:text-slate-100 hover:scale-[1.1] md:mt-4"  
                        value="Enviar Mensaje" 
                    />
                </label>
            </form>

            <div className="mt-7 text-[1.15rem] text-stone-50 lg:text-xl xl:text-2xl">
                <span className="text-sm font-bold md:text-lg lg:text-xl">©{new Date().getFullYear()} desarrollado por Oscar Lozano</span>
            </div>
        </footer>
    );    
}
export default Contacto;