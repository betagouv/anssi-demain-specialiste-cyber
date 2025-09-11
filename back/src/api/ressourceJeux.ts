import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { Jeu } from '../metier/jeu';
import { ConfigurationServeur } from './dsc';
import z from 'zod';

export const ressourceJeux = ({
  adaptateurJWT,
  entrepotJeux,
}: ConfigurationServeur) => {
  const routeur = Router();

  const schema = z.strictObject({
    nom: z
      .string('Le nom est obligatoire')
      .trim()
      .min(1, 'Le nom est obligatoire'),
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
      try {
        adaptateurJWT.decode(requete.session?.token);
        const { nom } = requete.body;
        entrepotJeux.ajoute(new Jeu({ nom }));
        reponse.sendStatus(201);
      } catch {
        reponse.sendStatus(401);
      }
    },
  );
  return routeur;
};
