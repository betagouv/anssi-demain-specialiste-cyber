import { ConfigurationServeur } from '../../src/api/dsc';
import { entrepotRessourcesCyberMemoire } from '../infra/entrepotRessourceCyberMemoire';
import { AdaptateurOIDC } from '../../src/api/oidc/adaptateurOIDC';

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

export const configurationDeTestDuServeur: ConfigurationServeur = {
  serveurLab: {
    reseau: {
      trustProxy: '0',
      maxRequetesParMinute: 1000,
      ipAutorisees: false,
    },
  },
  entrepotRessourcesCyber: entrepotRessourcesCyberMemoire,
  adaptateurOIDC: fauxAdaptateurOIDC,
};
