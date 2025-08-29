import { creeServeur } from './api/dsc';
import { configurationServeurLabEnvironnement } from '@lab-anssi/lib';
import { adaptateurEnvironnement } from './infra/adaptateurEnvironnement';
import { EntrepotRessourcesCyberStatique } from './infra/entrepotRessourcesCyberStatique';
import { EntrepotRessourcesCyberGrist } from './infra/entrepotRessourcesCyberGrist';
import { adaptateurOIDC } from './api/oidc/adaptateurOIDC';
import { adaptateurJWT } from './api/adaptateurJWT';
import { fabriqueAdaptateurHachage } from './infra/adaptateurHachage';
import { EntrepotUtilisateurPostgres } from './infra/entrepotUtilisateurPostgres';

const app = creeServeur({
  adaptateurOIDC,
  serveurLab: configurationServeurLabEnvironnement(),
  entrepotRessourcesCyber: adaptateurEnvironnement.estEntrepotsStatiques()
    ? new EntrepotRessourcesCyberStatique()
    : new EntrepotRessourcesCyberGrist(),
  adaptateurJWT,
  adaptateurHachage: fabriqueAdaptateurHachage({ adaptateurEnvironnement }),
  entrepotUtilisateur: new EntrepotUtilisateurPostgres(),
});

const port = process.env.PORT || 3000;

const serveur = app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

serveur.on('error', (erreur) => {
  console.error(erreur);
  process.exit(1);
});
