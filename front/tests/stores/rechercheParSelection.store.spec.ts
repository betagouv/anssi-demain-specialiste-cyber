import { describe, expect, it } from 'vitest';
import { RessourceCyber } from '../../src/ressourceCyber';
import { get } from 'svelte/store';
import { rechercheParSelection } from '../../src/stores/rechercheParSelection.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';

describe('La recherche par sélection', () => {
  it('est vide quand on la réinitialise', () => {
    rechercheParSelection.set(['Sélection 1']);

    rechercheParSelection.reinitialise();

    expect(get(rechercheParSelection)).toEqual([]);
  });

  describe('permet de filtrer les ressources Cyber', () => {
    const ressourceCyber: RessourceCyber = unConstructeurDeRessourceCyber()
      .avecSelections(['Élèves'])
      .construis();

    it("en incluant une ressource si il n'y pas de filtre actif", () => {
      const resultat = rechercheParSelection.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });

    it('en rejetant une ressource dont la sélection ne correspond pas', () => {
      rechercheParSelection.set(['Enseignants']);

      const resultat = rechercheParSelection.ok(ressourceCyber);

      expect(resultat).toBeFalsy();
    });

    it('en incluant une ressource dont la sélection correspond', () => {
      rechercheParSelection.set(['Élèves']);

      const resultat = rechercheParSelection.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });
  });
});
