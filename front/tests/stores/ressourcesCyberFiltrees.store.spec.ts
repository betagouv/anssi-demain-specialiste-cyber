import { get } from 'svelte/store';
import { beforeAll, describe, expect, it } from 'vitest';
import { RessourceCyber } from '../../src/ressourceCyber';
import { rechercheParNiveau } from '../../src/stores/rechercheParNiveau.store';
import { rechercheParSelection } from '../../src/stores/rechercheParSelection.store';
import { ressourcesCyberStore } from '../../src/stores/ressourcesCyber.store';
import { ressourcesCyberFiltrees } from '../../src/stores/ressourcesCyberFiltrees.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';
import { rechercheParType } from '../../src/stores/rechercheParType.store';

describe('Le store qui contient la liste des ressources Cyber', () => {
  beforeAll(() => {
    ressourcesCyberStore.initialise([
      unConstructeurDeRessourceCyber()
        .avecThematiques([
          'Techniques de sécurité numérique',
          'Valoriser les talents féminins',
          'Orientation',
        ])
        .avecSelections(['Élèves', 'Enseignants'])
        .avecNiveaux(['Cycle 1', 'Cycle 2'])
        .avecTypes(['Jeux', 'Formation'])
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecThematiques(['Comportements numériques', 'Orientation'])
        .avecSelections(['Parents', 'Élèves'])
        .avecNiveaux(['Cycle 1', 'Cycle 3'])
        .avecTypes(['Formation', 'Challenge'])
        .construis(),
    ]);
  });

  it('retourne la liste dédupliquée des thématiques existants', () => {
    const resultat = get(ressourcesCyberFiltrees).thematiques;

    expect(resultat).toEqual([
      'Comportements numériques',
      'Orientation',
      'Techniques de sécurité numérique',
      'Valoriser les talents féminins',
    ]);
  });

  it('retourne la liste dédupliquée des sélections existants', () => {
    const resultat = get(ressourcesCyberFiltrees).selections;

    expect(resultat).toEqual(['Élèves', 'Enseignants', 'Parents']);
  });

  it('effectue le filtre en fonction de la sélection', () => {
    rechercheParSelection.set(['Enseignants']);

    const { resultat } = get(ressourcesCyberFiltrees);

    expect(resultat).toStrictEqual<RessourceCyber[]>([
      get(ressourcesCyberStore)[0],
    ]);
  });

  it('effectue le filtre en fonction du niveau', () => {
    rechercheParNiveau.set(['Cycle 2']);

    const { resultat } = get(ressourcesCyberFiltrees);

    expect(resultat).toStrictEqual<RessourceCyber[]>([
      get(ressourcesCyberStore)[0],
    ]);
  });

  it('retourne la liste dédupliquée des niveaux existants', () => {
    const resultat = get(ressourcesCyberFiltrees).niveaux;

    expect(resultat).toEqual(['Cycle 1', 'Cycle 2', 'Cycle 3']);
  });

  it('effectue le filtre en fonction du type', () => {
    rechercheParType.set(['Jeux']);

    const { resultat } = get(ressourcesCyberFiltrees);

    expect(resultat).toStrictEqual<RessourceCyber[]>([
      get(ressourcesCyberStore)[0],
    ]);
  });

  it('retourne la liste dédupliquée des types existants', () => {
    const resultat = get(ressourcesCyberFiltrees).types;

    expect(resultat).toEqual(['Challenge',  'Formation', 'Jeux']);
  });
});
