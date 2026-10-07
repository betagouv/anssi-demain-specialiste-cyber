import { describe, expect, it } from 'vitest';
import {
  lesPublicsCibleDesRessourcesCyber,
  lesThematiquesCyber,
  urlDeLIllustrationPetite,
} from '../../src/catalogue/ressourceCyber';
import { unConstructeurDeRessourceCyber } from './constructeurRessourceCyber';

describe('Les ressources Cyber', () => {
  it("utilise une illustration générique en l'absence d'illustration", () => {
    expect(urlDeLIllustrationPetite('')).toBe(
      '/assets/images/image-generique.svg',
    );
  });

  it("utilise la version petite de l'illustration", () => {
    expect(
      urlDeLIllustrationPetite('https://example.com/illustration.png'),
    ).toBe('https://example.com/illustration_petite.avif');
  });

  it('sort la liste des thématiques', () => {
    const thematiques = lesThematiquesCyber([
      unConstructeurDeRessourceCyber()
        .avecThematiques(['Réseau', 'Sécurité'])
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecThematiques(['Cryptographie'])
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecThematiques(['Réseau', 'Cryptographie'])
        .construis(),
    ]);

    expect(thematiques).toStrictEqual(['Cryptographie', 'Réseau', 'Sécurité']);
  });

  it('sort la liste des publics cible', () => {
    const publicsCible = lesPublicsCibleDesRessourcesCyber([
      unConstructeurDeRessourceCyber()
        .avecPublicsCible(['Parents', 'Enseignants'])
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecPublicsCible(['Enseignants', 'Élèves'])
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecPublicsCible(['Parents', 'Élèves'])
        .construis(),
    ]);

    expect(publicsCible).toStrictEqual(['Élèves', 'Enseignants', 'Parents']);
  });
});
