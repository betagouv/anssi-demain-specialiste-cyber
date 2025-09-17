export const disciplines = [
  'francais',
  'langues-vivantes',
  'arts-plastiques',
  'education-musicale',
  'histoire-des-arts',
  'education-physique-et-sportive',
  'enseignement-moral-et-civique',
  'histoire-et-geographie',
  'sciences-et-technologie',
  'mathematiques',
] as const;
export type Discipline = (typeof disciplines)[number];
