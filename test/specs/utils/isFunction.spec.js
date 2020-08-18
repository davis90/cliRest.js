import isFunction from '@/utils/isFunction';

describe('isFunction', () => {
  it('Invalid types', () => {
    [NaN, null, undefined, [], {}, Object(), String(), Number(), true, false, 'test', '', 1, -1, 0].forEach((v) => {
      expect(isFunction(v)).toBe(false);
    });
  });

  it('Valid functions', () => {
    [function test() { }, () => ({})].forEach((v) => {
      expect(isFunction(v)).toBe(true);
    });
  });
});
