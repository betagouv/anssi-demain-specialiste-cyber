import { ConfigurationServeur } from '../../src/api/dsc';
import { entrepotRessourcesCyberMemoire } from '../infra/entrepotRessourceCyberMemoire';

export const configurationDeTestDuServeur: ConfigurationServeur = {
  entrepotRessourcesCyber: entrepotRessourcesCyberMemoire,
};
