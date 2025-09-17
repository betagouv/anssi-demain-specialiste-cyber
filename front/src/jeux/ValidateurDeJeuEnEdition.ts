import z from 'zod';
import type { Validateur } from '../validateur';
import type { JeuEnEdition } from './jeu';

export type ErreursValidationJeuEnEdition = Partial<
  Record<keyof JeuEnEdition, string>
>;

export class ValidateurDeJeuEnEdition implements Validateur<JeuEnEdition> {
  schema: z.ZodObject;

  constructor() {
    const chaineNonVide = (messageErreur: string) => {
      return z.string(messageErreur).trim().min(1, messageErreur);
    };
    this.schema = z.object({
      nom: chaineNonVide('Le nom est obligatoire'),
      sequence: chaineNonVide('La séquence est obligatoire'),
      nomEtablissement: chaineNonVide(
        "Le nom de l'établissement est obligatoire",
      ),
      discipline: chaineNonVide('La discipline est obligatoire'),
      classe: chaineNonVide('La classe est obligatoire'),
    });
  }
  valide(jeu: JeuEnEdition): ErreursValidationJeuEnEdition {
    try {
      this.schema.parse(jeu);
      return {
        nom: undefined,
        nomEtablissement: undefined,
        sequence: undefined,
        discipline: undefined,
        classe: undefined,
      };
    } catch (e) {
      const zodError = e as z.ZodError;
      const extracteurErreurZod = (erreur: z.ZodError, nomDuChamp: string) => {
        return erreur.issues.find((issue) => issue.path[0] === nomDuChamp)
          ?.message;
      };
      return {
        nom: extracteurErreurZod(zodError, 'nom'),
        nomEtablissement: extracteurErreurZod(zodError, 'nomEtablissement'),
        sequence: extracteurErreurZod(zodError, 'sequence'),
        discipline: extracteurErreurZod(zodError, 'discipline'),
        classe: extracteurErreurZod(zodError, 'classe'),
      };
    }
  }

  estValide(jeu: JeuEnEdition): boolean {
    try {
      this.schema.parse(jeu);
      return true;
    } catch {
      return false;
    }
  }
}
