import { describe, expect, it } from 'vitest';
import {
  lesPublicsCibleDesRessourcesCyber,
  lesThematiquesCyber,
} from '../../src/catalogue/ressourceCyber';
import { unConstructeurDeRessourceCyber } from './constructeurRessourceCyber';

describe('Les ressources Cyber', () => {
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
