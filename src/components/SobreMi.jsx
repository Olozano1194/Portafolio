import imgPerfil from '../assets/foto_perfil.png'

function SobreMi() {
    return (
        <section id='sobreMi' className="flex justify-center items-center flex-col p-7 border-b-2 border-stone-900">
            <div className='rounded-full'>
                <img src={imgPerfil} alt="img-perfil" className='rounded-full w-60' />
            </div>

            <div className='flex flex-col justify-center items-center text-slate-950 text-[1.05rem] md:text-[1.2rem]'>
                <h2 className='text-4xl font-bold mt-5 mb-4'>Sobre mi</h2>

                <p className='leading-9'>¡Hola¡ Soy <span className='font-bold'>Oscar</span>, ingeniero de sistemas con una mentalidad orientada a la resolución de problemas y el aprendizaje continuo. 
                Desde mi graduación en 2022, he transformado mi base académica en habilidades técnicas prácticas. Mi formación no se detuvo en la universidad; me he forjado a través de programas de alto rendimiento que me han dado una visión Full Stack:<br></br>
                ✅ Fundamentos Sólidos: A través de Oracle Next Education (Alura) y Misión TIC, consolidé mi lógica de programación en Java y JavaScript, junto con el manejo de bases de datos relacionales (MySQL).<br></br>✅ Stack Moderno: Actualmente profundizo en tecnologías de alta demanda como React, MongoDB y Django Rest Framework, buscando siempre escribir código limpio y escalable.<br></br>
                Mi objetivo es integrarme a un equipo donde pueda aplicar mi capacidad de análisis, mi adaptabilidad y mis bases técnicas para crear productos que mejoren la experiencia del usuario. Soy un firme creyente de que la ingeniería y el desarrollo web van de la mano para crear soluciones eficientes.
                </p>
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