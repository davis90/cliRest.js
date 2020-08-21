import isRessourceName from '@/utils/isRessourceName';

describe('isRessourceName', () => {
  it('Invalid type', () => {
    [null, undefined, 15, true, {}, []].forEach((v) => {
      expect(isRessourceName(v)).toBe(false);
    });
  });

  it('Empty string', () => {
    expect(isRessourceName('')).toBe(false);
  });

  it('Invalid strings', () => {
    ['dépots', 'm@isons', 'm@isons', '-reductions-impots', 'Voitures bleues',
      '(toitures)', '#hastag', '€'].forEach((v) => {
        expect(isRessourceName(v)).toBe(false);
      });
  });

  it('Valid strings', () => {
    ['depots', 'Maisons', 'reductions-impots', 'Voitures_bleues', 'toitures'].forEach((v) => {
      expect(isRessourceName(v)).toBe(true);
    });
  });
});
