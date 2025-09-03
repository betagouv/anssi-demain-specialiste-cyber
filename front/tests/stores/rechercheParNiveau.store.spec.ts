import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { RessourceCyber } from '../../src/ressourceCyber';
import { rechercheParNiveau } from '../../src/stores/rechercheParNiveau.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';

describe('La recherche par sélection', () => {
  it('peut être modifié avec des niveaux', () => {
    rechercheParNiveau.set(['Cycle 3']);

    expect(get(rechercheParNiveau)).toEqual(['Cycle 3']);
  });

  it('est vide quand on la réinitialise', () => {
    rechercheParNiveau.set(['Cycle 3']);

    rechercheParNiveau.reinitialise();

    expect(get(rechercheParNiveau)).toEqual([]);
  });

  describe('permet de filtrer les ressources Cyber', () => {
    const ressourceCyber: RessourceCyber = unConstructeurDeRessourceCyber()
      .avecNiveaux(['Cycle 2'])
      .construis();

    it("en incluant une ressource si il n'y pas de filtre actif", () => {
      const resultat = rechercheParNiveau.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });

    it('en rejetant une ressource dont le niveau ne correspond pas', () => {
      rechercheParNiveau.set(['Cycle 3']);

      const resultat = rechercheParNiveau.ok(ressourceCyber);

      expect(resultat).toBeFalsy();
    });

    it('en incluant une ressource dont le niveau correspond', () => {
      rechercheParNiveau.set(['Cycle 2']);

      const resultat = rechercheParNiveau.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });
  });
});
