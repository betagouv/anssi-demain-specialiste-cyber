import { describe, expect, it } from 'vitest';
import { fauxAdaptateurHachage } from '../../api/fauxObjets';
import { AdaptateurHachage } from '../../../src/infra/adaptateurHachage';
import { consigneEvenementCompteCreeDansJournal } from '../../../src/bus/evenements/compteCree/consigneEvenementCompteCreeDansJournal';
import { CompteCree } from '../../../src/bus/evenements/compteCree/compteCree';
import { AdaptateurJournal } from '../../../src/infra/adaptateurJournal';
import { FournisseurHorloge } from '../../../src/infra/FournisseurHorloge';

export class FournisseurHorlogeDeTest {
  static initialise(maintenant: Date) {
    FournisseurHorloge.maintenant = () => maintenant;
  }
}

describe("L'abonnement qui consigne la création d'un compte utilisateur dans le journal", () => {
  it('consigne un évènement de NouvelUtilisateurInscrit', async () => {
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

    await consigneEvenementCompteCreeDansJournal({
      adaptateurJournal,
      adaptateurHachage,
    })(new CompteCree('u1@mail.com', 'dupont', 'jean', false));

    expect(evenementRecu).toStrictEqual({
      type: 'NOUVEL_UTILISATEUR_INSCRIT',
      donnees: { idUtilisateur: 'u1@mail.com-hacheHMAC' },
      date: new Date('2025-03-10'),
    });
  });
});
