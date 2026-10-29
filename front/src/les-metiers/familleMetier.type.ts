export type Role = {
  nom: string;
  description: string;
};

export type Remuneration = {
  junior: number;
  senior: number;
};

export type LiensProfil = {
  illustration: string;
  dataemploi: string;
  metierscope: string;
  videos: string[];
};

export type Profil = {
  id: number;
  titre: string;
  fonction: string;
  description: string;
  missionPrincipale: string;
  postures: string[];
  formationsCibles: string[];
  preRequis: string[];
  remuneration: Remuneration;
  metiersProches: string[];
  liens: LiensProfil;
};

export type Temoignage = {
  nom: string;
  femme: boolean;
  lien: string;
};

export type Fonction = {
  nom: string;
  missionPrincipale: string;
  lien: string;
  témoignage: Temoignage;
};

export type RessourceAssociee = {
  id: number;
  titre: string;
  thematiques: string[];
  publicsCible: string[];
  niveaux: string[];
  types: string[];
  besoins: string[];
  description: string;
  urlIllustration: string;
  estCertifiee: boolean;
  lienExterne: string;
};

export type FamilleMetier = {
  code: string;
  titre: string;
  sousTitre: string;
  description: string;
  'rôles': Role[];
  profils: Profil[];
  fonctions: Fonction[];
  'ressourcesAssociées': RessourceAssociee[];
};

export type AccentDsfr =
  | 'yellow-moutarde'
  | 'green-emeraude'
  | 'blue-cumulus'
  | 'purple-glycine'
  | 'green-archipel';

const accentsParCode: Record<string, AccentDsfr> = {
  'Pilotage': 'yellow-moutarde',
  'Conception': 'green-emeraude',
  'Incidents et crises': 'blue-cumulus',
  'Conseil et recherche': 'purple-glycine',
  'Métiers connexes': 'green-archipel',
};

export function accentPourFamille(code: string): AccentDsfr {
  return accentsParCode[code] ?? 'blue-cumulus';
}
