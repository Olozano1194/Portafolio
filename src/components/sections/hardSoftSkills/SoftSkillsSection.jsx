import { useTranslation } from "react-i18next";
import { softSkills } from "../../../data/skillSoftHobb";
// icons
import { MdTerminal } from "react-icons/md";

const SoftSkillsSection = () => {
    const { t } = useTranslation();

    return (
        <section className=''>
            <h2 className="font-label mb-6 text-sm text-primary/50 tracking-[0.3em] uppercase">{t(`softSkills.subtitle`)}</h2>
            <h3 className="font-bold mb-12 text-4xl text-on-surface tracking-tight">{t(`softSkills.title`)}</h3>
            <div className="space-y-6">
                {/* cards */}
                {softSkills.map(item => (
                    <article key={item.id} className="group text-on-surface">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold">{t(`softSkills.items.${item.key}`)}</span>
                            <span className="font-label text-primary text-xs">{item.level}%</span>
                        </div>
                        <div className="bg-surface-alt h-1 overflow-hidden rounded-full w-full">
                            <div 
                                className="bg-primary h-full transition-all group-hover:brightness-125"
                                style={{ width: `${item.level}%` }}
                            ></div>
                        </div>
                    </article>

                ))}
            </div>
        </section>
    );
}
export default SoftSkillsSection;