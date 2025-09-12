import { configurationServeurLabEnvironnement } from '@lab-anssi/lib';
import { adaptateurJWT } from './api/adaptateurJWT';
import { creeServeur } from './api/dsc';
import { fabriqueMiddleware } from './api/middleware';
import { moteurDeRenduExpress } from './api/moteurDeRendu';
import { adaptateurOIDC } from './api/oidc/adaptateurOIDC';
import { fabriqueAdaptateurChiffrement } from './infra/adaptateurChiffrement';
import { adaptateurEnvironnement } from './infra/adaptateurEnvironnement';
import { fabriqueAdaptateurHachage } from './infra/adaptateurHachage';
import { adaptateurRechercheEntreprise } from './infra/adaptateurRechercheEntreprise';
import { EntrepotJeuxPostgres } from './infra/entrepotJeuxPostgres';
import { EntrepotRessourcesCyberGrist } from './infra/entrepotRessourcesCyberGrist';
import { EntrepotRessourcesCyberStatique } from './infra/entrepotRessourcesCyberStatique';
import { EntrepotSecretHachagePostgres } from './infra/entrepotSecretHachagePostgres';
import { EntrepotUtilisateurPostgres } from './infra/entrepotUtilisateurPostgres';
import { recupereCheminVersFichiersStatiquesParDefaut } from './infra/recupereCheminVersFichiersStatiques';
import { fabriqueServiceVerificationCoherenceSecretsHachage } from './infra/serviceVerificationCoherenceSecretsHachage';
import { BusEvenements } from './bus/busEvenements';
import { fabriqueAdaptateurJournal } from './infra/adaptateurJournal';

const entrepotSecretHachage = new EntrepotSecretHachagePostgres();

const busEvenements = new BusEvenements();

const adaptateurHachage = fabriqueAdaptateurHachage({
  adaptateurEnvironnement,
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
    const app = creeServeur({
      adaptateurOIDC,
      serveurLab: configurationServeurLabEnvironnement(),
      entrepotRessourcesCyber: adaptateurEnvironnement.estEntrepotsStatiques()
        ? new EntrepotRessourcesCyberStatique()
        : new EntrepotRessourcesCyberGrist(),
      adaptateurJWT,
      adaptateurHachage,
      adaptateurRechercheEntreprise,
      entrepotUtilisateur: new EntrepotUtilisateurPostgres({
        adaptateurHachage,
        adaptateurChiffrement: fabriqueAdaptateurChiffrement({
          adaptateurEnvironnement,
        }),
      }),
      recupereCheminsVersFichiersStatiques:
        recupereCheminVersFichiersStatiquesParDefaut,
      middleware: fabriqueMiddleware({ adaptateurEnvironnement }),
      moteurDeRendu: moteurDeRenduExpress(),
      entrepotJeux: new EntrepotJeuxPostgres(),
      busEvenements,
      adaptateurJournal: fabriqueAdaptateurJournal(),
    });

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
