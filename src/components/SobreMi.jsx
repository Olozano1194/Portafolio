import imgPerfil from '../assets/foto_perfil.jpeg'

function SobreMi() {
    return (
        <section id='sobreMi' className="flex justify-center items-center flex-col p-7 border-b-2 border-stone-900">
            <div className='rounded-full'>
                <img src={imgPerfil} alt="img-perfil" className='rounded-full w-60' />
            </div>

            <div className='flex flex-col justify-center items-center text-slate-950 text-[1.05rem] md:text-[1.2rem]'>
                <h2 className='text-4xl font-bold mt-5 mb-4'>Sobre mi</h2>

                <p className='leading-9'>¡Hola¡ Soy <span className='font-bold'>Oscar</span>, ingeniero en sistemas colombiano apasionado por el desarrollo Front-End con habilidades Full Stack. Desde mi graduación en el 2022, me he enfocado en construir una base sólida en programación a través de formación intensiva y proyectos prácticos.<br></br>
                Mi recorrido incluye:<br></br>✅ Certificación en el programa Oracle ONE (Alura Latam): donde se aprendió de Java, JavaScript, CSS3 y MySQL.<br></br>✅ Programa Misión TIC: fortalecimiento en lógica de programación y mejores prácticas.<br></br>✅ Cursos en Platzi: exploración de frameworks como Bootstrap y Django.<br></br> Actualmente, me estoy especializando en tecnologías modernas como React, Tailwind, Next, Django RestFramework, MongoDB, Vercel y Git.<br></br>
                Busco oportunidades para contribuir con soluciones creativas, escalables y centradas en el usuario.<br></br>
                ¡Gracias por visitar mi perfil y conocer más sobre mí!.
                </p>
            </div>
        </section>

    );
}
export default SobreMi;