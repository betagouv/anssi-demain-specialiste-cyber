export const classes = [
  { code: 'maternelle', libelle: 'Maternelle' },
  { code: 'cp', libelle: 'CP' },
  { code: 'ce1', libelle: 'CE1' },
  { code: 'ce2', libelle: 'CE2' },
  { code: 'cm1', libelle: 'CM1' },
  { code: 'cm2', libelle: 'CM2' },
  { code: '6e', libelle: '6e' },
  { code: '5e', libelle: '5e' },
  { code: '4e', libelle: '4e' },
  { code: '3e', libelle: '3e' },
  { code: 'seconde', libelle: 'Seconde' },
  { code: 'premiere', libelle: 'Première' },
  { code: 'terminale', libelle: 'Terminale' },
  { code: 'classe-prepa', libelle: 'Classe prépa' },
  { code: 'bts', libelle: 'BTS' },
  {
    code: 'superieur-hors-bts-et-prep',
    libelle: 'Supérieur (hors BTS et Prepa)',
  },
];

export const libelleClasse = (code: string): string | undefined =>
  classes.find((c) => c.code === code)?.libelle;
