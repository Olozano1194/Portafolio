import imgPerfil from '../assets/foto_perfil.png'

function SobreMi() {
    return (
        <section id='sobreMi' className="flex justify-center items-center flex-col p-7 border-b-2 border-stone-900">
            <div className='rounded-full'>
                <img src={imgPerfil} alt="img-perfil" className='rounded-full w-60' />
            </div>

            <div className='flex flex-col justify-center items-center text-slate-800 text-[1.05rem] text-justify md:text-[1.3rem]'>
                <h2 className='text-4xl font-bold mt-5 mb-4'>Sobre mi</h2>
                <article className='font-ubuntu leading-9'>
                    <p>
                        ¡Hola¡ Soy <span className='text-black font-bold'>Oscar, ingeniero de sistemas</span> con una mentalidad orientada a la resolución de problemas y el aprendizaje continuo.
                    </p>
                    <p className='mt-6'>
                        Desde mi graduación en 2022, he transformado mi base académica en habilidades técnicas prácticas. Mi formación no se detuvo en la universidad; me he forjado a través de programas de alto rendimiento que me han dado una visión <span className='text-black font-bold'>Full Stack</span>:
                    </p>
                    <p className='mt-6'>
                        ✅ Fundamentos Sólidos: A través de <span className='text-black font-bold'>Oracle Next Education (Alura)</span> y <span className='text-black font-bold'>Misión TIC</span>, consolidé mi lógica de programación en <span className='text-black font-bold'>Java</span> y <span className='text-black font-bold'>JavaScript</span>, junto con el manejo de bases de datos relacionales <span className='text-black font-bold'>(MySQL)</span>.
                    </p>
                    <p className='mt-5 mb-6'>
                        ✅ Stack Moderno: Actualmente profundizo en tecnologías de alta demanda como <span className='text-black font-bold'>React, Typescript</span> y <span className='text-black font-bold'>Django Rest Framework</span>, buscando siempre escribir código limpio y escalable.
                    </p>
                    <p>
                        Mi objetivo es integrarme a un equipo donde pueda aplicar mi capacidad de <span className='text-black font-bold'>análisis</span>, mi <span className='text-black font-bold'>adaptabilidad</span> y mis bases técnicas para crear productos que mejoren la experiencia del usuario. Soy un firme creyente de que la ingeniería y el desarrollo web van de la mano para crear soluciones eficientes.
                    </p>

                </article>                
            </div>
        </section>

    );
}
export default SobreMi;

/*
Actúa como un experto en selección de personal especializado en ingeniería de sistemas con énfasis en desarrollo de software y con experiencia contratando para empresas remotas o Hibridas. Cabe resaltar que aun no tengo experiencia en el sector de desarrollo, entonces no vaya a colocar que soy experto o que tengo solida experiencia, porque aun me falta arto para eso, porque si se coloca eso, cuando me pregunten que tan experto soy y eso, no voy a poder contestar. 

Voy a darte:

1. Mi portafolio actual

Necesito que:

- Rescribas mi portafolio para que encaje perfectamente con uno que sea vistoso para potenciales reclutadores.
- Destaques las habilidades y logros más relevantes para los trabajo, tanto front como full stack.
- Mantengas un tono profesional pero cercano.

adjunto mi link del portafolio.
*/