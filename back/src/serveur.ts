import { creeServeur } from './api/dsc';
import { configurationServeurLabEnvironnement } from '@lab-anssi/lib';
import { adaptateurEnvironnement } from './infra/adaptateurEnvironnement';
import { EntrepotRessourcesCyberStatique } from './infra/entrepotRessourcesCyberStatique';
import { EntrepotRessourcesCyberGrist } from './infra/entrepotRessourcesCyberGrist';

const app = creeServeur({
  serveurLab: configurationServeurLabEnvironnement(),
  entrepotRessourcesCyber: adaptateurEnvironnement.estEntrepotsStatiques()
    ? new EntrepotRessourcesCyberStatique()
    : new EntrepotRessourcesCyberGrist(),
});

const port = process.env.PORT || 3000;

const serveur = app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

serveur.on('error', (erreur) => {
  console.error(erreur);
  process.exit(1);
});
