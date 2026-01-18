import { softSkills } from "../data/skillSoftHobb";
import getIcon from "../assets/icons/iconsSoftSkill";


function SoftSkills() {
    return (
        <section className="containerSkills w-full overflow-hidden flex flex-col items-center p-5 border-b-2 border-stone-900">
            <h2 id="softSkill" className="text-4xl font-bold ">SoftSkills</h2>
            <div className="w-full overflow-hidden mt-5">
                <ul className="carousel-track reverse flex flex-nowrap text-3xl cursor-pointer">
                    {
                        softSkills.map((item) => (
                            <li 
                                key={item.id} 
                                className='carousel-item flex items-center flex-col justify-center min-w-[120px]'>
                                {getIcon(item.icon)}
                                <span>{item.description}</span>
                            </li>
                        ))
                    }
                    {
                        softSkills.map((item) => (
                            <li
                                key={`copy-${item.id}`}
                                className="carousel-item flex flex-col items-center justify-center min-w-[120px]"
                            >
                                {getIcon(item.icon)}
                                    <span>{item.description}</span>
                            </li>
                        ))
                    }
                </ul>            
            </div>
        </section>
    );
    
}
export default SoftSkills;