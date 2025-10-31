import { Router } from 'express';

import { ConfigurationServeur } from './configurationServeur';
import { filetRouteAsynchrone } from './middleware';

export const ressourceCreationCompte = ({
  adaptateurJWT,
  adaptateurRechercheEntreprise,
  moteurDeRendu,
}: ConfigurationServeur) => {
  const routeur = Router();

  routeur.get(
    '/',
    filetRouteAsynchrone(async (requete, reponse) => {
      const token = requete.query.token;
      if (!token) return reponse.sendStatus(400);

      try {
        const informationsProfessionnelles = adaptateurJWT.decode(
          token as string,
        );

        const organisation =
          await adaptateurRechercheEntreprise.rechercheOrganisationParSiret(
            informationsProfessionnelles.siret,
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
          token,
        });
      } catch {
        return reponse.sendStatus(400);
      }
    }),
  );

  return routeur;
};
