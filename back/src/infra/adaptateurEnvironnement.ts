export type AdaptateurEnvironnement = {
  grist: () => {
    urlDeBase: string;
    cleApi: string;
    ressourcesCyber: () => {
      idDocument: string;
      idTable: string;
    };
  };
  estEntrepotsStatiques(): boolean;
};

export const adaptateurEnvironnement: AdaptateurEnvironnement = {
  estEntrepotsStatiques(): boolean {
    return process.env.ENTREPOTS_STATIQUES === 'true';
  },
  grist: () => ({
    urlDeBase: process.env.GRIST_URL_BASE || '',
    cleApi: process.env.GRIST_CLE_API || '',
    ressourcesCyber: () => ({
      idDocument: process.env.GRIST_RESSOURCES_CYBER_ID_DOCUMENT || '',
      idTable: process.env.GRIST_RESSOURCES_CYBER_ID_TABLE || '',
    }),
  }),
};
