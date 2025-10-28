import { Router } from 'express';

import { ConfigurationServeur } from '../configurationServeur';

const ressourceApresAuthentificationOIDC = ({
  adaptateurOIDC,
  adaptateurJWT,
  entrepotUtilisateur,
  adaptateurHachage,
  adaptateurEnvironnement,
}: ConfigurationServeur) => {
  const routeur = Router();
  routeur.get('/', async (requete, reponse) => {
    if (!requete.cookies.AgentConnectInfo) {
      reponse.sendStatus(401);
      return;
    }

    try {
      const { accessToken, idToken } =
        await adaptateurOIDC.recupereJeton(requete);
      const informationsUtilisateur =
        await adaptateurOIDC.recupereInformationsUtilisateur(accessToken);
      const { email } = informationsUtilisateur;

      if (!estAutorise(email, adaptateurEnvironnement.listeEmailsAutorises())) {
        return reponse.redirect(`/non-autorise`);
      }

      if (!(await entrepotUtilisateur.existe(adaptateurHachage.hache(email)))) {
        const token = adaptateurJWT.genereToken(informationsUtilisateur);
        reponse.redirect(`/creation-compte?token=${token}`);
        return;
      }

      requete.session = { ...requete.session, ...informationsUtilisateur };
      requete.session.token = adaptateurJWT.genereToken({ email });
      requete.session.AgentConnectIdToken = idToken;
      reponse.render(`apres-authentification`);
    } catch (e: unknown | Error) {
      // eslint-disable-next-line no-console
      console.error('Erreur après authentification', e);
      reponse.sendStatus(401);
    }
  });
  return routeur;
};

const estAutorise = (email: string, listeEmailAutorises: string[]): boolean => {
  const positionDernierArobase = email.lastIndexOf('@');
  if (positionDernierArobase < 0) return false;
  return listeEmailAutorises.includes(email.slice(positionDernierArobase + 1));
};

export { ressourceApresAuthentificationOIDC };
