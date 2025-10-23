import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceReactionsJeu = (
  configurationServeur: ConfigurationServeur,
) => {
  const routeur = Router();
  routeur.post('/:idJeu/reactions', async (requete, reponse) => {
    const jeu = await configurationServeur.entrepotJeux.parId(
      requete.params.idJeu,
    );

    switch (requete.body.action) {
      case 'ajout':
        jeu!.incrementeReaction(requete.body.type);
        break;
      case 'retrait':
        jeu!.decrementeReaction(requete.body.type);
        break;
    }

    await configurationServeur.entrepotJeux.metsAjour(jeu!);

    reponse.sendStatus(200);
  });

  return routeur;
};
