import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { AdaptateurJournal } from '../infra/adaptateurJournal';
import { ExpediteurEmail } from '../metier/expediteurEmail';
import { MessagerieInstantanee } from '../metier/messagerieInstantanee';
import { BusEvenements } from './busEvenements';
import { CompteCree } from './evenements/compteCree/compteCree';
import { consigneEvenementCompteCreeDansJournal } from './evenements/compteCree/consigneEvenementCompteCreeDansJournal';
import { creeContactDansExpediteurEmail } from './evenements/compteCree/creeContactDansExpediteurEmail';
import { envoieEmailDeBienvenue } from './evenements/compteCree/envoieEmailDeBienvenue';
import { consigneEvenementJeuCreeDansJournal } from './evenements/jeu/consigneEvenementJeuCreeDansJournal';
import { JeuCree } from './evenements/jeu/jeuCree';
import { notifieEvenementJeuCreeSurMessagerieInstantanee } from './evenements/jeu/notifieEvenementJeuCreeSurMessagerieInstantanee';

type Cablage = {
  adaptateurJournal: AdaptateurJournal;
  adaptateurHachage: AdaptateurHachage;
  busEvenements: BusEvenements;
  messagerieInstantanee: MessagerieInstantanee;
  expediteurEmail: ExpediteurEmail;
};

export const cableTousLesAbonnes = ({
  busEvenements,
  adaptateurJournal,
  adaptateurHachage,
  expediteurEmail,
  messagerieInstantanee,
}: Cablage) => {
  busEvenements.abonnePlusieurs(CompteCree, [
    consigneEvenementCompteCreeDansJournal({
      adaptateurJournal,
      adaptateurHachage,
    }),
    creeContactDansExpediteurEmail({
      expediteurEmail,
    }),
    envoieEmailDeBienvenue({
      expediteurEmail,
    }),
  ]);

  busEvenements.abonne(
    JeuCree,
    consigneEvenementJeuCreeDansJournal({
      adaptateurJournal,
      adaptateurHachage,
    }),
  );

  busEvenements.abonne(
    JeuCree,
    notifieEvenementJeuCreeSurMessagerieInstantanee(messagerieInstantanee),
  );
};
