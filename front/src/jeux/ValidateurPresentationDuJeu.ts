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
      nom: chaineNonVide('Cette information est obligatoire'),
      categorie: chaineNonVide('Cette information est obligatoire'),
      thematiques: z
        .array(chaineNonVide('Cette information est invalide'))
        .nonempty('Cette information est obligatoire'),
      description: chaineNonVide('Cette information est obligatoire').max(
        8000,
        'La description ne peut contenir que 8000 caractères maximum',
      ),
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
        categorie: extracteurErreurZod(zodError, 'categorie'),
        thematiques: extracteurErreurZod(zodError, 'thematiques'),
        description: extracteurErreurZod(zodError, 'description'),
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
