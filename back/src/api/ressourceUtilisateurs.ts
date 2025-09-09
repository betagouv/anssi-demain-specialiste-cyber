import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { Utilisateur } from '../metier/utilisateur';
import { ConfigurationServeur } from './dsc';
import z from 'zod';

const ressourceUtilisateurs = ({
  entrepotUtilisateur,
  adaptateurJWT,
}: ConfigurationServeur) => {
  const routeur = Router();

  const schema = z.object({
    infolettreAcceptee: z.boolean({
      message: "L'acceptation de l'infolettre est invalide",
    }),
  });

  const valideLaCoherenceDuCorps = (objet: z.ZodType): RequestHandler => {
    return async (requete: Request, reponse: Response, suite: NextFunction) => {
      const resultat = objet.safeParse(requete.body);
      if (!resultat.success) {
        return reponse
          .status(400)
          .json({ erreur: resultat.error.issues[0].message });
      }
      return suite();
    };
  };

  routeur.post(
    '/',
    valideLaCoherenceDuCorps(schema),
    async (requete: Request, reponse: Response) => {
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
    }
  );
  return routeur;
};

export { ressourceUtilisateurs };
