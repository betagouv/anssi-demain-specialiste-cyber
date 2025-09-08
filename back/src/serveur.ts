import { configurationServeurLabEnvironnement } from '@lab-anssi/lib';
import { adaptateurJWT } from './api/adaptateurJWT';
import { creeServeur } from './api/dsc';
import { adaptateurOIDC } from './api/oidc/adaptateurOIDC';
import { adaptateurEnvironnement } from './infra/adaptateurEnvironnement';
import { fabriqueAdaptateurHachage } from './infra/adaptateurHachage';
import { EntrepotRessourcesCyberGrist } from './infra/entrepotRessourcesCyberGrist';
import { EntrepotRessourcesCyberStatique } from './infra/entrepotRessourcesCyberStatique';
import { EntrepotUtilisateurPostgres } from './infra/entrepotUtilisateurPostgres';
import { recupereCheminVersFichiersStatiquesParDefaut } from './infra/recupereCheminVersFichiersStatiques';
import { fabriqueAdaptateurChiffrement } from './infra/adaptateurChiffrement';
import { EntrepotSecretHachagePostgres } from './infra/entrepotSecretHachagePostgres';
import { fabriqueServiceVerificationCoherenceSecretsHachage } from './infra/serviceVerificationCoherenceSecretsHachage';
import { fabriqueMiddleware } from './api/middleware';
import { moteurDeRenduExpress } from './api/moteurDeRendu';

const entrepotSecretHachage = new EntrepotSecretHachagePostgres();

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
      entrepotUtilisateur: new EntrepotUtilisateurPostgres({
        adaptateurHachage,
        adaptateurChiffrement: fabriqueAdaptateurChiffrement({
          adaptateurEnvironnement,
        }),
      }),
      recupereCheminsVersFichiersStatiques:
        recupereCheminVersFichiersStatiquesParDefaut,
      middleware: fabriqueMiddleware({ adaptateurEnvironnement }),
      moteurDeRendu: moteurDeRenduExpress,
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
