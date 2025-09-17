export const classes = [
  'maternelle',
  'cp',
  'ce1',
  'ce2',
  'cm1',
  'cm2',
  '6e',
  '5e',
  '4e',
  '3e',
  'seconde',
  'premiere',
  'terminale',
  'classe-prepa',
  'bts',
  'superieur-hors-bts-et-prepa',
] as const;
export type Classe = (typeof classes)[number];
