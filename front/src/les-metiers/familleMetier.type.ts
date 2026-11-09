import type { RessourceCyber } from '../catalogue/ressourceCyber';
import type { Metier } from '../metiers/metiers';
import type { FonctionMetier } from './fonctionMetier.type';

export type Role = {
  nom: string;
  description: string;
};

export type FamilleMetier = {
  code: string;
  titre: string;
  sousTitre: string;
  description: string;
  rôles: Role[];
  profils: Metier[];
  fonctions: FonctionMetier[];
  ressourcesAssociées: RessourceCyber[];
};

export type AccentDsfr = 'yellow-moutarde' | 'green-emeraude' | 'blue-cumulus' | 'purple-glycine' | 'green-archipel';

const accentsParCode: Record<string, AccentDsfr> = {
  Pilotage: 'yellow-moutarde',
  Conception: 'green-emeraude',
  'Incidents et crises': 'blue-cumulus',
  'Conseil et recherche': 'purple-glycine',
  'Métiers connexes': 'green-archipel',
};

export function accentPourFamille(code: string): AccentDsfr {
  return accentsParCode[code] ?? 'blue-cumulus';
}
