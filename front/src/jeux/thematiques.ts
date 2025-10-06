export const thematiques = [
  {
    code: 'comportements-numeriques',
    libelle: 'Comportements numériques',
  },
  {
    code: 'cyberharcelement',
    libelle: 'Cyberharcelement',
  },
  {
    code: 'gestion-crise-cyber',
    libelle: 'Gestion de crise cyber',
  },
  {
    code: 'lutte-manipulation-information',
    libelle: "Lutte contre la manipulation de l'information",
  },
  { code: 'menace-cyber', libelle: 'Menace cyber' },
  { code: 'orientation', libelle: 'Orientation' },
  {
    code: 'techniques-securite-numerique',
    libelle: 'Techniques de sécurité numérique',
  },
  {
    code: 'valoriser-talents-feminins',
    libelle: 'Valoriser les talents féminins',
  },
];

export const libelleThematique = (code: string): string | undefined =>
  thematiques.find((c) => c.code === code)?.libelle;
