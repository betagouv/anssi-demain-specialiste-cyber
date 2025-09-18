import { describe, expect, it } from 'vitest';
import { type RessourceCyber } from '../../src/ressourceCyber';
import { get } from 'svelte/store';
import { rechercheParPublicCible } from '../../src/stores/rechercheParPublicCible.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';

describe('La recherche par public cible', () => {
  it('est vide quand on la réinitialise', () => {
    rechercheParPublicCible.set(['Parents']);

    rechercheParPublicCible.reinitialise();

    expect(get(rechercheParPublicCible)).toEqual([]);
  });

  describe('permet de filtrer les ressources Cyber', () => {
    const ressourceCyber: RessourceCyber = unConstructeurDeRessourceCyber()
      .avecPublicsCible(['Élèves'])
      .construis();

    it("en incluant une ressource si il n'y pas de filtre actif", () => {
      const resultat = rechercheParPublicCible.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });

    it('en rejetant une ressource dont le public cible ne correspond pas', () => {
      rechercheParPublicCible.set(['Enseignants']);

      const resultat = rechercheParPublicCible.ok(ressourceCyber);

      expect(resultat).toBeFalsy();
    });

    it('en incluant une ressource dont le public cible correspond', () => {
      rechercheParPublicCible.set(['Élèves']);

      const resultat = rechercheParPublicCible.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });
  });
});
