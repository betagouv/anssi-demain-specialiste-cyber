export type RessourceCyber = {
  id: number;
  titre: string;
  thematiques: string[];
  selections: string[];
};

export const lesRessourcesCyberTriees = (data: RessourceCyber[]) => {
  return data.sort((a, b) => a.titre.localeCompare(b.titre));
};

export const lesThematiquesCyber = (ressourcesCyber: RessourceCyber[]) => {
  return Array.from(
    new Set(ressourcesCyber.flatMap((r) => r.thematiques))
  ).sort();
};

export const lesSelectionsDesRessourcesCyber = (
  ressourcesCyber: RessourceCyber[]
): string[] => {
  return Array.from(new Set(ressourcesCyber.flatMap((r) => r.selections))).sort(
    (s1, s2) => s1.localeCompare(s2)
  );
};
