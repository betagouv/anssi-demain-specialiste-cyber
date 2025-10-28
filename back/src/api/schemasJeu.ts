import z from 'zod';
import { disciplines } from '../metier/referentiels/disciplines';
import { classes } from '../metier/referentiels/classes';
import { sequences } from '../metier/referentiels/sequence';
import { categoriesDeJeux } from '../metier/referentiels/categorieDeJeux';
import { thematiquesDeJeux } from '../metier/referentiels/thematiqueDeJeux';

const chaineNonVide = (message: string) =>
  z.string(message).trim().min(1, message);

const verifieNoteEvaluation = (message: string) =>
  z
    .number()
    .min(1, {
      error: message,
    })
    .max(5, {
      error: message,
    });

const nom = chaineNonVide('Le nom est obligatoire');
const nomEtablissement = chaineNonVide(
  'Le nom de l‘établissement est obligatoire',
);
const discipline = z.enum(disciplines, {
  error: 'La discipline est invalide',
});
const sequence = z.enum(sequences, { error: 'La séquence est invalide' });
const classe = z.enum(classes, {
  error: 'La classe est invalide',
});
const categorie = z.enum(categoriesDeJeux, {
  error: 'La catégorie est invalide',
});
const thematiques = z
  .array(
    z.enum(thematiquesDeJeux, {
      error: 'La thématique est invalide',
    }),
  )
  .nonempty('La thématique est invalide');
const description = chaineNonVide('La description est obligatoire').max(
  8000,
  'La description ne peut contenir que 8000 caractères maximum',
);
const eleves = z
  .array(chaineNonVide('Les prénoms fournis sont invalides'))
  .nonempty('Au moins un élève est requis');
const temoignages = z
  .array(
    z.strictObject({
      prenom: chaineNonVide('Le prénom est obligatoire dans un témoignage'),
      details: chaineNonVide(
        'Les détails sont obligatoires dans un témoignage',
      ).max(
        8000,
        'Les détails d‘un témoignage ne peuvent excéder 8000 caractères',
      ),
    }),
  )
  .optional();
const consentement = z.boolean('Le consentement est invalide').optional();

export const schemaCreationJeu = z.strictObject({
  nom,
  nomEtablissement,
  discipline,
  sequence,
  classe,
  categorie,
  thematiques,
  description,
  eleves,
  temoignages,
  consentement,
  evaluationDecouverte: verifieNoteEvaluation(
    'La note d‘évaluation pour la découverte doit être comprise entre 1 et 5',
  ),
  evaluationInteret: verifieNoteEvaluation(
    'La note d‘évaluation pour l‘intérêt doit être comprise entre 1 et 5',
  ),
  evaluationSatisfactionGenerale: verifieNoteEvaluation(
    'La note d‘évaluation pour la satisfaction générale doit être comprise entre 1 et 5',
  ),
  precisions: z
    .string()
    .trim()
    .nonempty('Les précisions ne peuvent pas être vides')
    .optional(),
});

export const schemaModificationJeu = z.strictObject({
  nom: nom.optional(),
  nomEtablissement: nomEtablissement.optional(),
  discipline: discipline.optional(),
  sequence: sequence.optional(),
  classe: classe.optional(),
  categorie: categorie.optional(),
  thematiques: thematiques.optional(),
  description: description.optional(),
  eleves: eleves.optional(),
  temoignages,
  consentement,
  estCache: z.boolean().optional(),
});
