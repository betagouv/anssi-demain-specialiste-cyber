import { ExpediteurEmail } from '../metier/expediteurEmail';
import { AdaptateurEnvironnement } from './adaptateurEnvironnement';
import { creePosteRessourceHttp, PosteRessourceHttp } from './clientHttp';

export type ReponseBrevo = {
  status: string;
};

export class AdaptateurEmailBrevo implements ExpediteurEmail {
  constructor(
    private readonly adaptateurEnvironnement: AdaptateurEnvironnement,
    private readonly posteurtHttp: PosteRessourceHttp<ReponseBrevo>,
  ) {}
  async creeContact({
    email,
    prenom,
    nom,
    infolettreAcceptee,
  }: {
    email: string;
    prenom: string;
    nom: string;
    infolettreAcceptee: boolean;
  }) {
    await this.posteurtHttp(
      `${this.adaptateurEnvironnement.expediteurEmail().urlDeBase()}contacts`,
      {
        updateEnabled: true,
        email,
        emailBlacklisted: !infolettreAcceptee,
        attributes: {
          PRENOM: prenom,
          NOM: nom,
        },
      },
      {
        headers: {
          'api-key': this.adaptateurEnvironnement.expediteurEmail().cleAPI(),
          accept: 'application/json',
          'content-type': 'application/json',
        },
      },
    );
  }
}

export class AdaptateurEmailConsole implements ExpediteurEmail {
  constructor() {}
  async creeContact({
    email,
    prenom,
    nom,
    infolettreAcceptee,
  }: {
    email: string;
    prenom: string;
    nom: string;
    infolettreAcceptee: boolean;
  }) {
    // eslint-disable-next-line no-console
    console.log(
      `On crée le compte pour l'utilisateur ${email} avec prénom ${prenom} et nom ${nom} avec l'infolettre ${infolettreAcceptee}`,
    );
  }
}

export const fabriqueExpediteurEmail = ({
  adaptateurEnvironnement,
  posteurtHttp = creePosteRessourceHttp(),
}: {
  adaptateurEnvironnement: AdaptateurEnvironnement;
  posteurtHttp?: PosteRessourceHttp<ReponseBrevo>;
}) => {
  if (
    adaptateurEnvironnement.expediteurEmail().urlDeBase() &&
    adaptateurEnvironnement.expediteurEmail().cleAPI()
  ) {
    return new AdaptateurEmailBrevo(adaptateurEnvironnement, posteurtHttp);
  }
  return new AdaptateurEmailConsole();
};
