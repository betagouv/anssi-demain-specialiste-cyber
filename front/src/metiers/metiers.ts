export type Remuneration = {
  junior: number;
  senior: number;
};

export type LiensMetier = {
  illustration: string;
  dataemploi: string;
  metierscope: string;
  videos: string[];
};

export type Metier = {
  id: string;
  titre: string;
  fonction: string;
  image: { chemin: string };
  description: string;
  missionPrincipale: string;
  postures: string[];
  formationsCibles: string[];
  preRequis: string[];
  remuneration: Remuneration;
  metiersProches: string[];
  liens: LiensMetier;
};
