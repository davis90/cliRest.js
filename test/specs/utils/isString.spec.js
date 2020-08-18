import isString from '@/utils/isString';

describe('isString', () => {
  it('Invalid types', () => {
    [{}, NaN, null, undefined, [], true, false, 1, -1, 0].forEach((v) => {
      expect(isString(v)).toBe(false);
    });
  });

  it('Valid strings', () => {
    ['', 'hello world!', 'a', '@', 'l', 'l helloWorld', '  ', '_', '_ helloworld'].forEach((v) => {
      expect(isString(v)).toBe(true);
    });
  });
});
