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
      categorie: chaineNonVide('La catégorie est obligatoire'),
      thematique: chaineNonVide('La thématique est obligatoire'),
      description: chaineNonVide('La description est obligatoire').max(
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
        thematique: extracteurErreurZod(zodError, 'thematique'),
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
