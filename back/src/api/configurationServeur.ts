import { ConfigurationServeurLab } from '@lab-anssi/lib';
import { BusEvenements } from '../bus/busEvenements';
import { AdaptateurAntivirus } from '../infra/adaptateurAntivirus';
import { AdaptateurEnvironnement } from '../infra/adaptateurEnvironnement';
import { AdaptateurGestionErreur } from '../infra/adaptateurGestionErreurSentry';
import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { AdaptateurJournal } from '../infra/adaptateurJournal';
import { AdaptateurRechercheEntreprise } from '../infra/adaptateurRechercheEntreprise';
import { AdaptateurTeleversement } from '../infra/adaptateurTeleversement';
import { RecupereCheminVersFichiersStatiques } from '../infra/recupereCheminVersFichiersStatiques';
import { EntrepotJeux } from '../metier/entrepotJeux';
import { EntrepotMetiers } from '../metier/entrepotMetiers';
import { EntrepotRessourcesCyber } from '../metier/entrepotRessourcesCyber';
import { EntrepotSelections } from '../metier/entrepotSelections';
import { EntrepotUtilisateur } from '../metier/entrepotUtilisateur';
import { AdaptateurJWT } from './adaptateurJWT';
import { Middleware } from './middleware';
import { MoteurDeRendu } from './moteurDeRendu';
import { AdaptateurOIDC } from './oidc/adaptateurOIDC';

export interface ConfigurationServeur {
  adaptateurEnvironnement: AdaptateurEnvironnement;
  serveurLab: ConfigurationServeurLab;
  entrepotMetier: EntrepotMetiers;
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
  adaptateurAntivirus: AdaptateurAntivirus;
  entrepotSelectionsEnseignants: EntrepotSelections;
  entrepotSelectionsEleves: EntrepotSelections;
  adaptateurGestionErreur: AdaptateurGestionErreur;
}

export type ConfigurationServeurSansMiddleware = Omit<
  ConfigurationServeur,
  'middleware'
>;
