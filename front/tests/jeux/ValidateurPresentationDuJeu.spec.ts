import { describe, expect, it } from 'vitest';
import type { Categorie, Thematique } from '../../src/jeu.type';
import { ValidateurPresentationDuJeu } from '../../src/jeux/ValidateurPresentationDuJeu';
import { type PresentationDuJeu } from '../../src/jeux/jeuEnEdition.type';

describe('Le validateur de la présentation du jeu', () => {
  const jeuValide: PresentationDuJeu = {
    nom: 'nom du jeu',
    categorie: 'autre',
    thematiques: ['orientation'],
    description: 'mots'.repeat(2000),
  };
  const descriptionTropLongue = 'mots'.repeat(2001);
  const validateur = new ValidateurPresentationDuJeu();
  describe("vérifie que les données'", () => {
    it('sont invalides lorsque son nom est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        nom: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('sont invalides lorsque sa catégorie est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        categorie: '  ' as unknown as Categorie,
      });
      expect(validation).toBeFalsy();
    });

    it("sont invalides lorsque sa thématique n'est pas définie", () => {
      const validation = validateur.estValide({
        ...jeuValide,
        thematiques: undefined,
      });
      expect(validation).toBeFalsy();
    });

    it('sont invalides lorsque sa thématique est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        thematiques: [],
      });
      expect(validation).toBeFalsy();
    });

    it('sont invalides lorsque sa description est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        description: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('sont invalides lorsque sa description contient plus de 8000 characters', () => {
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
        categorie: '   ' as unknown as Categorie,
        thematiques: ['     '] as unknown as Thematique[],
        description: '     ',
      });
      expect(erreurs).toEqual({
        nom: 'Cette information est obligatoire',
        categorie: 'Cette information est obligatoire',
        thematiques: 'Cette information est invalide',
        description: 'Cette information est obligatoire',
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
