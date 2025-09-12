import { AdaptateurHachage } from '../../../infra/adaptateurHachage';

import { AdaptateurJournal } from '../../../infra/adaptateurJournal';
import { FournisseurHorloge } from '../../../infra/FournisseurHorloge';
import { JeuCree } from './jeuCree';

export const consigneEvenementJeuCreeDansJournal = ({
  adaptateurJournal,
  adaptateurHachage,
}: {
  adaptateurJournal: AdaptateurJournal;
  adaptateurHachage: AdaptateurHachage;
}) => {
  return async (evenement: JeuCree) => {
    await adaptateurJournal.consigneEvenement({
      donnees: {
        idUtilisateur: adaptateurHachage.hache(evenement.emailAuteur),
        nom: evenement.nom,
      },
      type: 'JEU_CREE',
      date: FournisseurHorloge.maintenant(),
    });
  };
};
