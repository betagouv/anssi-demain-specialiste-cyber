import z from 'zod';
import type { Validateur } from '../validateur';
import type {
  ErreursValidationJeuEnEdition,
  JeuEnEdition,
  PresentationDuJeu,
} from './jeu';

export class ValidateurPresentationDuJeu
  implements Validateur<PresentationDuJeu>
{
  schema: z.ZodObject;

  constructor() {
    const chaineNonVide = (messageErreur: string) => {
      return z.string(messageErreur).trim().min(1, messageErreur);
    };
    this.schema = z.object({
      nom: chaineNonVide('Le nom est obligatoire'),
    });
  }
  valide(jeu: JeuEnEdition): ErreursValidationJeuEnEdition {
    try {
      this.schema.parse(jeu);
      return {};
    } catch (e) {
      const zodError = e as z.ZodError;
      const extracteurErreurZod = (erreur: z.ZodError, nomDuChamp: string) => {
        return erreur.issues.find((issue) => issue.path[0] === nomDuChamp)
          ?.message;
      };
      return {
        nom: extracteurErreurZod(zodError, 'nom'),
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
