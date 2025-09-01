import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { RessourceCyber } from '../../src/ressourceCyber';
import { rechercheParThematique } from '../../src/stores/rechercheParThematique.store';

describe('La recherche par thématique', () => {
  it('est vide quand on la réinitialise', () => {
    rechercheParThematique.set('Thème 1');

    rechercheParThematique.reinitialise();

    expect(get(rechercheParThematique)).toEqual('');
  });

  describe('permet de filtrer les ressources Cyber', () => {
    const ressourceCyber: RessourceCyber = {
      id: 1,
      titre: 'Ressource 1',
      thematiques: ['Thème 1'],
    };

    it("en incluant une ressource si il n'y pas de filtre actif", () => {
      const resultat = rechercheParThematique.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });

    it('en rejetant une ressource dont la thématique ne correspond pas', () => {
      rechercheParThematique.set('Thème 2');

      const resultat = rechercheParThematique.ok(ressourceCyber);

      expect(resultat).toBeFalsy();
    });

    it('en incluant une ressource dont la thématique correspond', () => {
      rechercheParThematique.set('Thème 1');

      const resultat = rechercheParThematique.ok(ressourceCyber);

      expect(resultat).toBeTruthy();
    });
  });
});
