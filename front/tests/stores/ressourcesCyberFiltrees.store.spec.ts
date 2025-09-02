import { get } from 'svelte/store';
import { beforeAll, describe, expect, it } from 'vitest';
import { ressourcesCyberStore } from '../../src/stores/ressourcesCyber.store';
import { ressourcesCyberFiltrees } from '../../src/stores/ressourcesCyberFiltrees.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';
import { RessourceCyber } from '../../src/ressourceCyber';
import { rechercheParSelection } from '../../src/stores/rechercheParSelection.store';

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
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecThematiques(['Comportements numériques', 'Orientation'])
        .avecSelections(['Parents', 'Élèves'])
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
});
