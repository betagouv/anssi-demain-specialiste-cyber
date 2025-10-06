const sequences = [
  { code: 'heure', libelle: 'Heure de cours' },
  { code: 'demi-journee', libelle: 'Demi-journée' },
  { code: 'journee', libelle: 'Journée' },
];

export const libelleSequence = (code: string): string | undefined =>
  sequences.find((c) => c.code === code)?.libelle;
