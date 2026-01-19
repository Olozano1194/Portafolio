import CarouselSection from "./ui/CarouselSection";
import { skill } from "../data/skillSoftHobb";
import getIcon from "../assets/icons/IconsSkills";


function Skills() {
    return (
        // <section className="containerSkills w-full overflow-hidden flex flex-col items-center p-5 border-b-2 border-stone-900">
        //     <h2 id="skill" className="text-4xl font-bold ">Skills</h2>
        //     <div className="w-full overflow-hidden mt-5">
        //         <ul className="carousel-track flex flex-nowrap text-3xl cursor-pointer">
        //         {
        //             skill.map((item) => (
        //                 <li key={item.id} className='carousel-item flex items-center flex-col justify-center min-w-[120px]'>
        //                     {getIcon(item.icon)}
        //                     <span>{item.description}</span>
        //                 </li>
        //             ))
        //         }
        //         {
        //             skill.map((item) => (
        //                 <li
        //                     key={`copy-${item.id}`}
        //                     className="carousel-item flex flex-col items-center justify-center min-w-[120px]"
        //                 >
        //                     {getIcon(item.icon)}
        //                     <span>{item.description}</span>
        //                 </li>
        //             ))
        //         }
        //     </ul>
        //     </div>            
        // </section>
        <CarouselSection
            id='skill' 
            title='Skill'
            items={skill}
            getIcon={getIcon}
            titleClass="section-title"            
        />
    );    
}
export default Skills;