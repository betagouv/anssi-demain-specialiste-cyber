export type AdaptateurEnvironnement = {
  grist: () => {
    urlDeBase: string;
    cleApi: string;
    ressourcesCyber: () => {
      idDocument: string;
      idTable: string;
    };
  };
};

export const adaptateurEnvironnement: AdaptateurEnvironnement = {
  grist: () => ({
    urlDeBase: process.env.GRIST_URL_BASE || '',
    cleApi: process.env.GRIST_CLE_API || '',
    ressourcesCyber: () => ({
      idDocument: process.env.GRIST_RESSOURCES_CYBER_ID_DOCUMENT || '',
      idTable: process.env.GRIST_RESSOURCES_CYBER_ID_TABLE || '',
    }),
  }),
};
