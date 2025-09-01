export type RessourceCyber = {
  id: number;
  titre: string;
  thematiques: string[];
};

export const lesRessourcesCyberTriees = (data: RessourceCyber[]) => {
  return data.sort((a, b) => a.titre.localeCompare(b.titre));
};

export const lesThematiquesCyber = (ressourcesCyber: RessourceCyber[]) => {
  return Array.from(
    new Set(ressourcesCyber.flatMap((r) => r.thematiques))
  ).sort();
};
