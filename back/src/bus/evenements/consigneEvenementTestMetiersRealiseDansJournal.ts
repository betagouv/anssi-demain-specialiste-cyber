import { AdaptateurJournal } from '../../infra/adaptateurJournal';
import { FournisseurHorloge } from '../../infra/FournisseurHorloge';
import { TestMétiersRéalisé } from './TestMetiersRealise';

export const consigneEvenementTestMétiersRéaliséDansJournal = ({
  adaptateurJournal,
}: {
  adaptateurJournal: AdaptateurJournal;
}) => {
  return async (evenement: TestMétiersRéalisé) => {
    await adaptateurJournal.consigneEvenement({
      donnees: {
        réponses: evenement.réponses,
        suggestions: evenement.suggestions,
      },
      type: 'TEST_MÉTIER_RÉALISÉ',
      date: FournisseurHorloge.maintenant(),
    });
  };
};
