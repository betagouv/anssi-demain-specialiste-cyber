import { get } from 'svelte/store';
import { beforeEach, describe, expect, it } from 'vitest';
import { type RessourceCyber } from '../../../src/catalogue/ressourceCyber';
import { rechercheParBesoin } from '../../../src/catalogue/stores/rechercheParBesoin.store';
import { rechercheParNiveau } from '../../../src/catalogue/stores/rechercheParNiveau.store';
import { rechercheParPublicCible } from '../../../src/catalogue/stores/rechercheParPublicCible.store';
import { rechercheParThematique } from '../../../src/catalogue/stores/rechercheParThematique.store';
import { rechercheParType } from '../../../src/catalogue/stores/rechercheParType.store';
import { rechercheTextuelle } from '../../../src/catalogue/stores/rechercheTextuelle.store';
import { ressourcesCyberStore } from '../../../src/catalogue/stores/ressourcesCyber.store';
import { ressourcesCyberFiltrees } from '../../../src/catalogue/stores/ressourcesCyberFiltrees.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';

describe('Le store qui contient la liste des ressources Cyber', () => {
  beforeEach(() => {
    rechercheParBesoin.reinitialise();
    rechercheParNiveau.reinitialise();
    rechercheParType.reinitialise();
    rechercheParPublicCible.reinitialise();
    rechercheParThematique.reinitialise();

    ressourcesCyberStore.initialise([
      unConstructeurDeRessourceCyber()
        .avecTitre('Sécurité numérique')
        .avecDescription('Former à la cybersécurité par le jeu')
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
        .avecTitre('Comportements numériques')
        .avecDescription('Découvrir la cyber en famille')
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

  describe('sur recherche textuelle', () => {
    it('effectue le filtre sur le titre complet', () => {
      rechercheTextuelle.set('Sécurité numérique');

      const { resultat } = get(ressourcesCyberFiltrees);

      expect(resultat).toHaveLength(1);
      expect(resultat[0].titre).toBe('Sécurité numérique');
    });

    it('effectue le filtre sur le titre partiellement', () => {
      rechercheTextuelle.set('portements');

      const { resultat } = get(ressourcesCyberFiltrees);

      expect(resultat).toHaveLength(1);
      expect(resultat[0].titre).toBe('Comportements numériques');
    });

    it('effectue le filtre sur le titre insensible à la casse', () => {
      rechercheTextuelle.set('PoRtEmEnTs');

      const { resultat } = get(ressourcesCyberFiltrees);

      expect(resultat).toHaveLength(1);
      expect(resultat[0].titre).toBe('Comportements numériques');
    });

    it('effectue le filtre sur le titre sans tenir compte des accents', () => {
      rechercheTextuelle.set('Securite numerique');

      const { resultat } = get(ressourcesCyberFiltrees);

      expect(resultat).toHaveLength(1);
      expect(resultat[0].titre).toBe('Sécurité numérique');
    });

    it('effectue le filtre sur la description partiellement', () => {
      rechercheTextuelle.set('fami');

      const { resultat } = get(ressourcesCyberFiltrees);

      expect(resultat).toHaveLength(1);
      expect(resultat[0].description).toBe('Découvrir la cyber en famille');
    });
  });
});
