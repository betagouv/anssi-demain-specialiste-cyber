import { AdaptateurHachage } from '../../../infra/adaptateurHachage';
import { CompteCree } from './compteCree';
import { AdaptateurJournal } from '../../../infra/adaptateurJournal';
import { FournisseurHorloge } from '../../../infra/FournisseurHorloge';

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
