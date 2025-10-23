import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceReactionsJeu = ({
  entrepotJeux,
}: ConfigurationServeur) => {
  const routeur = Router();
  routeur.post('/:idJeu/reactions', async (requete, reponse) => {
    const jeu = await entrepotJeux.parId(requete.params.idJeu);

    if (!jeu) return reponse.sendStatus(404);

    switch (requete.body.action) {
      case 'ajout':
        jeu.incrementeReaction(requete.body.type);
        break;
      case 'retrait':
        jeu.decrementeReaction(requete.body.type);
        break;
    }

    await entrepotJeux.metsAjour(jeu);

    reponse.sendStatus(200);
  });

  return routeur;
};
