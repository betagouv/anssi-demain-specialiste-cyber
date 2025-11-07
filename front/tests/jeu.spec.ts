import { describe, expect, it } from 'vitest';
import { construisLesJeux, enumerationFrancaise } from '../src/jeu.type';

describe('Une énumération française', () => {
  describe('sait se construire, à partir des termes', () => {
    it("lorsqu'il n'y a qu'un terme", () => {
      const auteurs = enumerationFrancaise(['Cindy']);
      expect(auteurs).toEqual('Cindy');
    });

    it("lorsqu'il n'y en a pas", () => {
      const auteurs = enumerationFrancaise([]);

      expect(auteurs).toEqual('');
    });

    it("sépare par 'et' lorsqu'il y en a deux", () => {
      const auteurs = enumerationFrancaise(['Cindy', 'Kylian']);

      expect(auteurs).toEqual('Cindy et Kylian');
    });

    it('sépare par des virgules les premiers termes', () => {
      const auteurs = enumerationFrancaise(['Cindy', 'Kylian', 'Branda']);

      expect(auteurs).toEqual('Cindy, Kylian et Branda');
    });
  });
});

describe('La construction d’un jeu', () => {
  const donneesJeuCommunes = {
    id: 'x',
    description: '',
    niveau: 'Post Bac',
    categorie: 'simulation',
    thematiques: ['orientation'],
    nomEtablissement: 'Collège',
    eleves: ['Michel'],
    reactions: {},
    photos: { couverture: { chemin: '' }, photos: [] },
  };

  it('retourne la liste triée des jeux', () => {
    const jeuxNonTries = [
      { nom: 'Zora', ...donneesJeuCommunes },
      { nom: 'Baltazar', ...donneesJeuCommunes },
    ];
    const jeuxTries = construisLesJeux(jeuxNonTries);

    expect(jeuxTries[0].nom).toBe('Baltazar');
    expect(jeuxTries[1].nom).toBe('Zora');
  });
});
