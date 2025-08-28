import { ConfigurationServeur } from '../../src/api/dsc';
import { entrepotRessourcesCyberMemoire } from '../infra/entrepotRessourceCyberMemoire';

export const configurationDeTestDuServeur: ConfigurationServeur = {
  serveurLab: {
    reseau: {
      trustProxy: '0',
      maxRequetesParMinute: 1000,
      ipAutorisees: false,
    },
  },
  entrepotRessourcesCyber: entrepotRessourcesCyberMemoire,
};
