import { Router } from 'express';
import { ConfigurationServeur } from './configurationServeur';

export const ressourceJeu = ({ entrepotJeux }: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/:id', async (requete, reponse) => {
    const jeu = await entrepotJeux.parId(requete.params.id);
    if (!jeu) {
      reponse.sendStatus(404);
      return;
    }
    reponse.send({ ...jeu, enseignant: jeu.enseignant?.prenom ?? '' });
  });

  return routeur;
};
