import { Router } from 'express';
import { ConfigurationServeur } from './dsc';

export const ressourceCreationCompte = (
  {
    adaptateurJWT,
    moteurDeRendu
  }: ConfigurationServeur
) => {
  const routeur = Router();

  routeur.get('/', (requete, reponse) => {
    const token = requete.query.token;
    if (!token) return reponse.sendStatus(400);

    const informationsProfessionnelles =
      adaptateurJWT.decode(token as string);
    
    moteurDeRendu.rends(reponse, 'creation-compte', {
      informationsProfessionnelles: {
        nom: informationsProfessionnelles.nom,
        prenom: informationsProfessionnelles.prenom,
        email: informationsProfessionnelles.email,
        organisation: { departement: '75', nom: 'TEST', siret: informationsProfessionnelles.siret }, 
      },
    });
  });

  return routeur;
};
