import z from 'zod';
import type {
  ErreursValidationJeuEnEdition,
  EvaluationDuJeu,
  JeuEnEdition,
} from './jeuEnEdition.type';
import { extracteurErreursZod, type Validateur } from './validateur';

export class ValidateurEvaluationDuJeu implements Validateur<EvaluationDuJeu> {
  schema: z.ZodObject;

  constructor() {
    this.schema = z.object({
      evaluationDecouverte: z.number('Cette information est obligatoire'),
      evaluationInteret: z.number('Cette information est obligatoire'),
      evaluationSatisfactionGenerale: z.number(
        'Cette information est obligatoire',
      ),
      precisions: z
        .string()
        .max(8000, 'La précision ne peut contenir que 8000 caractères maximum')
        .optional(),
    });
  }
  valide(jeu: JeuEnEdition): ErreursValidationJeuEnEdition {
    try {
      this.schema.parse(jeu);
      return {};
    } catch (e) {
      const zodError = e as z.ZodError;
      return extracteurErreursZod<EvaluationDuJeu>(zodError.issues);
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
