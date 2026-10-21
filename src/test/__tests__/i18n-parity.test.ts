import { describe, it } from 'vitest';
import translationES from '../../locales/es/translation.json';
import translationEN from '../../locales/en/translation.json';

function flattenKeys(obj: Record<string, unknown>, prefix = ''): Set<string> {
  const keys = new Set<string>();
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedKeys = flattenKeys(value as Record<string, unknown>, path);
      for (const nestedKey of nestedKeys) {
        keys.add(nestedKey);
      }
    } else {
      keys.add(path);
    }
  }
  return keys;
}

function setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const diff = new Set<T>();
  for (const item of setA) {
    if (!setB.has(item)) {
      diff.add(item);
    }
  }
  return diff;
}

describe('i18n parity (ES vs EN)', () => {
  it('should have identical key structures in both locales', () => {
    const esKeys = flattenKeys(translationES as Record<string, unknown>);
    const enKeys = flattenKeys(translationEN as Record<string, unknown>);

    const missingInEN = setDifference(esKeys, enKeys);
    const extraInEN = setDifference(enKeys, esKeys);

    const errors: string[] = [];

    if (missingInEN.size > 0) {
      errors.push('Missing keys in EN (present in ES but not in EN):');
      for (const key of Array.from(missingInEN).sort()) {
        errors.push(`  - ${key}`);
      }
    }

    if (extraInEN.size > 0) {
      errors.push('Extra keys in EN (present in EN but not in ES):');
      for (const key of Array.from(extraInEN).sort()) {
        errors.push(`  - ${key}`);
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  });
});