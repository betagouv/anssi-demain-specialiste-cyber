import { describe, expect, it } from 'vitest';
import { ValidateurPresentationDuJeu } from '../../src/jeux/ValidateurPresentationDuJeu';
import { PresentationDuJeu } from '../../src/jeux/jeu';

describe('Le validateur des information générales de jeu', () => {
  const jeuValide: PresentationDuJeu = {
    nom: 'nom du jeu',
  };
  const validateur = new ValidateurPresentationDuJeu();
  describe("vérifie que les données'", () => {
    it('est invalide lorsque son nom est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        nom: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('sont valides quand tous ses champs sont valides', () => {
      const validation = validateur.estValide(jeuValide);
      expect(validation).toBeTruthy();
    });
  });
  describe('permet de renvoyer spécifiquement une erreur', () => {
    it("'Le nom est obligatoire' lorsque le nom du jeu est vide", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        nom: '  ',
      });
      expect(erreurs).toEqual({
        nom: 'Le nom est obligatoire',
      });
    });
  });
});
