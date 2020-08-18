import defaultTo from '@/utils/defaultTo';

const defaultValue = 'test';

describe('defaultTo', () => {
  it('return default', () => {
    [NaN, null, undefined].forEach((v) => {
      expect(defaultTo(v, defaultValue)).toBe(defaultValue);
    });
  });

  it('return value', () => {
    [{}, [], 2, 0, -1, '', 'test', true, false].forEach((v) => {
      expect(defaultTo(v, defaultValue)).toBe(v);
    });
  });
});
