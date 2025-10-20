import { describe, expect, it } from 'vitest';
import { consigneEvenementJeuCreeDansJournal } from '../../../src/bus/evenements/jeu/consigneEvenementJeuCreeDansJournal';
import { JeuCree } from '../../../src/bus/evenements/jeu/jeuCree';
import { AdaptateurHachage } from '../../../src/infra/adaptateurHachage';
import { AdaptateurJournal } from '../../../src/infra/adaptateurJournal';
import { fauxAdaptateurHachage } from '../../api/fauxObjets';
import { FournisseurHorlogeDeTest } from '../../infra/fournisseurHorlogeDeTest';

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
        3,
        'simulation',
        ['menace-cyber', 'orientation'],
        1,
        2,
        3,
        1,
        true,
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
        nombreEleves: 3,
        categorie: 'simulation',
        thematiques: ['menace-cyber', 'orientation'],
        nombreTemoignages: 1,
        evaluationDecouverte: 2,
        evaluationInteret: 3,
        evaluationSatisfactionGenerale: 1,
        consentement: true,
      },
      date: new Date('2025-03-10'),
    });
  });

  it('Ne consigne pas les précisions sur un évènement de JeuCree', async () => {
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
        3,
        'simulation',
        ['menace-cyber', 'orientation'],
        1,
        2,
        3,
        1,
        true,
        'Des précisions',
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
        nombreEleves: 3,
        categorie: 'simulation',
        thematiques: ['menace-cyber', 'orientation'],
        nombreTemoignages: 1,
        evaluationDecouverte: 2,
        evaluationInteret: 3,
        evaluationSatisfactionGenerale: 1,
        consentement: true,
      },
      date: new Date('2025-03-10'),
    });
  });
});
