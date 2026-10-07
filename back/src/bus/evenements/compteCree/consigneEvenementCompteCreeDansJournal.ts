import { AdaptateurHachage } from '../../../infra/adaptateurHachage';
import { AdaptateurJournal } from '../../../infra/adaptateurJournal';
import { FournisseurHorloge } from '../../../infra/FournisseurHorloge';
import { CompteCree } from './compteCree';

export const consigneEvenementCompteCreeDansJournal = ({
  adaptateurJournal,
  adaptateurHachage,
}: {
  adaptateurJournal: AdaptateurJournal;
  adaptateurHachage: AdaptateurHachage;
}) => {
  return async (evenement: CompteCree) => {
    await adaptateurJournal.consigneEvenement({
      donnees: {
        idUtilisateur: adaptateurHachage.hache(evenement.email),
      },
      type: 'NOUVEL_UTILISATEUR_INSCRIT',
      date: FournisseurHorloge.maintenant(),
    });
  };
};
