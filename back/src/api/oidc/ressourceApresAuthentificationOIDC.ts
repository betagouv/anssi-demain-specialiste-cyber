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
      const { accessToken, idToken, sujet } =
        await adaptateurOIDC.recupereJeton(requete);
      const informationsUtilisateur =
        await adaptateurOIDC.recupereInformationsUtilisateur(
          accessToken,
          sujet,
        );
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

      const sessionEncodee = Buffer.from(
        JSON.stringify(requete.session),
      ).toString('base64');

      // eslint-disable-next-line no-console
      console.info(
        JSON.stringify({
          evenement: 'diagnostic-session-oidc',
          protocol: requete.protocol,
          secure: requete.secure,
          forwardedProto: requete.get('x-forwarded-proto'),
          trustProxy: requete.app.get('trust proxy'),
          idTokenLength: idToken.length,
          sessionCookieValueLength: Buffer.byteLength(sessionEncodee),
        }),
      );

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
