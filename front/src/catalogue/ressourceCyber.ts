export type RessourceCyber = {
  id: number;
  titre: string;
  description: string;
  thematiques: string[];
  publicsCible: string[];
  niveaux: string[];
  types: string[];
  besoins: string[];
};

export const lesRessourcesCyberTriees = (data: RessourceCyber[]) => {
  return data.sort((a, b) => a.titre.localeCompare(b.titre));
};

export const lesThematiquesCyber = (ressourcesCyber: RessourceCyber[]) => {
  return Array.from(
    new Set(ressourcesCyber.flatMap((r) => r.thematiques)),
  ).sort();
};

export const lesPublicsCibleDesRessourcesCyber = (
  ressourcesCyber: RessourceCyber[],
): string[] => {
  return Array.from(
    new Set(ressourcesCyber.flatMap((r) => r.publicsCible)),
  ).sort((s1, s2) => s1.localeCompare(s2));
};

export const lesNiveauxDesRessourcesCyber = (
  ressourcesCyber: RessourceCyber[],
): string[] => {
  return Array.from(new Set(ressourcesCyber.flatMap((r) => r.niveaux))).sort(
    (n1, n2) => n1.localeCompare(n2),
  );
};

export const lesTypesDesRessourcesCyber = (
  ressourcesCyber: RessourceCyber[],
): string[] => {
  return Array.from(new Set(ressourcesCyber.flatMap((r) => r.types))).sort(
    (n1, n2) => n1.localeCompare(n2),
  );
};
