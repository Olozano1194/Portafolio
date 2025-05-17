import { skill } from "../data/datos";
import getIcon from "../assets/icons/IconsSkills";


function Skills() {
    return (
        <section className="containerSkills w-full overflow-hidden flex flex-col justify-center items-center p-5 border-b-2 border-stone-900">
            <h2 id="skill" className="text-4xl font-bold ">Skills</h2>
            <ul className="w-full flex flex-wrap justify-between text-center gap-5 mt-5 text-3xl cursor-pointer">
                {skill.map((item) => (
                    <li key={item.id} className='flex items-center flex-col justify-center'>
                        {getIcon(item.icon)}
                        <span>{item.description}</span>
                    </li>
                ))

                }
            </ul>
        </section>
    );
    
}
export default Skills;