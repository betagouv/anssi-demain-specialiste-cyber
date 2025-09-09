import { Router } from 'express';
import { ConfigurationServeur } from './dsc';

export const ressourceCreationCompte = ({
  adaptateurJWT,
  adaptateurRechercheEntreprise,
  moteurDeRendu,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get('/', async (requete, reponse) => {
    const token = requete.query.token;
    if (!token) return reponse.sendStatus(400);

    const informationsProfessionnelles = adaptateurJWT.decode(token as string);

    const organisation =
      await adaptateurRechercheEntreprise.rechercheOrganisationParSiret(
        informationsProfessionnelles.siret
      );

    moteurDeRendu.rends(reponse, 'creation-compte', {
      informationsProfessionnelles: {
        nom: informationsProfessionnelles.nom,
        prenom: informationsProfessionnelles.prenom,
        email: informationsProfessionnelles.email,
        organisation: {
          departement: organisation?.departement,
          nom: organisation?.nom,
          siret: informationsProfessionnelles.siret,
        },
      },
    });
  });

  return routeur;
};
