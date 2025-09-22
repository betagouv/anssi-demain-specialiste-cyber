export const categoriesDeJeux = [
  'jeu-carte',
  'jeu-plateau-role',
  'jeu-dessin',
  'simulation',
  'autre',
] as const;
export type CategorieDeJeux = (typeof categoriesDeJeux)[number];
