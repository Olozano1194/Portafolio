import type { SkillId } from './branded';

export type SkillLevel = 'junior' | 'mid' | 'senior';

export interface Skill {
  readonly id: SkillId;
  readonly icon: string;
  readonly level: SkillLevel;
}

export interface SoftSkill {
  readonly id: number;
  readonly key: string;
  readonly level: number;
}

export type SkillLevelLabel = 'Junior' | 'Mid' | 'Senior';
export const skillLevelLabel = (level: SkillLevel): SkillLevelLabel =>
  level === 'junior' ? 'Junior' : level === 'mid' ? 'Mid' : 'Senior';