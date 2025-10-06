export const disciplines = [
  { code: 'francais', libelle: 'Français' },
  { code: 'langues-vivantes', libelle: 'Langues vivantes' },
  { code: 'arts-plastiques', libelle: 'Arts plastiques' },
  { code: 'education-musicale', libelle: 'Éducation musicale' },
  { code: 'histoire-des-arts', libelle: 'Histoire des arts' },
  {
    code: 'education-physique-et-sportive',
    libelle: 'Éducation physique et sportive',
  },
  {
    code: 'enseignement-moral-et-civique',
    libelle: 'Enseignement moral et civique',
  },
  {
    code: 'histoire-et-geographie',
    libelle: 'Histoire et géographie',
  },
  {
    code: 'sciences-et-technologie',
    libelle: 'Sciences et technologie',
  },
  { code: 'mathematiques', libelle: 'Mathématiques' },
  { code: 'physique-chimie', libelle: 'Physique-chimie' },
  { code: 'svt', libelle: 'Sciences de la vie et de la Terre' },
  { code: 'technologie', libelle: 'Technologie' },
  {
    code: 'education-médias-information',
    libelle: "Éducation aux médias et à l'information",
  },
  {
    code: 'sciences-economiques-sociales',
    libelle: 'Sciences économiques et sociales',
  },
  {
    code: 'sciences-numériques-technologie',
    libelle: 'Sciences numériques et technologie',
  },
  { code: 'enseignement-scientifique', libelle: 'Enseignement scientifique' },
  { code: 'post-bac', libelle: 'Post Bac' },
  { code: 'autre', libelle: 'Autre' },
];

export const libelleDiscipline = (code: string): string | undefined =>
  disciplines.find((c) => c.code === code)?.libelle;
