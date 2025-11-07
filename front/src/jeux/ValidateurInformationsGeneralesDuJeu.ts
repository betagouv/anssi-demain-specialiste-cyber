import z from 'zod';
import { extracteurErreursZod, type Validateur } from './validateur';
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
      return extracteurErreursZod<InformationsGeneralesDuJeu>(zodError.issues);
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
