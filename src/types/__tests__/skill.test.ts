import { describe, it, expect } from 'vitest';
import { skillLevelLabel, type SkillLevel } from '../skill';

describe('skillLevelLabel', () => {
  it('maps junior to Junior', () => {
    expect(skillLevelLabel('junior')).toBe('Junior');
  });

  it('maps mid to Mid', () => {
    expect(skillLevelLabel('mid')).toBe('Mid');
  });

  it('maps senior to Senior', () => {
    expect(skillLevelLabel('senior')).toBe('Senior');
  });

  it('returns non-empty label for all valid levels', () => {
    const levels: SkillLevel[] = ['junior', 'mid', 'senior'];
    for (const level of levels) {
      const label = skillLevelLabel(level);
      expect(label).toBeTruthy();
      expect(label.length).toBeGreaterThan(0);
    }
  });

  it('returns defined fallback for unknown level', () => {
    // TypeScript would catch this at compile time, but we test runtime behavior
    const unknownLevel = 'expert' as SkillLevel;
    const label = skillLevelLabel(unknownLevel);
    expect(label).toBe('Senior'); // Falls through to final ternary branch
  });

  it('returns defined fallback for empty string', () => {
    const unknownLevel = '' as SkillLevel;
    const label = skillLevelLabel(unknownLevel);
    expect(label).toBe('Senior'); // Falls through to final ternary branch
  });

  it('returns defined fallback for random string', () => {
    const unknownLevel = 'random' as SkillLevel;
    const label = skillLevelLabel(unknownLevel);
    expect(label).toBe('Senior'); // Falls through to final ternary branch
  });
});