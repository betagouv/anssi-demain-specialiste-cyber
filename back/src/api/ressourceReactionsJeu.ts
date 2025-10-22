import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceReactionsJeu = (
  configurationServeur: ConfigurationServeur,
) => {
  const routeur = Router();
  routeur.post('/:idJeu/reactions', async (_requete, reponse) => {
    const jeu = await configurationServeur.entrepotJeux.parId(
      _requete.params.idJeu,
    );

    jeu!.reactions['coeur'] = jeu!.reactions['coeur'] + 1;

    await configurationServeur.entrepotJeux.metsAjour(jeu!);

    reponse.sendStatus(200);
  });

  return routeur;
};
