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

const app = creeServeur({
  adaptateurOIDC,
  serveurLab: configurationServeurLabEnvironnement(),
  entrepotRessourcesCyber: adaptateurEnvironnement.estEntrepotsStatiques()
    ? new EntrepotRessourcesCyberStatique()
    : new EntrepotRessourcesCyberGrist(),
  adaptateurJWT,
  adaptateurHachage: fabriqueAdaptateurHachage({ adaptateurEnvironnement }),
  entrepotUtilisateur: new EntrepotUtilisateurPostgres({
    adaptateurHachage: fabriqueAdaptateurHachage({ adaptateurEnvironnement }),
  }),
  recupereCheminVersFichiersStatiques:
    recupereCheminVersFichiersStatiquesParDefaut,
});

const port = process.env.PORT || 3000;

const serveur = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Le serveur écoute sur le port ${port}`);
});

serveur.on('error', (erreur) => {
  // eslint-disable-next-line no-console
  console.error(erreur);
  process.exit(1);
});
