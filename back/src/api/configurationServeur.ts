import { ConfigurationServeurLab } from '@lab-anssi/lib';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { AdaptateurOIDC } from './oidc/adaptateurOIDC';
import { AdaptateurJWT } from './adaptateurJWT';
import { AdaptateurRechercheEntreprise } from '../infra/adaptateurRechercheEntreprise';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { RecupereCheminVersFichiersStatiques } from '../infra/recupereCheminVersFichiersStatiques';
import { Middleware } from './middleware';
import { MoteurDeRendu } from './moteurDeRendu';
import { BusEvenements } from '../bus/busEvenements';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { AdaptateurJournal } from '../infra/adaptateurJournal';

export interface ConfigurationServeur {
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
}
