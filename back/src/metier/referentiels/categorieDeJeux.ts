export const categoriesDeJeux = [
  'jeu-carte',
  'jeu-plateau',
  'jeu-role',
  'jeu-dessin',
  'simulation',
  'autre',
] as const;
export type CategorieDeJeux = (typeof categoriesDeJeux)[number];
