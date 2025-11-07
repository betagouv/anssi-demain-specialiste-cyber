import { describe, expect, it } from 'vitest';
import { ValidateurInformationsGeneralesDuJeu } from '../../src/jeux/ValidateurInformationsGeneralesDuJeu';
import { type JeuEnEdition } from '../../src/jeux/jeuEnEdition.type';

describe('Le validateur des informations générales de jeu', () => {
  const jeuValide: JeuEnEdition = {
    sequence: 'heure',
    nomEtablissement: "nom de l'établissement",
    discipline: 'Français',
    classe: 'terminale',
    eleves: ['René', '   '],
  };
  const validateur = new ValidateurInformationsGeneralesDuJeu();
  describe("vérifie que les données'", () => {
    it('sont invalides lorsque sa sequence est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        sequence: '   ',
      });
      expect(validation).toBeFalsy();
    });

    it("sont invalides lorsque son nom d'établissement est vide", () => {
      const validation = validateur.estValide({
        ...jeuValide,
        nomEtablissement: '  ',
      });
      expect(validation).toBeFalsy();
    });

    it('sont invalides lorsque sa discipline est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        discipline: '   ',
      });
      expect(validation).toBeFalsy();
    });

    it('sont invalides lorsque sa classe est vide', () => {
      const validation = validateur.estValide({
        ...jeuValide,
        classe: '   ',
      });
      expect(validation).toBeFalsy();
    });

    it("est invalide lorsqu'il n'y a aucun élève", () => {
      const validation = validateur.estValide({
        ...jeuValide,
        eleves: [],
      });
      expect(validation).toBeFalsy();
    });

    it('sont valides quand tous ses champs sont valides', () => {
      const validation = validateur.estValide(jeuValide);
      expect(validation).toBeTruthy();
    });
  });
  describe('permet de renvoyer spécifiquement une erreur', () => {
    it("'Cette information est obligatoire' lorsque le nom de l'établissement est vide", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        nomEtablissement: '   ',
      });
      expect(erreurs).toEqual({
        nomEtablissement: 'Cette information est obligatoire',
      });
    });

    it("'Cette information est obligatoire' lorsque la séquence est vide", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        sequence: '   ',
      });
      expect(erreurs).toEqual({
        sequence: 'Cette information est obligatoire',
      });
    });

    it("'Cette information est obligatoire' lorsque la discipline est vide", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        discipline: '   ',
      });
      expect(erreurs).toEqual({
        discipline: 'Cette information est obligatoire',
      });
    });

    it("'Cette information est obligatoire' lorsque la discipline est vide", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        classe: '   ',
      });
      expect(erreurs).toEqual({
        classe: 'Cette information est obligatoire',
      });
    });

    it("'Cette information est obligatoire' lorsqu'il n'y a aucun élève", () => {
      const erreurs = validateur.valide({
        ...jeuValide,
        eleves: ['   '],
      });
      expect(erreurs).toEqual({
        eleves: 'Cette information est obligatoire',
      });
    });
  });
});
