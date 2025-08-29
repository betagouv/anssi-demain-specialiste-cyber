import { configurationServeurLabEnvironnement } from '@lab-anssi/lib';
import { creeServeur } from './api/dsc';
import { adaptateurEnvironnement } from './infra/adaptateurEnvironnement';
import { EntrepotRessourcesCyberGrist } from './infra/entrepotRessourcesCyberGrist';
import { EntrepotRessourcesCyberStatique } from './infra/entrepotRessourcesCyberStatique';
import { recupereCheminVersFichiersStatiquesParDefaut } from './infra/recupereCheminVersFichiersStatiques';

const app = creeServeur({
  serveurLab: configurationServeurLabEnvironnement(),
  entrepotRessourcesCyber: adaptateurEnvironnement.estEntrepotsStatiques()
    ? new EntrepotRessourcesCyberStatique()
    : new EntrepotRessourcesCyberGrist(),
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
