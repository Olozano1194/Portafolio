import CarouselSection from "./ui/CarouselSection";
import { hobbies } from "../data/skillSoftHobb";
import getIcon from "../assets/icons/iconsHobbies";


function Hobbies() {
    return (
        // <section id="hobbies" className="containerSkills w-full overflow-hidden flex flex-col items-center p-5">
        //     <h2  className="text-4xl font-bold ">Hobbies</h2>
        //     <div className="w-full overflow-hidden mt-5">
        //         <ul className="carousel-track flex flex-nowrap text-3xl cursor-pointer">
        //             {
        //                 hobbies.map((item) => (
        //                     <li key={item.id} className='carousel-item flex items-center flex-col justify-center min-w-[120px]'>
        //                         {getIcon(item.icon)}
        //                         <span>{item.description}</span>
        //                     </li>
        //                 ))
        //             }
        //             {
        //                 hobbies.map((item) => (
        //                     <li
        //                         key={`copy-${item.id}`}
        //                         className="carousel-item flex flex-col items-center justify-center min-w-[120px]"
        //                     >
        //                         {getIcon(item.icon)}
        //                         <span>{item.description}</span>
        //                     </li>
        //                 ))
        //             }
        //         </ul>
        //     </div>
        // </section>
        <CarouselSection
        id='hobbies'
            translationKey='hobbies'
            items={hobbies}
            getIcon={getIcon}
            isLast
            titleClass="section-title"
        />
    );
}
export default Hobbies;