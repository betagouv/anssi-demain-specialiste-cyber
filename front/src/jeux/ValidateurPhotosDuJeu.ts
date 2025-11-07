import z from 'zod';
import type {
  ErreursValidationJeuEnEdition,
  JeuEnEdition,
  PhotosDuJeu,
} from './jeuEnEdition.type';
import { extracteurErreursZod, type Validateur } from './validateur';

export class ValidateurPhotosDuJeu implements Validateur<PhotosDuJeu> {
  schema: z.ZodObject;

  constructor() {
    this.schema = z.object({
      photos: z.object(
        {
          couverture: z.instanceof(Blob, {
            error: 'Cette information est obligatoire',
          }),
        },
        { error: 'Cette information est obligatoire' },
      ),
    });
  }
  valide(jeu: JeuEnEdition): ErreursValidationJeuEnEdition {
    try {
      this.schema.parse(jeu);
      return {};
    } catch (e) {
      const zodError = e as z.ZodError;
      return extracteurErreursZod<PhotosDuJeu>(zodError.issues);
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
