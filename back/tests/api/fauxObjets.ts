import { join } from 'path';
import { AdaptateurJWT } from '../../src/api/adaptateurJWT';
import { ConfigurationServeur } from '../../src/api/dsc';
import { AdaptateurOIDC } from '../../src/api/oidc/adaptateurOIDC';
import { AdaptateurEnvironnement } from '../../src/infra/adaptateurEnvironnement';
import { AdaptateurHachage } from '../../src/infra/adaptateurHachage';
import { EntrepotRessourcesCyberMemoire } from '../infra/entrepotRessourceCyberMemoire';
import { EntrepotUtilisateurMemoire } from '../infra/entrepotUtilisateurMemoire';

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
    _empreinte: string
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
  }),
  estEntrepotsStatiques: () => true,
  chiffrement: () => ({
    cleChaCha20Hex: () => 'uneCléCha20Hex',
  }),
  maintenance: () => ({
    actif: () => false,
    detailsPreparation: () => undefined,
  }),
};

export type ConfigurationServeurDeTest = ConfigurationServeur & {
  entrepotRessourcesCyber: EntrepotRessourcesCyberMemoire;
};

export const configurationDeTestDuServeur = (): ConfigurationServeurDeTest => ({
  serveurLab: {
    reseau: {
      trustProxy: '0',
      maxRequetesParMinute: 1000,
      ipAutorisees: false,
    },
  },
  entrepotRessourcesCyber: new EntrepotRessourcesCyberMemoire(),
  adaptateurOIDC: fauxAdaptateurOIDC,
  adaptateurHachage: fauxAdaptateurHachage,
  adaptateurJWT: fauxAdaptateurJWT,
  entrepotUtilisateur: new EntrepotUtilisateurMemoire(),
  recupereCheminsVersFichiersStatiques: () => [join(__dirname, '../pagesDeTest')],
});
