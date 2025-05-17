import { hobbies } from "../data/datos";
import getIcon from "../assets/icons/iconsHobbies";


function Hobbies() {
    return (
        <section id="hobbies" className="containerHobbies w-full overflow-hidden flex flex-col justify-center items-center p-5">
            <h2  className="text-4xl font-bold ">Hobbies</h2>
            <ul className="w-full flex flex-wrap justify-between text-center gap-5 mt-5 text-3xl cursor-pointer">
                {hobbies.map((item) => (
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
export default Hobbies;