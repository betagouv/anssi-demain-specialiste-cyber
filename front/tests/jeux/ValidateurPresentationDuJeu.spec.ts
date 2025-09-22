import { describe, expect, it } from 'vitest';
import { ValidateurPresentationDuJeu } from '../../src/jeux/ValidateurPresentationDuJeu';
import { type PresentationDuJeu } from '../../src/jeux/jeu';

describe('Le validateur des information générales de jeu', () => {
  const jeuValide: PresentationDuJeu = {
    nom: 'nom du jeu',
    categorie: 'MaCatégorie',
    thematique: 'MaThématique',
    description: 'mots'.repeat(2000),
  };
  const descriptionTropLongue = 'mots'.repeat(2001);
  const validateur = new ValidateurPresentationDuJeu();
  describe("vérifie que les données'", () => {
    it('est invalide lorsque son nom est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        nom: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('est invalide lorsque sa catégorie est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        categorie: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('est invalide lorsque sa thématique est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        thematique: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('est invalide lorsque sa description est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        description: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('est invalide lorsque sa description contient plus de 8000 characters', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        description: descriptionTropLongue,
      });
      expect(validation).toBeFalsy();
    });

    it('sont valides quand tous ses champs sont valides', () => {
      const validation = validateur.estValide(jeuValide);
      expect(validation).toBeTruthy();
    });
  });
  describe('permet de renvoyer spécifiquement une erreur', () => {
    it("'Le champ est obligatoire' lorsque qu'un champ obligatoire est vide", () => {
      const erreurs = validateur.valide({
        nom: '  ',
        categorie: '   ',
        thematique: '     ',
        description: '     ',
      });
      expect(erreurs).toEqual({
        nom: 'Le nom est obligatoire',
        categorie: 'La catégorie est obligatoire',
        thematique: 'La thématique est obligatoire',
        description: 'La description est obligatoire',
      });
    });

    it("'Le nom est obligatoire' lorsque le nom du jeu est vide", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        description: descriptionTropLongue,
      });
      expect(erreurs).toEqual({
        description:
          'La description ne peut contenir que 8000 caractères maximum',
      });
    });
  });
});
