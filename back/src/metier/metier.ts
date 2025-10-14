export type Metier = {
  id: number;
  titre: string;
  description: string;
  missionPrincipale: string;
  postures: string[];
  formationsCibles: string[];
  preRequis: string[];
  remuneration: {
    junior: number;
    senior: number;
  };
  metiersProches: string[];
  liens: {
    illustration: string;
    dataemploi: string;
    metierscope: string;
    video: string;
  };
};
