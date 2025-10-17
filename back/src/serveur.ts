import { configurationServeurLabEnvironnement } from '@lab-anssi/lib';
import { adaptateurJWT } from './api/adaptateurJWT';
import {
  ConfigurationServeur,
  ConfigurationServeurSansMiddleware,
} from './api/configurationServeur';
import { creeServeur } from './api/dsc';
import { fabriqueMiddleware } from './api/middleware';
import { moteurDeRenduExpress } from './api/moteurDeRendu';
import { adaptateurOIDC } from './api/oidc/adaptateurOIDC';
import { BusEvenements } from './bus/busEvenements';
import { cableTousLesAbonnes } from './bus/cablage';
import { fabriqueAdaptateurChiffrement } from './infra/adaptateurChiffrement';
import { adaptateurEnvironnement } from './infra/adaptateurEnvironnement';
import { fabriqueAdaptateurHachage } from './infra/adaptateurHachage';
import { fabriqueAdaptateurJournal } from './infra/adaptateurJournal';
import { adaptateurRechercheEntreprise } from './infra/adaptateurRechercheEntreprise';
import { EntrepotJeuxPostgres } from './infra/entrepotJeuxPostgres';
import { EntrepotRessourcesCyberGrist } from './infra/entrepotRessourcesCyberGrist';
import { EntrepotRessourcesCyberStatique } from './infra/entrepotRessourcesCyberStatique';
import { EntrepotSecretHachagePostgres } from './infra/entrepotSecretHachagePostgres';
import { EntrepotUtilisateurPostgres } from './infra/entrepotUtilisateurPostgres';
import { recupereCheminVersFichiersStatiquesParDefaut } from './infra/recupereCheminVersFichiersStatiques';
import { fabriqueServiceVerificationCoherenceSecretsHachage } from './infra/serviceVerificationCoherenceSecretsHachage';
import { messagerieMattermost } from './infra/messagerieMattermost';
import { fabriqueAdaptateurTeleversement } from './infra/adaptateurTeleversement';
import { EntrepotMetiersStatique } from './infra/entrepotMetiersStatique';
import { EntrepotMetiersGrist } from './infra/entrepotMetiersGrist';
import { EntrepotSelectionsEnseignantsStatique } from './infra/entrepotSelectionsEnseignantsStatique';
import { EntrepotSelectionsEnseignantsGrist } from './infra/entrepotSelectionsEnseignantsGrist';
import { Selection } from './metier/selection';
import { EntrepotSelectionsEleves } from './metier/entrepotSelectionsEleves';

const entrepotSecretHachage = new EntrepotSecretHachagePostgres();

const adaptateurHachage = fabriqueAdaptateurHachage({
  adaptateurEnvironnement,
});

const busEvenements = new BusEvenements();
cableTousLesAbonnes({
  busEvenements,
  adaptateurHachage,
  adaptateurJournal: fabriqueAdaptateurJournal(),
  messagerieInstantanee: messagerieMattermost(),
});

const serviceCoherenceSecretsHachage =
  fabriqueServiceVerificationCoherenceSecretsHachage({
    adaptateurEnvironnement,
    entrepotSecretHachage,
    adaptateurHachage,
  });

serviceCoherenceSecretsHachage
  .verifieCoherenceSecrets()
  .catch((raison) => {
    // eslint-disable-next-line no-console
    console.error(raison.message);
    process.exit(1);
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('✅ Vérification des secrets réussie'))
  .then(() => {
    const entrepotUtilisateur = new EntrepotUtilisateurPostgres({
      adaptateurHachage,
      adaptateurChiffrement: fabriqueAdaptateurChiffrement({
        adaptateurEnvironnement,
      }),
    });

    const entrepotRessourcesCyber =
      adaptateurEnvironnement.estEntrepotsStatiques()
        ? new EntrepotRessourcesCyberStatique()
        : new EntrepotRessourcesCyberGrist();

    const configurationServeurSansMiddleware: ConfigurationServeurSansMiddleware =
      {
        adaptateurEnvironnement,
        adaptateurOIDC,
        serveurLab: configurationServeurLabEnvironnement(),
        entrepotMetier: adaptateurEnvironnement.estEntrepotsStatiques()
          ? new EntrepotMetiersStatique()
          : new EntrepotMetiersGrist(),
        entrepotRessourcesCyber,
        adaptateurJWT,
        adaptateurHachage,
        adaptateurRechercheEntreprise,
        entrepotUtilisateur,
        recupereCheminsVersFichiersStatiques:
          recupereCheminVersFichiersStatiquesParDefaut,

        moteurDeRendu: moteurDeRenduExpress(),
        entrepotJeux: new EntrepotJeuxPostgres({
          adaptateurEnvironnement,
          adaptateurHachage,
          entrepotUtilisateur,
        }),
        busEvenements,
        adaptateurJournal: fabriqueAdaptateurJournal(),
        adaptateurTeleversement: fabriqueAdaptateurTeleversement(),
        entrepotSelectionsEnseignants:
          adaptateurEnvironnement.estEntrepotsStatiques()
            ? new EntrepotSelectionsEnseignantsStatique()
            : new EntrepotSelectionsEnseignantsGrist(entrepotRessourcesCyber),
        entrepotSelectionsEleves: new (class
          implements EntrepotSelectionsEleves
        {
          async tous(): Promise<Selection[]> {
            return [];
          }
        })(),
      };
    const configurationServeur: ConfigurationServeur = {
      ...configurationServeurSansMiddleware,
      middleware: fabriqueMiddleware(configurationServeurSansMiddleware),
    };
    const app = creeServeur(configurationServeur);

    const port = process.env.PORT || 3005;

    const serveur = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.info(`Le serveur écoute sur le port ${port}`);
    });

    serveur.on('error', (erreur) => {
      // eslint-disable-next-line no-console
      console.error(erreur);
      process.exit(1);
    });
  });
