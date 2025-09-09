import { Request, Response, Router } from 'express';
import { Utilisateur } from '../metier/utilisateur';
import { ConfigurationServeur } from './dsc';

const ressourceUtilisateurs = ({
  entrepotUtilisateur,
  adaptateurJWT,
}: ConfigurationServeur) => {
  const routeur = Router();
  routeur.post('/', async (requete: Request, reponse: Response) => {
    const { infolettreAcceptee, token } = requete.body;

    try {
      const { email, nom, prenom, siret } = adaptateurJWT.decode(token);

      const utilisateur = new Utilisateur({
        email,
        prenom,
        nom,
        siretEntite: siret,
        infolettreAcceptee,
      });

      await entrepotUtilisateur.ajoute(utilisateur);

      reponse.sendStatus(201);
    } catch {
      reponse.status(400).send({ erreur: 'Le token est invalide' });
    }
  });
  return routeur;
};

export { ressourceUtilisateurs };
