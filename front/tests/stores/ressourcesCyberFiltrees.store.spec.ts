import { get } from 'svelte/store';
import { beforeEach, describe, expect, it } from 'vitest';
import { RessourceCyber } from '../../src/ressourceCyber';
import { rechercheParNiveau } from '../../src/stores/rechercheParNiveau.store';
import { rechercheParPublicCible } from '../../src/stores/rechercheParPublicCible.store';
import { ressourcesCyberStore } from '../../src/stores/ressourcesCyber.store';
import { ressourcesCyberFiltrees } from '../../src/stores/ressourcesCyberFiltrees.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';
import { rechercheParType } from '../../src/stores/rechercheParType.store';
import { rechercheParBesoin } from '../../src/stores/rechercheParBesoin.store';
import { rechercheParThematique } from '../../src/stores/rechercheParThematique.store';

describe('Le store qui contient la liste des ressources Cyber', () => {
  beforeEach(() => {
    rechercheParBesoin.reinitialise();
    rechercheParNiveau.reinitialise();
    rechercheParType.reinitialise();
    rechercheParPublicCible.reinitialise();
    rechercheParThematique.reinitialise();

    ressourcesCyberStore.initialise([
      unConstructeurDeRessourceCyber()
        .avecThematiques([
          'Techniques de sécurité numérique',
          'Valoriser les talents féminins',
          'Orientation',
        ])
        .avecPublicsCible(['Élèves', 'Enseignants'])
        .avecNiveaux(['Cycle 1', 'Cycle 2'])
        .avecTypes(['Jeux', 'Formation'])
        .avecBesoins(['Découvrir les métiers', 'Découvrir la cyber'])
        .construis(),
      unConstructeurDeRessourceCyber()
        .avecThematiques(['Comportements numériques', 'Orientation'])
        .avecPublicsCible(['Parents', 'Élèves'])
        .avecNiveaux(['Cycle 1', 'Cycle 3'])
        .avecTypes(['Formation', 'Challenge'])
        .avecBesoins(['Découvrir la cyber'])
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

  it('retourne la liste dédupliquée des publics cible existants', () => {
    const resultat = get(ressourcesCyberFiltrees).publicsCible;

    expect(resultat).toEqual(['Élèves', 'Enseignants', 'Parents']);
  });

  it('effectue le filtre en fonction du public cible', () => {
    rechercheParPublicCible.set(['Enseignants']);

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

    expect(resultat).toEqual(['Challenge', 'Formation', 'Jeux']);
  });

  it('effectue le filtre en fonction du besoin', () => {
    rechercheParBesoin.set('Découvrir les métiers');

    const { resultat } = get(ressourcesCyberFiltrees);

    expect(resultat).toStrictEqual<RessourceCyber[]>([
      get(ressourcesCyberStore)[0],
    ]);
  });
});
