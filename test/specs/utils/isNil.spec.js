import isNil from '@/utils/isNil';

describe('isNil', () => {
  it('Invalid types', () => {
    [NaN, [], {}, () => ({}), Object(), String(), Number(), true, false, 1, -1, 0, 'test', ''].forEach((v) => {
      expect(isNil(v)).toBe(false);
    });
  });

  it('Valid functions', () => {
    [null, undefined].forEach((v) => {
      expect(isNil(v)).toBe(true);
    });
  });
});
