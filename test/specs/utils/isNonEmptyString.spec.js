import isNonEmptyString from '@/utils/isNonEmptyString';

describe('isNonEmptyString', () => {
  it('Invalid types', () => {
    [{}, null, undefined, [], 15, true].forEach((v) => {
      expect(isNonEmptyString(v)).toBe(false);
    });
  });

  it('Empty string', () => {
    expect(isNonEmptyString('')).toBe(false);
  });

  it('Valid strings', () => {
    ['hello world!', 'a', '@', 'l', 'l helloWorld', '  ', '_', '_ helloworld'].forEach((v) => {
      expect(isNonEmptyString(v)).toBe(true);
    });
  });
});
