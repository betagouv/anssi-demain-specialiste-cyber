import { describe, expect, it } from 'vitest';
import { consigneEvenementTestMétiersRéaliséDansJournal } from '../../../src/bus/evenements/consigneEvenementTestMetiersRealiseDansJournal';
import { TestMétiersRéalisé } from '../../../src/bus/evenements/TestMetiersRealise';
import { AdaptateurJournal } from '../../../src/infra/adaptateurJournal';
import { FournisseurHorlogeDeTest } from '../../infra/fournisseurHorlogeDeTest';

describe("L'abonnement qui consigne la réalisation d'un test des métiers dans le journal", () => {
  it('consigne un évènement de TestMétiersRéalisé', async () => {
    let evenementRecu;
    const adaptateurJournal: AdaptateurJournal = {
      consigneEvenement: async (donneesEvenement: unknown) => {
        evenementRecu = donneesEvenement;
      },
    };
    FournisseurHorlogeDeTest.initialise(new Date('2025-03-10'));

    await consigneEvenementTestMétiersRéaliséDansJournal({ adaptateurJournal })(
      new TestMétiersRéalisé(
        [1, 2, 3, 4, 5],
        [
          { correspondance: 0.9, nom: 'Analyste SOC' },
          { correspondance: 0.5, nom: 'Pentesteur' },
        ],
      ),
    );

    expect(evenementRecu).toStrictEqual({
      type: 'TEST_MÉTIER_RÉALISÉ',
      donnees: {
        réponses: [1, 2, 3, 4, 5],
        suggestions: [
          { correspondance: 0.9, nom: 'Analyste SOC' },
          { correspondance: 0.5, nom: 'Pentesteur' },
        ],
      },
      date: new Date('2025-03-10'),
    });
  });
});
