import z from 'zod';
import type { Validateur } from '../validateur';
import type {
  ErreursValidationJeuEnEdition,
  InformationsGeneralesDuJeu,
  JeuEnEdition,
} from './jeu';

export class ValidateurInformationsGeneralesDuJeu
  implements Validateur<InformationsGeneralesDuJeu>
{
  schema: z.ZodObject;

  constructor() {
    const chaineNonVide = (messageErreur: string) => {
      return z.string(messageErreur).trim().min(1, messageErreur);
    };
    this.schema = z.object({
      sequence: chaineNonVide('Cette information est obligatoire'),
      nomEtablissement: chaineNonVide('Cette information est obligatoire'),
      discipline: chaineNonVide('Cette information est obligatoire'),
      classe: chaineNonVide('Cette information est obligatoire'),
      eleves: z
        .array(z.string())
        .refine(
          (prenoms) =>
            !!prenoms?.length && prenoms.some((prenom) => !!prenom.trim()),
          'Cette information est obligatoire',
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
        nomEtablissement: extracteurErreurZod(zodError, 'nomEtablissement'),
        sequence: extracteurErreurZod(zodError, 'sequence'),
        discipline: extracteurErreurZod(zodError, 'discipline'),
        classe: extracteurErreurZod(zodError, 'classe'),
        eleves: extracteurErreurZod(zodError, 'eleves'),
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
