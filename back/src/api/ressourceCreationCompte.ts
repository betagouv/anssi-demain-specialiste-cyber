import { Router } from 'express';
import { ConfigurationServeur } from './dsc';

export const ressourceCreationCompte = (
  configurationServeur: ConfigurationServeur
) => {
  const routeur = Router();

  routeur.get('/', (requete, reponse) => {
    const token = requete.query.token;
    if (!token) return reponse.sendStatus(400);

    const informationsProfessionnelles =
      configurationServeur.adaptateurJWT.decode(token as string);
    configurationServeur.moteurDeRendu.rends(reponse, 'creation-compte', {
      informationsProfessionnelles,
    });
  });

  return routeur;
};
