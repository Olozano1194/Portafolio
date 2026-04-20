import { useEffect } from "react";
// import { SEO } from "../components/ui/SEO";
import HeroSection from "../components/sections/HeroSection";
import SobreMiSection from "../components/sections/SobreMiSection";
import FormacionAcademicaSection from "../components/sections/FormacionAcademicaSection";
import ProyectosSection from "../components/sections/ProyectosSection";
import SkillsSection from "../components/sections/SkillsSection";
import HobbiesSection from "../components/sections/HobbiesSection";
import ContactoSection from "../components/sections/ContactoSection";


const HomePage = () => {
    // Scroll a sección si hay hash en la URL
    // useEffect(() => {
    //     const hash = window.location.hash;
    //     if (hash) {
    //         const id = hash.replace("#", "");
    //         const element = document.getElementById(id);
    //         if (element) {
    //             const headerOffset = 64;
    //             const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    //             const offsetPosition = elementPosition - headerOffset;

    //             setTimeout(() => {
    //                 window.scrollTo({
    //                     top: offsetPosition,
    //                     behavior: "smooth",
    //                 });
    //             }, 100);
    //         }
    //     }
    // }, []);

    return (
        <>
            {/* <SEO
                image="/logo.png"
                favicon="/favicon.png"                 
            /> */}
            <HeroSection />
            <SobreMiSection /> 
            <FormacionAcademicaSection /> 
            <ProyectosSection /> 
            <SkillsSection />
            <HobbiesSection />
            <ContactoSection />            
        </>        
    );
};
export default HomePage;