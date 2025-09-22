export const categoriesDeJeux = ['jeu-carte', 'jeu-plateau', 'jeu-dessin', 'simulation', 'autre'] as const;
export type CategorieDeJeux = typeof categoriesDeJeux[number]
