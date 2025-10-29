import { describe, expect, it } from 'vitest';
import { CompteCree } from '../../../src/bus/evenements/compteCree/compteCree';
import { envoieEmailDeBienvenue } from '../../../src/bus/evenements/compteCree/envoieEmailDeBienvenue';
import { ExpediteurEmail } from '../../../src/metier/expediteurEmail';

describe("L'abonnement qui crée un contact", () => {
  it('envoie un email de bienvenue', () => {
    let donneesRecue;
    const expediteurEmail: ExpediteurEmail = {
      envoieEmailBienvenue: async (args) => {
        donneesRecue = { ...args };
      },
      creeContact: async function (): Promise<void> {},
    };

    envoieEmailDeBienvenue({ expediteurEmail })(
      new CompteCree('jeanne.dupond@mail.fr', 'Jeanne', 'Dupont', true),
    );

    expect(donneesRecue).toStrictEqual({
      email: 'jeanne.dupond@mail.fr',
      prenom: 'Jeanne',
    });
  });
});
