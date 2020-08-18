import isObject from '@/utils/isObject';

describe('isObject', () => {
  it('Invalid types', () => {
    [NaN, null, undefined, [], () => ({}), String(), Number(), true, false, 1, -1, 0, 'test', ''].forEach((v) => {
      expect(isObject(v)).toBe(false);
    });
  });

  it('Valid objects', () => {
    [{}, { a: 3 }, Object()].forEach((v) => {
      expect(isObject(v)).toBe(true);
    });
  });
});
