import { describe, expect, it } from 'vitest';
import {
  lesSelectionsDesRessourcesCyber,
  lesThematiquesCyber,
} from '../src/ressourceCyber';
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

  it('sort la liste des sélections', () => {
    const selections = lesSelectionsDesRessourcesCyber([
      unConstructeurDeRessourceCyber()
        .avecSelections(['Parents', 'Enseignants'])
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecSelections(['Enseignants', 'Élèves'])
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecSelections(['Parents', 'Élèves'])
        .construis(),
    ]);

    expect(selections).toStrictEqual(['Élèves', 'Enseignants', 'Parents']);
  });
});
