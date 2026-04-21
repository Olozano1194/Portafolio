import { useTranslation } from "react-i18next";
import { skill as skills } from "../../../data/skillSoftHobb";
// icons
import { MdTerminal } from "react-icons/md";
import { 
  FaHtml5,
  FaJava,
  FaCss3,
  FaPython,
  FaReact 
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiDjango, SiTailwindcss, SiMysql, SiTypescript } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa6";

const HardsSkillsSection = () => {
  const { t } = useTranslation();
  const icons = {
  FaHtml5: FaHtml5,
  FaJava: FaJava,
  FaCss3: FaCss3,
  FaPython: FaPython,
  IoLogoJavascript: IoLogoJavascript,
  SiDjango: SiDjango,
  FaReact: FaReact,
  SiTailwindcss: SiTailwindcss,
  SiMysql: SiMysql,
  FaGitAlt: FaGitAlt,
  SiTypescript: SiTypescript
  };  


  return (
    <section className=''>
      <h2 className="font-label mb-6 text-sm text-primary/50 tracking-[0.3em] uppercase">{t(`skills.subtitle`)}</h2>
      <h3 className="font-bold mb-12 text-4xl text-on-surface tracking-tight">{t(`skills.title`)}</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* cards */}
        {
          skills.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <article
                key={item.id}
                style={{ animationDelay: `${index * 60}ms` }} 
                className="group relative bg-surface-container flex p-6 rounded-xl gap-4 items-center transition-all duration-300 ease-out
              hover:bg-surface-alt hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-primary text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{Icon && <Icon />}</span>
                <span className="font-label text-sm text-on-surface tracking-wide transition-colors group-hover:text-primary">
                  {t(`skills.items.${item.id}.description`)}
                </span>
              </article>

            )            
          })
        }
      </div>
    </section>
  );
}
export default HardsSkillsSection;
