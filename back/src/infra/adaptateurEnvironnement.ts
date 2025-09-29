type OIDC = {
  urlRedirectionApresAuthentification: () => string;
  urlRedirectionApresDeconnexion: () => string;
  urlBase: () => string;
  clientId: () => string;
  clientSecret: () => string;
};
export type AdaptateurEnvironnement = {
  chiffrement: () => {
    cleChaCha20Hex: () => string;
  };
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
  maintenance: () => {
    actif: () => boolean;
    detailsPreparation: () => string | undefined;
  };
  journal: () => {
    enMemoire: () => boolean;
  };
  matomo: () => { identifiant: string; tagManager: string } | undefined;
};

export const adaptateurEnvironnement: AdaptateurEnvironnement = {
  maintenance: () => ({
    actif: () => process.env.MODE_MAINTENANCE === 'true',
    detailsPreparation: () => process.env.PREPARATION_MODE_MAINTENANCE,
  }),
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
              `Le secret de hachage HACHAGE_SECRET_DE_HACHAGE_${version} ne doit pas être vide`,
            );
          }
          return {
            version: parseInt(version, 10),
            secret: valeur,
          };
        })
        .sort(
          ({ version: version1 }, { version: version2 }) => version1 - version2,
        );
    },
  }),
  chiffrement: () => ({
    cleChaCha20Hex: () => {
      const cleHex = process.env.CHIFFREMENT_CHACHA20_CLE_HEX;
      if (!cleHex) {
        throw new Error(
          `La clé de chiffrement CHIFFREMENT_CHACHA20_CLE_HEX ne doit pas être vide`,
        );
      }
      return cleHex;
    },
  }),
  journal: () => ({
    enMemoire: () => process.env.BASE_DONNEES_JOURNAL_EN_MEMOIRE === 'true',
  }),
  matomo: (): { identifiant: string; tagManager: string } | undefined => {
    if (process.env.MATOMO_ID && process.env.MATOMO_URL_TAG_MANAGER) {
      return {
        identifiant: process.env.MATOMO_ID,
        tagManager: process.env.MATOMO_URL_TAG_MANAGER,
      };
    }
    return undefined;
  },
};
