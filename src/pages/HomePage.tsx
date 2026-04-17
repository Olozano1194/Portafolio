import { useEffect } from "react";
// import { SEO } from "../components/ui/SEO";
import HeroSection from "../components/sections/HeroSection";
import SobreMiSection from "../components/sections/SobreMiSection";
import FormacionAcademicaSection from "../components/sections/FormacionAcademicaSection";
import ProyectosSection from "../components/sections/ProyectosSection";
import SkillsSection from "../components/sections/SkillsSection";
// import ServicesSection from "../components/sections/ServicesSection";
// import ProcessSection from "../components/sections/ProcessSection";
// import WorkSection from "../components/sections/WorkSection";
// import FAQSection from "../components/sections/FAQSection";
// import ContactSection from "../components/sections/ContactSection";
// import PlanSolutionSection from "../components/sections/PlanSolutionSection";

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
            {/*<ServicesSection />
            <WorkSection />
            <ProcessSection />
            <PlanSolutionSection />            
            <FAQSection />
            <ContactSection />             */}
        </>        
    );
};
export default HomePage;