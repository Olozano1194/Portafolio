import { useForm } from "react-hook-form"; //importación del useForm para validar el formulario
import { useState } from 'react';
// icons
import { BiMessageAltDetail, BiRename } from "react-icons/bi";
import { MdDriveFileRenameOutline, MdEmail, MdOutlineMessage } from "react-icons/md";
// Notifications
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";


const ContactoSection = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        if (isLoading) return;
        if (data.website) return; // honeypot
        setIsLoading(true);
        try {
            const contactUrl = import.meta.env.VITE_CONTACTFORM_URL;
            const response = await fetch(contactUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Error al enviar el mensaje");

            toast.success("Mensaje enviado. Te responderemos en menos de 24 horas.");
            reset();

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error al enviar el mensaje";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    });


    return (
        <section className="bg-surface py-24 px-8 text-on-surface" id="contacto">
            <div className="max-w-7xl mx-auto text-center">
                <h2 id="contacto" className="font-bold mb-8 text-5xl tracking-tighter">{t('contact.title')}</h2>
                <p className="mb-12 text-xl text-on-surface-variant">{t('contact.description')}</p>
                <form
                    onSubmit={onSubmit}
                    className="bg-surface-alt border border-white/5 p-12 rounded-2xl space-y-6 shadow-2xl text-left"
                >
                    <input type="hidden" name="_captcha" value="true" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_subject" value="Nuevo mensaje desde la web" />
                    {/* honeypot anti bots */}
                    <input
                        type="text"
                        {...register("website")}
                        className="hidden"
                    />
                    {/* Name */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="name" className="font-label flex gap-x-2 items-center text-xs text-on-surface-variant tracking-widest uppercase"><MdDriveFileRenameOutline />{t('contact.form.name')}</label>
                            <input 
                                type="text"
                                id="name"
                                aria-invalid={errors.nombre ? "true" : "false"}
                                aria-describedby="mensaje-error"
                                className="bg-surface border-none p-2 rounded-lg text-on-surface w-full focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface/20" 
                                placeholder={t('contact.form.placeholder.name')}
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
                            {errors.nombre && <span id="mensaje-error" className="text-error text-lg">{errors.nombre.message}
                        </span>}
                        </div>                        
                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="font-label flex gap-x-2 items-center text-xs text-on-surface-variant tracking-widest uppercase"><MdEmail />{t('contact.form.email')}</label>
                            <input 
                                type="email"
                                id="email"
                                aria-invalid={errors.email ? "true" : "false"}
                                aria-describedby="mensaje-error" 
                                className="bg-surface border-none p-2 rounded-lg text-on-surface w-full focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface/20" 
                                placeholder={t('contact.form.placeholder.email')}
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
                            />
                            {errors.email && <span id="mensaje-error" className="text-error text-lg">{errors.email.message}</span>}
                        </div>                        
                    </div>
                    {/* Message */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="font-label flex gap-x-2 items-center text-xs text-on-surface-variant tracking-widest uppercase"><MdOutlineMessage />{t('contact.form.message')}</label>
                        <textarea                             
                            id="message"
                            rows={5}
                            aria-invalid={errors.mensaje ? "true" : "false"}
                            aria-describedby="mensaje-error" 
                            className="bg-surface border-none min-h-37.5 rounded-lg resize-none p-2 text-on-surface w-full focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface/20"
                            placeholder={t('contact.form.placeholder.message')}
                            {...register('mensaje',
                            {
                                required:
                                {
                                    value: true,
                                    message: 'El mensaje es requerido',
                                },
                                minLength: {
                                    value: 10,
                                    message: 'El mensaje debe tener al menos 10 caracteres'
                                },
                                maxLength: {
                                    value: 500,
                                    message: 'El mensaje debe tener maximo 500 caracteres'
                                }
                            }
                        )}
                        >
                        </textarea>
                        {errors.mensaje && <span id="mensaje-error" className="text-error text-lg">{errors.mensaje.message}</span>}
                    </div>
                    <button
                        type="submit" 
                        className="bg-primary cursor-pointer font-bold py-4 rounded-xl shadow-lg shadow-primary/10 text-on-primary transition-all w-full active:scale-95 hover:brightness-110" type="submit">
                        {t('contact.form.btn')}
                    </button>
                </form>                
            </div>
        </section>
    );
};
export default ContactoSection;