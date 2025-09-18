import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { type RessourceCyber } from '../../../src/catalogue/ressourceCyber';
import { rechercheParType } from '../../../src/catalogue/stores/rechercheParType.store';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';

describe('La recherche par type', () => {
  it('peut être modifié avec des types', () => {
    rechercheParType.set(['Jeux']);

    expect(get(rechercheParType)).toEqual(['Jeux']);
  });

  it('est vide quand on la réinitialise', () => {
    rechercheParType.set(['Jeux']);

    rechercheParType.reinitialise();

    expect(get(rechercheParType)).toEqual([]);
  });

  describe('permet de filtrer les ressources Cyber', () => {
    const ressourceCyber: RessourceCyber = unConstructeurDeRessourceCyber()
      .avecTypes(['Jeux'])
      .construis();

    it("en incluant une ressource si il n'y pas de filtre actif", () => {
      const resultat = rechercheParType.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });

    it('en rejetant une ressource dont le niveau ne correspond pas', () => {
      rechercheParType.set(['Challenge']);

      const resultat = rechercheParType.ok(ressourceCyber);

      expect(resultat).toBeFalsy();
    });

    it('en incluant une ressource dont le niveau correspond', () => {
      rechercheParType.set(['Jeux']);

      const resultat = rechercheParType.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });
  });
});
