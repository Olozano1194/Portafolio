import HardsSkillsSection from "./hardSoftSkills/HardSkillsSection";
import SoftSkillsSection from "./hardSoftSkills/SoftSkillsSection";


function SkillsSection() {
    return (
        <section className="bg-surface py-24 px-8" id="skill">
            <div className="max-w-7xl mx-auto">
                <article className="grid gap-24 lg:grid-cols-2">
                    <HardsSkillsSection />
                    <SoftSkillsSection />

                </article>
            </div>
        </section>
    );    
}
export default SkillsSection;