import { useTranslation } from "react-i18next";
import { skill as skills } from "../../../data/skillSoftHobb";
import type { Skill } from "@/types/skill";
import {
  Html5Icon,
  Css3Icon,
  JavaScriptIcon,
  ReactIcon,
  TypeScriptIcon,
  TailwindIcon,
  DjangoIcon,
  ExpressIcon,
  MySqlIcon,
  MongoDbIcon,
  GitIcon,
  JavaIcon,
  PythonIcon,
} from "../../../components/ui/icons/BrandIcons";

const HardSkillsSection = () => {
  const { t } = useTranslation();

  const skillsData = skills as Skill[];

  const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement> & { size?: number; color?: string }>> = {
    FaHtml5: Html5Icon,
    FaJava: JavaIcon,
    FaCss3: Css3Icon,
    FaPython: PythonIcon,
    IoLogoJavascript: JavaScriptIcon,
    SiDjango: DjangoIcon,
    FaReact: ReactIcon,
    SiTailwindcss: TailwindIcon,
    SiMysql: MySqlIcon,
    FaGitAlt: GitIcon,
    SiTypescript: TypeScriptIcon,
    SiExpress: ExpressIcon,
    SiMongodb: MongoDbIcon,
  };

  return (
    <section className=''>
      <h2 className="font-label mb-6 text-sm text-primary/50 tracking-[0.3em] uppercase">{t(`skills.subtitle`)}</h2>
      <h3 className="font-bold mb-12 text-4xl text-on-surface tracking-tight">{t(`skills.title`)}</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* cards */}
        {
          skillsData.map((item: Skill, index: number) => {
            const Icon = icons[item.icon];
            return (
              <article
                key={item.id}
                style={{ animationDelay: `${index * 60}ms` }} 
                className="group relative bg-surface-container flex rounded-xl gap-2 items-center min-w-0 p-3 transition-all duration-300 ease-out
              hover:bg-surface-alt hover:-translate-y-1 hover:shadow-lg md:p-6 md:gap-4 md:justify-between md:items-start"
              >
                <span className="text-primary text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 md:text-2xl">{Icon && <Icon />}</span>
                <span className="font-label text-xs text-on-surface tracking-wide transition-colors truncate group-hover:text-primary md:text-lg">
                  {t(`skills.items.${item.id}.description`)}
                </span>
                {item.level && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold md:text-[14px] md:px-4 md:py-1 ${
                    item.level === 'mid' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-surface-alt text-on-surface-variant'
                  }`}>
                    {item.level === 'mid' ? 'Mid' : 'Junior'}
                  </span>
                )}
              </article>
            )            
          })
        }
      </div>
    </section>
  );
}
export default HardSkillsSection;