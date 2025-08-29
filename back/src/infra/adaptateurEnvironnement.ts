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
  hachage: () => {
    tousLesSecretsDeHachage: () => { version: number; secret: string }[];
  };
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
  hachage: () => ({
    tousLesSecretsDeHachage: () => {
      type VersionDeSecret = {
        version: string;
        valeur: string;
      };
      return Object.entries(process.env)
        .map(([cle, valeur]) => {
          const matches = cle.match(/HACHAGE_SECRET_DE_HACHAGE_(\d+)/);
          const version = matches ? matches[1] : undefined;
          return { version, valeur };
        })
        .filter((objet): objet is VersionDeSecret => !!objet.version)
        .map(({ version, valeur }) => {
          if (!valeur) {
            throw new Error(
              `Le secret de hachage HACHAGE_SECRET_DE_HACHAGE_${version} ne doit pas être vide`
            );
          }
          return {
            version: parseInt(version, 10),
            secret: valeur,
          };
        })
        .sort(
          ({ version: version1 }, { version: version2 }) => version1 - version2
        );
    },
  }),
};
