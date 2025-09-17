import { describe, expect, it } from 'vitest';
import { ValidateurDeJeuEnEdition } from '../../src/jeux/ValidateurDeJeuEnEdition';
import { Jeu } from '../../src/jeux/jeu';

describe('Le validateur de jeu', () => {
  const jeuValide: Jeu = {
    nom: 'nom du jeu',
    sequence: 'heure',
    nomEtablissement: "nom de l'établissement",
  };
  const validateur = new ValidateurDeJeuEnEdition();
  describe("vérifie qu'un jeu'", () => {
    it('est invalide lorsque son nom est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        nom: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('est invalide lorsque sa sequence est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        sequence: '   ',
      });
      expect(validation).toBeFalsy();
    });

    it("est invalide lorsque son nom d'établissement est vide", () => {
      const validation = validateur.estValide({
        ...jeuValide,
        nomEtablissement: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('est valide quand tous ses champs sont valides', () => {
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

    it("'Le nom de l'établissement est obligatoire' lorsque le nom de l'établissement est vide", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        nomEtablissement: '   ',
      });
      expect(erreurs).toEqual({
        nomEtablissement: "Le nom de l'établissement est obligatoire",
      });
    });

    it("'La séquence est obligatoire' lorsque la séquence est vide", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        sequence: '   ',
      });
      expect(erreurs).toEqual({
        sequence: 'La séquence est obligatoire',
      });
    });
  });
});
