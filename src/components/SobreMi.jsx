import imgPerfil from '../assets/foto_perfil.png'

function SobreMi() {
    return (
        <section id='sobreMi' className="flex justify-center items-center flex-col p-7 border-b-2 border-stone-900">
            <div className='rounded-full'>
                <img src={imgPerfil} alt="img-perfil" className='rounded-full w-60' />
            </div>

            <div className='flex flex-col justify-center items-center text-text-primary text-[1.05rem] text-justify md:text-[1.3rem] dark:text-bg-card'>
                <h2 className='text-4xl font-bold mt-5 mb-4'>Sobre mi</h2>
                <article className='font-ubuntu leading-9'>
                    <p>
                        ¡Hola¡ Soy <span className='text-text-primary font-bold dark:text-primary'>Oscar, ingeniero de sistemas</span> con una mentalidad orientada a la resolución de problemas y el aprendizaje continuo.
                    </p>
                    <p className='mt-6'>
                        Desde mi graduación en 2022, he transformado mi base académica en habilidades técnicas prácticas. Mi formación no se detuvo en la universidad; me he forjado a través de programas de alto rendimiento que me han dado una visión <span className='text-text-primary font-bold dark:text-primary'>Full Stack</span>:
                    </p>
                    <p className='mt-6'>
                        ✅ Fundamentos Sólidos: A través de <span className='text-text-primary font-bold dark:text-primary'>Oracle Next Education (Alura)</span> y <span className='text-text-primary font-bold dark:text-primary'>Misión TIC</span>, consolidé mi lógica de programación en <span className='text-text-primary font-bold dark:text-primary'>Java</span> y <span className='text-text-primary font-bold dark:text-primary'>JavaScript</span>, junto con el manejo de bases de datos relacionales <span className='text-text-primary font-bold dark:text-primary'>(MySQL)</span>.
                    </p>
                    <p className='mt-5 mb-6'>
                        ✅ Stack Moderno: Actualmente profundizo en tecnologías de alta demanda como <span className='text-text-primary font-bold dark:text-primary'>React, Typescript</span> y <span className='text-text-primary font-bold dark:text-primary'>Django Rest Framework</span>, buscando siempre escribir código limpio y escalable.
                    </p>
                    <p>
                        Mi objetivo es integrarme a un equipo donde pueda aplicar mi capacidad de <span className='text-text-primary font-bold dark:text-primary'>análisis</span>, mi <span className='text-text-primary font-bold dark:text-primary'>adaptabilidad</span> y mis bases técnicas para crear productos que mejoren la experiencia del usuario. Soy un firme creyente de que la ingeniería y el desarrollo web van de la mano para crear soluciones eficientes.
                    </p>

                </article>                
            </div>
        </section>

    );
}
export default SobreMi;