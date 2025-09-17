import { describe, expect, it } from 'vitest';
import { consigneEvenementJeuCreeDansJournal } from '../../../src/bus/evenements/jeu/consigneEvenementJeuCreeDansJournal';
import { JeuCree } from '../../../src/bus/evenements/jeu/jeuCree';
import { AdaptateurHachage } from '../../../src/infra/adaptateurHachage';
import { AdaptateurJournal } from '../../../src/infra/adaptateurJournal';
import { FournisseurHorloge } from '../../../src/infra/FournisseurHorloge';
import { fauxAdaptateurHachage } from '../../api/fauxObjets';

export class FournisseurHorlogeDeTest {
  static initialise(maintenant: Date) {
    FournisseurHorloge.maintenant = () => maintenant;
  }
}

describe("L'abonnement qui consigne la création d'un nouveau jeu dans le journal", () => {
  it('consigne un évènement de JeuCree', async () => {
    let evenementRecu;
    const adaptateurJournal: AdaptateurJournal = {
      consigneEvenement: async (donneesEvenement: unknown) => {
        evenementRecu = donneesEvenement;
      },
    };
    FournisseurHorlogeDeTest.initialise(new Date('2025-03-10'));

    const adaptateurHachage: AdaptateurHachage = {
      ...fauxAdaptateurHachage,
      hache: (valeur) => `${valeur}-hacheHMAC`,
    };

    await consigneEvenementJeuCreeDansJournal({
      adaptateurJournal,
      adaptateurHachage,
    })(
      new JeuCree(
        'u1@mail.com',
        'cyberUno',
        'heure',
        'Lycée de la mer',
        'cp',
        'mathematiques',
      ),
    );

    expect(evenementRecu).toStrictEqual({
      type: 'JEU_CREE',
      donnees: {
        idUtilisateur: 'u1@mail.com-hacheHMAC',
        nom: 'cyberUno',
        sequence: 'heure',
        nomEtablissement: 'Lycée de la mer',
        classe: 'cp',
        discipline: 'mathematiques',
      },
      date: new Date('2025-03-10'),
    });
  });
});
