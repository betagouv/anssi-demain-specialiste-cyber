import { get } from 'svelte/store';
import { beforeAll, describe, expect, it } from 'vitest';
import { RessourceCyber } from '../../src/ressourceCyber';
import { rechercheParNiveau } from '../../src/stores/rechercheParNiveau.store';
import { rechercheParSelection } from '../../src/stores/rechercheParSelection.store';
import { ressourcesCyberStore } from '../../src/stores/ressourcesCyber.store';
import { ressourcesCyberFiltrees } from '../../src/stores/ressourcesCyberFiltrees.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';

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
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecThematiques(['Comportements numériques', 'Orientation'])
        .avecSelections(['Parents', 'Élèves'])
        .avecNiveaux(['Cycle 1', 'Cycle 3'])
        .construis(),
    ]);
  });

  it('retourne la liste dédupliquée des thématiques existants', () => {
    const thematiquesAttendues = [
      'Comportements numériques',
      'Orientation',
      'Techniques de sécurité numérique',
      'Valoriser les talents féminins',
    ];

    const resultat = get(ressourcesCyberFiltrees).thematiques;

    expect(resultat).toEqual(thematiquesAttendues);
  });

  it('retourne la liste dédupliquée des sélections existants', () => {
    const selectionsAttendues = ['Élèves', 'Enseignants', 'Parents'];

    const resultat = get(ressourcesCyberFiltrees).selections;

    expect(resultat).toEqual(selectionsAttendues);
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
    const niveauxAttendus = ['Cycle 1', 'Cycle 2', 'Cycle 3'];

    const resultat = get(ressourcesCyberFiltrees).niveaux;

    expect(resultat).toEqual(niveauxAttendus);
  });
});
