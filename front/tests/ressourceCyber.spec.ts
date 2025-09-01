import { describe, expect, it } from 'vitest';
import { lesThematiquesCyber } from '../src/ressourceCyber';

describe('Les ressources Cyber', () => {
  it('sort la liste des thématiques', () => {
    const thematiques = lesThematiquesCyber([
      { id: 1, titre: 'Ressource 1', thematiques: ['Réseau', 'Sécurité'] },
      { id: 2, titre: 'Ressource 2', thematiques: ['Cryptographie'] },
      { id: 3, titre: 'Ressource 3', thematiques: ['Réseau', 'Cryptographie'] },
    ]);

    expect(thematiques).toStrictEqual(['Cryptographie', 'Réseau', 'Sécurité']);
  });
});
