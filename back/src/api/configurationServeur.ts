import { ConfigurationServeurLab } from '@lab-anssi/lib';
import { BusEvenements } from '../bus/busEvenements';
import { AdaptateurEnvironnement } from '../infra/adaptateurEnvironnement';
import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { AdaptateurJournal } from '../infra/adaptateurJournal';
import { AdaptateurRechercheEntreprise } from '../infra/adaptateurRechercheEntreprise';
import { RecupereCheminVersFichiersStatiques } from '../infra/recupereCheminVersFichiersStatiques';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { AdaptateurJWT } from './adaptateurJWT';
import { Middleware } from './middleware';
import { MoteurDeRendu } from './moteurDeRendu';
import { AdaptateurOIDC } from './oidc/adaptateurOIDC';
import { AdaptateurTeleversement } from '../infra/adaptateurTeleversement';

export interface ConfigurationServeur {
  adaptateurEnvironnement: AdaptateurEnvironnement;
  serveurLab: ConfigurationServeurLab;
  entrepotRessourcesCyber: EntrepotRessourcesCyber;
  adaptateurOIDC: AdaptateurOIDC;
  adaptateurJWT: AdaptateurJWT;
  adaptateurRechercheEntreprise: AdaptateurRechercheEntreprise;
  entrepotUtilisateur: EntrepotUtilisateur;
  adaptateurHachage: AdaptateurHachage;
  recupereCheminsVersFichiersStatiques: RecupereCheminVersFichiersStatiques;
  middleware: Middleware;
  moteurDeRendu: MoteurDeRendu;
  busEvenements: BusEvenements;
  entrepotJeux: EntrepotJeux;
  adaptateurJournal: AdaptateurJournal;
  adaptateurTeleversement: AdaptateurTeleversement;
}

export type ConfigurationServeurSansMiddleware = Omit<
  ConfigurationServeur,
  'middleware'
>;
