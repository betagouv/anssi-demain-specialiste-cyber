import { describe, expect, it } from 'vitest';
import { CompteCree } from '../../../src/bus/evenements/compteCree/compteCree';
import { consigneEvenementCompteCreeDansJournal } from '../../../src/bus/evenements/compteCree/consigneEvenementCompteCreeDansJournal';
import { AdaptateurHachage } from '../../../src/infra/adaptateurHachage';
import { AdaptateurJournal } from '../../../src/infra/adaptateurJournal';
import { fauxAdaptateurHachage } from '../../api/fauxObjets';
import { FournisseurHorlogeDeTest } from '../../infra/fournisseurHorlogeDeTest';

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
    })(new CompteCree('u1@mail.com', 'dupont', 'jean', false, false));

    expect(evenementRecu).toStrictEqual({
      type: 'NOUVEL_UTILISATEUR_INSCRIT',
      donnees: { idUtilisateur: 'u1@mail.com-hacheHMAC' },
      date: new Date('2025-03-10'),
    });
  });
});
