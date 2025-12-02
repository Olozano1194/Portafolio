import { useForm } from "react-hook-form"; //importación del useForm para validar el formulario

function Contacto() {
    const { register, handleSubmit, formState: {errors}, reset } = useForm();
    
    const onSubmit = handleSubmit(() => {
        //console.log(data);
        alert('Mensaje enviado correctamente.....')
        reset();
    })

    return (
        <section className="w-full overflow-hidden flex flex-col justify-center items-center p-3">
            <h2 id="contacto" className="font-bold text-center text-4xl p-2 md:pb-4">Contacto</h2>
            <p className="text-xl p-3 md:p-1">¿Quieres contactarme?</p>
            <p className="text-xl p-3">Complete el siguiente formulario y me pondré en contacto con usted lo antes posible.</p>
            
            <form
                onSubmit={onSubmit}
                className="formContact w-full flex flex-col justify-center items-center text-center gap-5 mt-5 text-xl cursor-pointer md:flex-wrap md:justify-between md:flex-row md:gap-0 md:mt-1 lg:mt-5 xl:px-7 xl:w-[1200px]">

                <label className="formContact flex flex-col items-center" htmlFor="nombre">
                    <input 
                        className="w-80 border-l-rose-50 rounded-lg p-2 outline-none xl:w-96" 
                        type="text" 
                        name="nombre" 
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
                        placeholder="Nombre" />
                        {errors.nombre && <span className="text-rose-800 text-lg">
                            {errors.nombre.message}
                        </span>}
                </label>                

                <label className="formContact flex flex-col items-center" htmlFor="email">
                    <input 
                        className="w-80 border-l-rose-50 rounded-lg p-2 outline-none md:ml-3 xl:ml-0 xl:w-96" 
                        type="email" 
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
                        
                        placeholder="Correo Electrónico" />
                        {errors.email && <span className="text-rose-800 text-lg">{errors.email.message}</span>}
                </label>

                <label className="formContact md:w-full flex flex-col items-center" htmlFor="asunto">
                    <input 
                        className="w-80 p-2 border-l-rose-50 rounded-lg outline-none md:mt-5 md:ml-3 xl:ml-0 xl:w-96" 
                        type="text" 
                        {...register('asunto', 
                            { required:
                                { value: true,
                                  message: 'El asunto es requerido',
                                },
                                minLength: {
                                    value: 6,
                                    message: 'El asunto debe tener al menos 6 caracteres'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'El mensaje debe tener maximo 20 caracteres'
                                }
                            }
                        )}
                        placeholder="Asunto" />
                        {errors.asunto && <span className="text-rose-800 text-lg">{errors.asunto.message}</span>}
                </label>

                <label className="formContact md:w-full resize-none" htmlFor="mensaje">
                    <textarea 
                        className="w-full h-36 p-2 border-l-rose-50 rounded-lg resize-none outline-none md:mt-5" 
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
                        placeholder="Escribir Mensaje" />
                        {errors.mensaje && <span className="text-rose-800 text-lg">{errors.mensaje.message}</span>}
                </label>

                <div className="w-full mt-5  text-center ">
                    <input 
                        className="cursor-pointer bg-blue-200 font-semibold p-3 rounded-xl hover:bg-blue-400 hover:text-slate-100 hover:scale-[1.1]" 
                        type="submit" 
                        value='Enviar Mensaje' />
                </div>                

            </form>

            <div className="mt-7 md:mb-5 text-[1.15rem] text-stone-50 lg:text-xl xl:text-2xl">
                <p>© {new Date().getFullYear()} desarrollado por Oscar Lozano</p>
            </div>
        </section>
    );
    
}
export default Contacto;