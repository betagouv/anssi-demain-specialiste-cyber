import { describe, expect, it } from 'vitest';
import { construisLesJeux } from '../../src/cyber-en-jeux/jeu';

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
