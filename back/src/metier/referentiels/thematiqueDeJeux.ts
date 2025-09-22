export const thematiquesDeJeux = [
  'comportements-numeriques',
  'cyberharcelement',
  'gestion-crise-cyber',
  'lutte-manipulation-information',
  'menace-cyber',
  'orientation',
  'techniques-securite-numerique',
  'valoriser-talents-feminins',
] as const;
export type ThematiqueDeJeux = (typeof thematiquesDeJeux)[number];
