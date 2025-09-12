import { AdaptateurJournal } from '../infra/adaptateurJournal';
import { AdaptateurHachage } from '../infra/adaptateurHachage';
import { BusEvenements } from './busEvenements';
import { CompteCree } from './evenements/compteCree/compteCree';
import { consigneEvenementCompteCreeDansJournal } from './evenements/compteCree/consigneEvenementCompteCreeDansJournal';

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
};
