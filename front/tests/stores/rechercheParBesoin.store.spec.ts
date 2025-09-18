import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { type RessourceCyber } from '../../src/ressourceCyber';
import { unConstructeurDeRessourceCyber } from '../constructeurRessourceCyber';
import { rechercheParBesoin } from '../../src/stores/rechercheParBesoin.store';

describe('La recherche par besoin', () => {
  it('peut être modifié avec des besoins', () => {
    rechercheParBesoin.set('Se protéger des risques');

    expect(get(rechercheParBesoin)).toEqual('Se protéger des risques');
  });

  it('est vide quand on la réinitialise', () => {
    rechercheParBesoin.set('Se protéger des risques');

    rechercheParBesoin.reinitialise();

    expect(get(rechercheParBesoin)).toEqual('');
  });

  describe('permet de filtrer les ressources Cyber', () => {
    const ressourceCyber: RessourceCyber = unConstructeurDeRessourceCyber()
      .avecBesoins(['Se protéger des risques', 'Découvrir la cyber'])
      .construis();

    it("en incluant une ressource si il n'y pas de filtre actif", () => {
      const resultat = rechercheParBesoin.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });

    it('en rejetant une ressource dont le niveau ne correspond pas', () => {
      rechercheParBesoin.set('Découvrir les métiers');

      const resultat = rechercheParBesoin.ok(ressourceCyber);

      expect(resultat).toBeFalsy();
    });

    it('en incluant une ressource dont le niveau correspond', () => {
      rechercheParBesoin.set('Découvrir la cyber');

      const resultat = rechercheParBesoin.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });
  });
});
