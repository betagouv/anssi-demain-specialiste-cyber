type OIDC = {
  urlRedirectionApresAuthentification: () => string;
  urlRedirectionApresDeconnexion: () => string;
  urlBase: () => string;
  clientId: () => string;
  clientSecret: () => string;
};
export type TableGrist = {
  idTable: string;
};
export type AdaptateurEnvironnement = {
  chiffrement: () => {
    cleChaCha20Hex: () => string;
  };
  grist: () => {
    urlDeBase: string;
    cleApi: string;
    idDocument: string;
    ressourcesCyber: () => TableGrist;
    metiers: () => TableGrist;
    selectionsEnseignants: () => TableGrist;
    selectionsEleves(): TableGrist;
  };
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
  nodeEnv: () => string | undefined;
  televersement: () => {
    region: string;
    bucketPhotosJeux: string;
    urlCellar: string;
  };
  televersementEnMemoire(): boolean;
  cellarPhotosJeux: () => string;
  antivirus: () => {
    urlAnalyse: string;
    jetonAnalyse: string;
    analyseActive: boolean;
  };
};

const variablesDeTeleversement = () => ({
  urlCellar: process.env.S3_URL_CELLAR,
  bucketPhotosJeux: process.env.S3_BUCKET_PHOTOS_JEUX,
  region: process.env.S3_REGION,
  enMemoire: process.env.S3_CELLAR_EN_MEMOIRE === 'true',
});

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
  grist: () => ({
    urlDeBase: process.env.GRIST_URL_BASE || '',
    cleApi: process.env.GRIST_CLE_API || '',
    idDocument: process.env.GRIST_ID_DOCUMENT || '',
    ressourcesCyber: () => ({
      idTable: process.env.GRIST_RESSOURCES_CYBER_ID_TABLE || '',
    }),
    metiers: () => ({
      idTable: process.env.GRIST_METIERS_ID_TABLE || '',
    }),
    selectionsEnseignants: () => ({
      idTable: process.env.GRIST_SELECTION_ENSEIGNANTS_ID_TABLE || '',
    }),
    selectionsEleves: () => ({
      idTable: process.env.GRIST_SELECTION_ELEVES_ID_TABLE || '',
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
  nodeEnv: () => process.env.NODE_ENV,
  televersementEnMemoire: (): boolean =>
    process.env.S3_CELLAR_EN_MEMOIRE === 'true',
  televersement: (): {
    urlCellar: string;
    bucketPhotosJeux: string;
    region: string;
  } => {
    const { urlCellar, bucketPhotosJeux, region, enMemoire } =
      variablesDeTeleversement();
    if (urlCellar && bucketPhotosJeux && region && !enMemoire) {
      return {
        urlCellar,
        bucketPhotosJeux,
        region,
      };
    }
    throw new Error(
      'L’URL du Cellar doit être définie lorsque DSC est configuré pour Cellar.',
    );
  },
  cellarPhotosJeux: (): string => {
    const { urlCellar, bucketPhotosJeux, enMemoire } =
      variablesDeTeleversement();
    if (enMemoire) return '';
    const [schema, autorite] = urlCellar!.split('//');
    return `${schema}//${bucketPhotosJeux}.${autorite}`;
  },
  antivirus: () => ({
    urlAnalyse: process.env.JCOP_URL ?? '',
    jetonAnalyse: process.env.JCOP_JETON ?? '',
    analyseActive: process.env.ANALYSE_ANTIVIRUS_ACTIVE === 'true',
  }),
};
