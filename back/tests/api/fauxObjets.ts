import { NextFunction, Response } from 'express';
import { join } from 'path';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';
import {
  ConfigurationServeur,
  ConfigurationServeurSansMiddleware,
} from '../../src/api/configurationServeur';
import { fabriqueMiddleware, RequeteNonTypee } from '../../src/api/middleware';
import { MoteurDeRendu } from '../../src/api/moteurDeRendu';
import { AdaptateurOIDC } from '../../src/api/oidc/adaptateurOIDC';
import { AdaptateurEnvironnement } from '../../src/infra/adaptateurEnvironnement';
import { AdaptateurHachage } from '../../src/infra/adaptateurHachage';
import { adaptateurJournalMemoire } from '../../src/infra/adaptateurJournal';
import { AdaptateurRechercheEntreprise } from '../../src/infra/adaptateurRechercheEntreprise';
import { fabriqueBusPourLesTests } from '../bus/busPourLesTests';
import { EntrepotJeuxMemoire } from '../infra/entrepotJeuxMemoire';
import { EntrepotRessourcesCyberMemoire } from '../infra/entrepotRessourceCyberMemoire';
import { EntrepotUtilisateurMemoire } from '../infra/entrepotUtilisateurMemoire';
import {
  AdaptateurTeleversement,
  fabriqueAdaptateurTeleversement,
  PhotosJeuTeleversees,
} from '../../src/infra/adaptateurTeleversement';
import { EntrepotMetiersMemoire } from '../infra/entrepotMetiersMemoire';
import { EntrepotSelectionEnseignantsMemoire } from '../infra/entrepotSelectionEnseignantsMemoire';

export const fauxAdaptateurOIDC: AdaptateurOIDC = {
  recupereInformationsUtilisateur: async (_accessToken: string) => ({
    email: '',
    nom: '',
    prenom: '',
    siret: '',
  }),
  recupereJeton: async (_requete) => ({ accessToken: '', idToken: '' }),
  genereDemandeAutorisation: async () => ({
    url: '',
    nonce: '',
    state: '',
  }),
  genereDemandeDeconnexion: async (_) => ({ url: '', state: '' }),
};

export const fauxAdaptateurJWT: AdaptateurJWT = {
  genereToken: (_: Record<string, unknown>) => '',
  decode: (_: string) => ({}),
};

export const fauxAdaptateurHachage: AdaptateurHachage = {
  hache: (valeur: string): string => `${valeur}-hache`,
  hacheBCrypt: async (valeur: string): Promise<string> =>
    `${valeur}-hacheBCrypt`,
  compareBCrypt: async (
    _valeurEnClair: string,
    _empreinte: string,
  ): Promise<boolean> => true,
};

export const fauxAdaptateurEnvironnement: AdaptateurEnvironnement = {
  hachage: () => ({
    tousLesSecretsDeHachage: () => [{ version: 1, secret: 'secret' }],
  }),
  oidc: () => ({
    urlRedirectionApresAuthentification: () => '',
    urlRedirectionApresDeconnexion: () => '',
    urlBase: () => '',
    clientId: () => '',
    clientSecret: () => '',
  }),
  grist: () => ({
    urlDeBase: '',
    cleApi: '',
    ressourcesCyber: () => ({ idDocument: '', idTable: '' }),
    metiers: () => ({ idDocument: '', idTable: '' }),
    selectionEnseignants: () => ({ idDocument: '', idTable: '' }),
  }),
  estEntrepotsStatiques: () => true,
  chiffrement: () => ({
    cleChaCha20Hex: () => 'uneCléCha20Hex',
  }),
  maintenance: () => ({
    actif: () => false,
    detailsPreparation: () => undefined,
  }),
  journal: () => ({
    enMemoire: () => true,
  }),
  matomo: (): { identifiant: string; tagManager: string } | undefined => ({
    identifiant: '',
    tagManager: '',
  }),
  nodeEnv: () => 'developpement',
  televersementEnMemoire: (): boolean => true,
  televersement: function (): {
    region: string;
    bucketPhotosJeux: string;
    urlCellar: string;
  } {
    return {
      region: '',
      bucketPhotosJeux: '',
      urlCellar: '',
    };
  },
  cellarPhotosJeux: () => 'https://example.com/',
};

export type ConfigurationServeurDeTest = ConfigurationServeur & {
  entrepotRessourcesCyber: EntrepotRessourcesCyberMemoire;
};

const fauxMoteurDeRendu: MoteurDeRendu = {
  rends: (reponse, _vue, _options) =>
    reponse.sendStatus(reponse.statusCode || 200),
};

export const fauxAdaptateurRechercheEntreprise: AdaptateurRechercheEntreprise =
  {
    rechercheOrganisationParSiret: async (siret: string) => ({
      nom: 'TEST',
      departement: '86',
      siret,
    }),
  };

export const fauxAdaptateurTeleversement = (): AdaptateurTeleversement => {
  const adaptateurTeleversement = fabriqueAdaptateurTeleversement();
  return {
    ...adaptateurTeleversement,
    sauvegarde(_photosJeu: PhotosJeuTeleversees): Promise<void> {
      return Promise.resolve();
    },
    recupereTypeImage: (_buffer: Buffer) => {
      return 'image/png';
    },
  };
};

export const configurationServeurSansMiddleware =
  (): ConfigurationServeurSansMiddleware => {
    const entrepotRessourcesCyber = new EntrepotRessourcesCyberMemoire();
    return {
      serveurLab: {
        reseau: {
          trustProxy: '0',
          maxRequetesParMinute: 1000,
          ipAutorisees: false,
        },
      },
      entrepotRessourcesCyber,
      entrepotMetier: new EntrepotMetiersMemoire(),
      adaptateurOIDC: fauxAdaptateurOIDC,
      adaptateurHachage: fauxAdaptateurHachage,
      adaptateurJWT: fauxAdaptateurJWT,
      adaptateurRechercheEntreprise: fauxAdaptateurRechercheEntreprise,
      entrepotUtilisateur: new EntrepotUtilisateurMemoire(),
      recupereCheminsVersFichiersStatiques: () => [
        join(__dirname, '../pagesDeTest'),
      ],
      moteurDeRendu: fauxMoteurDeRendu,
      busEvenements: fabriqueBusPourLesTests(),
      entrepotJeux: new EntrepotJeuxMemoire(),
      adaptateurEnvironnement: fauxAdaptateurEnvironnement,
      adaptateurJournal: adaptateurJournalMemoire,
      adaptateurTeleversement: fauxAdaptateurTeleversement(),
      entrepotSelectionEnseignants: new EntrepotSelectionEnseignantsMemoire(),
    };
  };

const ajouteUnNonceNonAleatoireALaReponse = async (
  _requete: RequeteNonTypee,
  reponse: Response,
  suite: NextFunction,
) => {
  reponse.locals.nonce = 'ceciEstUnNonceUtiliséLorsDesTests';
  suite();
};

const middleware = fabriqueMiddleware(configurationServeurSansMiddleware());
export const configurationDeTestDuServeur = (): ConfigurationServeur => ({
  ...configurationServeurSansMiddleware(),
  middleware: {
    ...middleware,
    ajouteLeNonceALaReponse: ajouteUnNonceNonAleatoireALaReponse,
  },
});
