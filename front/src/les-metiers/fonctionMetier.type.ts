export type Temoignage = {
  nom: string;
  femme: boolean;
  illustration: string;
  lien: string;
};

export type FonctionMetier = {
  nom: string;
  famille: string;
  missionPrincipale: string;
  lien: string;
  témoignage: Temoignage;
};

const ordreFamilles: string[] = [
  'Pilotage',
  'Conception',
  'Incidents et crises',
  'Conseil et recherche',
  'Métiers connexes',
];

export function fonctionsTrieesParFamille(
  fonctions: FonctionMetier[],
): FonctionMetier[] {
  return [...fonctions].sort(
    (a, b) =>
      ordreFamilles.indexOf(a.famille) - ordreFamilles.indexOf(b.famille),
  );
}

export function famillesUniques(fonctions: FonctionMetier[]): string[] {
  const familles = new Set(fonctions.map((f) => f.famille));
  return ordreFamilles.filter((f) => familles.has(f));
}

export function compteFonctionsParFamille(
  fonctions: FonctionMetier[],
): Map<string, number> {
  const compteur = new Map<string, number>();
  for (const f of fonctions) {
    compteur.set(f.famille, (compteur.get(f.famille) ?? 0) + 1);
  }
  return compteur;
}
