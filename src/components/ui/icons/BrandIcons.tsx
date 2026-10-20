import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaPython,
  FaJava,
  FaGitAlt,
  FaLinkedinIn,
  FaGithub,
  FaFileAlt,
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiDjango, SiExpress, SiMysql, SiMongodb } from 'react-icons/si';

// Re-export Heroicons UI icons that we need
export {
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

export {
  ArrowRightIcon as ArrowRightIcon16,
} from '@heroicons/react/16/solid';

// Brand icons from react-icons (these have ALL the logos we need)
export const Html5Icon = FaHtml5;
export const Css3Icon = FaCss3Alt;
export const JavaScriptIcon = FaJsSquare;
export const ReactIcon = FaReact;
export const TypeScriptIcon = SiTypescript;
export const TailwindIcon = SiTailwindcss;
export const DjangoIcon = SiDjango;
export const ExpressIcon = SiExpress;
export const MySqlIcon = SiMysql;
export const MongoDbIcon = SiMongodb;
export const GitIcon = FaGitAlt;
export const LinkedInIcon = FaLinkedinIn;
export const GitHubIcon = FaGithub;
export const CvIcon = FaFileAlt;
export const JavaIcon = FaJava;
export const PythonIcon = FaPython;