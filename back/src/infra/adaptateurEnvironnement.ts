type OIDC = {
  urlRedirectionApresAuthentification: () => string;
  urlRedirectionApresDeconnexion: () => string;
  urlBase: () => string;
  clientId: () => string;
  clientSecret: () => string;
};
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
  oidc: () => OIDC;
};

export const adaptateurEnvironnement: AdaptateurEnvironnement = {
  oidc: (): OIDC => ({
    urlRedirectionApresAuthentification: () =>
      `${process.env.URL_BASE_DSC}/oidc/apres-authentification`,
    urlRedirectionApresDeconnexion: () =>
      `${process.env.URL_BASE_DSC}/oidc/apres-deconnexion`,
    urlBase: () => process.env.OIDC_URL_BASE || '/',
    clientId: () => process.env.OIDC_CLIENT_ID || '',
    clientSecret: () => process.env.OIDC_CLIENT_SECRET || '',
  }),
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
