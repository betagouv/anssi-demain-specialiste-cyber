import { describe, expect, it } from 'vitest';
import { JeuCree } from '../../../src/bus/evenements/jeu/jeuCree';
import { FournisseurHorloge } from '../../../src/infra/FournisseurHorloge';
import {
  MessagerieInstantanee,
  RetourEvaluation,
} from '../../../src/metier/messagerieInstantanee';
import { notifieEvenementJeuCreeSurMessagerieInstantanee } from '../../../src/bus/evenements/jeu/notifieEvenementJeuCreeSurMessagerieInstantanee';

export class FournisseurHorlogeDeTest {
  static initialise(maintenant: Date) {
    FournisseurHorloge.maintenant = () => maintenant;
  }
}

describe("L'abonnement qui consigne la création d'un nouveau jeu dans Mattermost", () => {
  it('notifie un évènement de JeuCree', async () => {
    let retourRecu;
    const messagerieInstantanee: MessagerieInstantanee = {
      notifieUnRetourEvaluation: async (retourExperience: RetourEvaluation) => {
        retourRecu = retourExperience;
      },
    };
    FournisseurHorlogeDeTest.initialise(new Date('2025-03-10'));

    await notifieEvenementJeuCreeSurMessagerieInstantanee(
      messagerieInstantanee,
    )(
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

    expect(retourRecu).toStrictEqual<RetourEvaluation>({
      nomJeu: 'cyberUno',
      precisions: 'Des précisions',
    });
  });

  it('aseptise les précisions', async () => {
    let retourRecu;
    const messagerieInstantanee: MessagerieInstantanee = {
      notifieUnRetourEvaluation: async (retourExperience: RetourEvaluation) => {
        retourRecu = retourExperience;
      },
    };
    FournisseurHorlogeDeTest.initialise(new Date('2025-03-10'));

    await notifieEvenementJeuCreeSurMessagerieInstantanee(
      messagerieInstantanee,
    )(
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
        '### Des précisions [URL](coucou)',
      ),
    );

    expect(retourRecu).toStrictEqual<RetourEvaluation>({
      nomJeu: 'cyberUno',
      precisions: '\\#\\#\\# Des précisions \\[URL\\]\\(coucou\\)',
    });
  });

  it('aseptise le nom', async () => {
    let retourRecu;
    const messagerieInstantanee: MessagerieInstantanee = {
      notifieUnRetourEvaluation: async (retourExperience: RetourEvaluation) => {
        retourRecu = retourExperience;
      },
    };
    FournisseurHorlogeDeTest.initialise(new Date('2025-03-10'));

    await notifieEvenementJeuCreeSurMessagerieInstantanee(
      messagerieInstantanee,
    )(
      new JeuCree(
        'u1@mail.com',
        '## cyberUno',
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
        'précisions',
      ),
    );

    expect(retourRecu).toStrictEqual<RetourEvaluation>({
      nomJeu: '\\#\\# cyberUno',
      precisions: 'précisions',
    });
  });

  it('ne notifie pas un évènement de JeuCree si il n’y a pas de précisions', async () => {
    let retourRecu = false;
    const messagerieInstantanee: MessagerieInstantanee = {
      notifieUnRetourEvaluation: async (
        _retourExperience: RetourEvaluation,
      ) => {
        retourRecu = true;
      },
    };
    FournisseurHorlogeDeTest.initialise(new Date('2025-03-10'));

    await notifieEvenementJeuCreeSurMessagerieInstantanee(
      messagerieInstantanee,
    )(
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

    expect(retourRecu).toBeFalsy();
  });
});
