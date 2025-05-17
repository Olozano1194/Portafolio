import { softSkills } from "../data/datos";
import getIcon from "../assets/icons/iconsSoftSkill";


function SoftSkills() {
    return (
        <section className="containerSoftSkills w-full overflow-hidden flex flex-col justify-center items-center p-5 border-b-2 border-stone-900">
            <h2 id="softSkill" className="text-4xl font-bold ">SoftSkills</h2>
            <ul className="w-full flex flex-wrap justify-between text-center gap-5 mt-5 text-3xl cursor-pointer">
                {softSkills.map((item) => (
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
export default SoftSkills;