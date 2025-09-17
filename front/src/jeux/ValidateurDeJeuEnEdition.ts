import z from 'zod';
import type { Validateur } from '../validateur';
import type { JeuEnEdition } from './jeu';

export type ErreursValidationJeuEnEdition = Partial<
  Record<keyof JeuEnEdition, string>
>;

export class ValidateurDeJeuEnEdition implements Validateur<JeuEnEdition> {
  schema: z.ZodObject;

  constructor() {
    this.schema = z.object({
      nom: z
        .string('Le nom est obligatoire')
        .trim()
        .min(1, 'Le nom est obligatoire'),
      sequence: z
        .string('La séquence est obligatoire')
        .trim()
        .min(1, 'La séquence est obligatoire'),
      nomEtablissement: z
        .string("Le nom de l'établissement est obligatoire")
        .trim()
        .min(1, "Le nom de l'établissement est obligatoire"),
    });
  }

  valide(jeu: JeuEnEdition): Record<keyof JeuEnEdition, string | undefined> {
    try {
      this.schema.parse(jeu);
      return {
        nom: undefined,
        nomEtablissement: undefined,
        sequence: undefined,
      };
    } catch (e) {
      const zodError = e as z.ZodError;
      return {
        nom: zodError.issues.find((issue) => issue.path[0] === 'nom')?.message,
        nomEtablissement: zodError.issues.find(
          (issue) => issue.path[0] === 'nomEtablissement',
        )?.message,
        sequence: zodError.issues.find((issue) => issue.path[0] === 'sequence')
          ?.message,
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
