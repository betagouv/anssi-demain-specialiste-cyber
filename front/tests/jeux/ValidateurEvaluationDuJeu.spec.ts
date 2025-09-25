import { describe, expect, it } from 'vitest';
import { type EvaluationDuJeu } from '../../src/jeux/jeu';
import { ValidateurEvaluationDuJeu } from '../../src/jeux/ValidateurEvaluationDuJeu';

describe("Le validateur de l'évaluation du jeu", () => {
  const jeuValide: EvaluationDuJeu = {
    evaluationDecouverte: 1,
    evaluationInteret: 3,
    evaluationSatisfactionGenerale: 5,
    precisions: 'phrase 20 caractères'.repeat(400),
  };
  const precisionsTropLongues = 'phrase 20 caractères'.repeat(401);
  const validateur = new ValidateurEvaluationDuJeu();
  describe("vérifie que les données'", () => {
    it("sont invalides lorsque l'évaluation sur la découverte est vide", () => {
      const validation = validateur.estValide({
        ...jeuValide,
        evaluationDecouverte: undefined,
      });
      expect(validation).toBeFalsy();
    });

    it("sont invalides lorsque l'évaluation sur la l'interêt est vide", () => {
      const validation = validateur.estValide({
        ...jeuValide,
        evaluationInteret: undefined,
      });
      expect(validation).toBeFalsy();
    });

    it("sont invalides lorsque l'évaluation sur la satisfaction générale est vide", () => {
      const validation = validateur.estValide({
        ...jeuValide,
        evaluationSatisfactionGenerale: undefined,
      });
      expect(validation).toBeFalsy();
    });

    it('sont invalides lorsque la précisions dépasse les 8000 caractères', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        precisions: precisionsTropLongues,
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
      const erreurs = validateur.valide({});
      expect(erreurs).toEqual({
        evaluationDecouverte: 'Cette information est obligatoire',
        evaluationInteret: 'Cette information est obligatoire',
        evaluationSatisfactionGenerale: 'Cette information est obligatoire',
      });
    });

    it("'La précision ne peut contenir que 8000 caractères maximum' lorsque que la précisions dépasse 8000 caractères", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        precisions: precisionsTropLongues,
      });
      expect(erreurs).toEqual({
        precisions: 'La précision ne peut contenir que 8000 caractères maximum',
      });
    });
  });
});
