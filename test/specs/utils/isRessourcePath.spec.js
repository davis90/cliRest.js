import isRessourcePath from '@/utils/isRessourcePath';

describe('isRessourcePath', () => {
  it('Invalid type', () => {
    [null, undefined, 15, true, {}, []].forEach((v) => {
      expect(isRessourcePath(v)).toBe(false);
    });
  });

  it('Empty string', () => {
    expect(isRessourcePath('')).toBe(false);
  });

  it('Invalid strings', () => {
    ['dépots/rayons', 'depots/rayons/{}{}/peintures', 'depots/rayons/{/peintures',
      'depots/rayons/}/peintures', 'depots/rayons/{peintures', 'depots/rayons/}peintures',
      'depots/rayons/{}/{}peintures', 'depots/rayons/{}/p{}eintures',
      'depots/rayons/{}/peintures//', 'depots/rayons/peintures//', 'm@isons/{}/pieces',
      '.reductions-impots', 'Voitures bleues/modeles/{}/notes',
      '(toitures)/styles', '#hastag/cagnotes', '€/{}/transformation'].forEach((v) => {
      expect(isRessourcePath(v)).toBe(false);
    });
  });

  it('Valid strings', () => {
    ['-reductions-impots', '-reductions.impots', 'depots/rayons/peintures',
      'depots/rayons/{}/peintures', 'depots/rayons/{}/{}/peintures',
      'depots/rayons/{}/{}/peintures/', 'Maisons/{}/pieces', 'reductions-impots/{}',
      'Voitures_bleues/modeles/{}/notes', 'toitures/styles',
      'euros/{}/transformation'].forEach((v) => {
      expect(isRessourcePath(v)).toBe(true);
    });
  });
});
