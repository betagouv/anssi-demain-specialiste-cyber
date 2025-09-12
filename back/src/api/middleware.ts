import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { randomBytes } from 'node:crypto';
import z from 'zod';
import { ConfigurationServeurSansMiddleware } from './configurationServeur';

type FonctionMiddleware<TBody> = (
  requete: Request<unknown, unknown, TBody, unknown, never>,
  reponse: Response,
  suite: NextFunction,
) => Promise<void>;

export type Middleware = {
  verifieModeMaintenance: FonctionMiddleware<unknown>;
  valideLaCoherenceDuCorps: <
    TZod extends z.ZodType,
    TBody extends z.infer<TZod>,
  >(
    object: TZod,
  ) => FonctionMiddleware<TBody>;
};

export type RequeteNonTypee = Request<
  unknown,
  unknown,
  unknown,
  unknown,
  never
>;

export const fabriqueMiddleware = ({
  adaptateurEnvironnement,
}: ConfigurationServeurSansMiddleware): Middleware => {
  const verifieModeMaintenance = async (
    _requete: RequeteNonTypee,
    reponse: Response,
    suite: NextFunction,
  ) => {
    if (adaptateurEnvironnement.maintenance().actif()) {
      const nonce = randomBytes(24).toString('base64');
      reponse
        .status(HttpStatusCode.ServiceUnavailable)
        .set('Content-Type', 'text/html')
        .render('maintenance', { nonce });
    } else {
      suite();
    }
  };

  const valideLaCoherenceDuCorps =
    <TZod extends z.ZodType, TBody extends z.infer<TZod>>(objet: TZod) =>
    async (
      requete: Request<unknown, unknown, TBody, unknown, never>,
      reponse: Response,
      suite: NextFunction,
    ) => {
      const resultat = objet.safeParse(requete.body);
      if (!resultat.success) {
        reponse.status(400).json({ erreur: resultat.error.issues[0].message });
      } else {
        suite();
      }
    };

  return {
    verifieModeMaintenance,
    valideLaCoherenceDuCorps,
  };
};
