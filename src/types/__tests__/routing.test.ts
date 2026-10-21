import { describe, it, expect } from 'vitest';
import { getParam, getParamAsNumber, getParamOptional } from '../routing';

type RouteParams = Record<string, string | undefined>;

describe('routing utilities', () => {
  describe('getParam', () => {
    it('returns value when param exists and is non-empty', () => {
      const params = { id: '42', slug: 'test' } as RouteParams;
      expect(getParam(params, 'id')).toBe('42');
      expect(getParam(params, 'slug')).toBe('test');
    });

    it('throws when param is missing', () => {
      const params = { id: '42' } as RouteParams;
      expect(() => getParam(params, 'slug')).toThrow('Missing required param: slug');
    });

    it('throws when param is empty string', () => {
      const params = { id: '42', slug: '' } as RouteParams;
      expect(() => getParam(params, 'slug')).toThrow('Missing required param: slug');
    });

    it('throws when param is undefined', () => {
      const params = { id: '42', slug: undefined } as RouteParams;
      expect(() => getParam(params, 'slug')).toThrow('Missing required param: slug');
    });
  });

  describe('getParamAsNumber', () => {
    it('returns number when param is valid integer', () => {
      const params = { id: '42' } as RouteParams;
      expect(getParamAsNumber(params, 'id')).toBe(42);
    });

    it('returns number when param is valid float', () => {
      const params = { value: '3.14' } as RouteParams;
      expect(getParamAsNumber(params, 'value')).toBe(3.14);
    });

    it('returns number when param is negative', () => {
      const params = { offset: '-10' } as RouteParams;
      expect(getParamAsNumber(params, 'offset')).toBe(-10);
    });

    it('throws when param is not a number', () => {
      const params = { id: 'abc' } as RouteParams;
      expect(() => getParamAsNumber(params, 'id')).toThrow('Invalid number param: id=abc');
    });

    it('throws when param is empty string (treated as missing)', () => {
      const params = { id: '' } as RouteParams;
      expect(() => getParamAsNumber(params, 'id')).toThrow('Missing required param: id');
    });

    it('throws when param is missing', () => {
      const params = { other: '42' } as RouteParams;
      expect(() => getParamAsNumber(params, 'id')).toThrow('Missing required param: id');
    });
  });

  describe('getParamOptional', () => {
    it('returns param value when present', () => {
      const params = { id: '42', slug: 'test' } as RouteParams;
      expect(getParamOptional(params, 'slug', 'default')).toBe('test');
    });

    it('returns fallback when param is missing', () => {
      const params = { id: '42' } as RouteParams;
      expect(getParamOptional(params, 'slug', 'default')).toBe('default');
    });

    it('returns empty string when param is empty (?? does not fallback on empty string)', () => {
      const params = { id: '42', slug: '' } as RouteParams;
      expect(getParamOptional(params, 'slug', 'default')).toBe('');
    });

    it('returns fallback when param is undefined', () => {
      const params = { id: '42', slug: undefined } as RouteParams;
      expect(getParamOptional(params, 'slug', 'default')).toBe('default');
    });

    it('returns empty string when param is empty and fallback is empty', () => {
      const params = { id: '42', slug: '' } as RouteParams;
      expect(getParamOptional(params, 'slug', '')).toBe('');
    });
  });
});