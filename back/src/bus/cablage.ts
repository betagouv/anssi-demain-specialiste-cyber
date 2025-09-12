import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { AdaptateurJournal } from '../infra/adaptateurJournal';
import { BusEvenements } from './busEvenements';
import { CompteCree } from './evenements/compteCree/compteCree';
import { consigneEvenementCompteCreeDansJournal } from './evenements/compteCree/consigneEvenementCompteCreeDansJournal';
import { consigneEvenementJeuCreeDansJournal } from './evenements/jeu/consigneEvenementJeuCreeDansJournal';
import { JeuCree } from './evenements/jeu/jeuCree';

type Cablage = {
  adaptateurJournal: AdaptateurJournal;
  adaptateurHachage: AdaptateurHachage;
  busEvenements: BusEvenements;
};

export const cableTousLesAbonnes = ({
  busEvenements,
  adaptateurJournal,
  adaptateurHachage,
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
};
