import { configurationServeurLabEnvironnement } from '@lab-anssi/lib';
import { adaptateurJWT } from './api/adaptateurJWT';
import { ConfigurationServeurSansMiddleware } from './api/configurationServeur';
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

const entrepotSecretHachage = new EntrepotSecretHachagePostgres();

const adaptateurHachage = fabriqueAdaptateurHachage({
  adaptateurEnvironnement,
});

const busEvenements = new BusEvenements();
cableTousLesAbonnes({
  busEvenements,
  adaptateurHachage,
  adaptateurJournal: fabriqueAdaptateurJournal(),
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
    const configurationServeurSansMiddleware: ConfigurationServeurSansMiddleware =
      {
        adaptateurEnvironnement,
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

        moteurDeRendu: moteurDeRenduExpress(),
        entrepotJeux: new EntrepotJeuxPostgres({adaptateurHachage}),
        busEvenements,
        adaptateurJournal: fabriqueAdaptateurJournal(),
      };
    const configurationServeur = {
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
