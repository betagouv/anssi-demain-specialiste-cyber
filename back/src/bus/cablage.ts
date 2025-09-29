import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { AdaptateurJournal } from '../infra/adaptateurJournal';
import { BusEvenements } from './busEvenements';
import { CompteCree } from './evenements/compteCree/compteCree';
import { consigneEvenementCompteCreeDansJournal } from './evenements/compteCree/consigneEvenementCompteCreeDansJournal';
import { consigneEvenementJeuCreeDansJournal } from './evenements/jeu/consigneEvenementJeuCreeDansJournal';
import { JeuCree } from './evenements/jeu/jeuCree';
import { notifieEvenementJeuCreeSurMessagerieInstantanee } from './evenements/jeu/notifieEvenementJeuCreeSurMessagerieInstantanee';
import { MessagerieInstantanee } from '../metier/messagerieInstantanee';

type Cablage = {
  adaptateurJournal: AdaptateurJournal;
  adaptateurHachage: AdaptateurHachage;
  busEvenements: BusEvenements;
  messagerieInstantanee: MessagerieInstantanee;
};

export const cableTousLesAbonnes = ({
  busEvenements,
  adaptateurJournal,
  adaptateurHachage,
  messagerieInstantanee,
}: Cablage) => {
  busEvenements.abonne(
    CompteCree,
    consigneEvenementCompteCreeDansJournal({
      adaptateurJournal,
      adaptateurHachage,
    }),
  );

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
