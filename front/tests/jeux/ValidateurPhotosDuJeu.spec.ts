import { describe, expect, it } from 'vitest';
import { type PhotosDuJeu } from '../../src/jeux/jeuEnEdition.type';
import { ValidateurPhotosDuJeu } from '../../src/jeux/ValidateurPhotosDuJeu';

describe('Le validateur des photos du jeu', () => {
  const photosDeJeuValides: PhotosDuJeu = {
    photos: {
      couverture: new File(['contenu'], 'courverture.jpeg'),
      photos: [],
    },
  };

  const validateur = new ValidateurPhotosDuJeu();

  describe("vérifie que les données'", () => {
    it("sont invalides lorsqu'il n'y a pas de couverture", () => {
      const validation = validateur.estValide({
        photos: {},
      });
      expect(validation).toBeFalsy();
    });

    it('sont valides quand tous ses champs sont valides', () => {
      const validation = validateur.estValide(photosDeJeuValides);
      expect(validation).toBeTruthy();
    });
  });

  describe('permet de renvoyer spécifiquement une erreur', () => {
    it("'Le champ est obligatoire' lorsque qu'un champ obligatoire est vide", () => {
      const erreurs = validateur.valide({ photos: {} });
      expect(erreurs).toEqual({
        photos: 'Cette information est obligatoire',
      });
    });

    it("'Le champ est obligatoire' lorsque qu'un champ obligatoire est vide", () => {
      const erreurs = validateur.valide({});
      expect(erreurs).toEqual({
        photos: 'Cette information est obligatoire',
      });
    });
  });
});
