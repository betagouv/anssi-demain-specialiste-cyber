import { describe, expect, it } from 'vitest';
import { CompteCree } from '../../../src/bus/evenements/compteCree/compteCree';
import { creeContactDansExpediteurEmail } from '../../../src/bus/evenements/compteCree/creeContactDansExpediteurEmail';
import { ExpediteurEmail } from '../../../src/metier/expediteurEmail';

describe("L'abonnement qui crée un contact", () => {
  it("crée un contact dans l'expediteur de mails", () => {
    let contactCree;
    const expediteurEmail: ExpediteurEmail = {
      creeContact: async (donneesRecu: {
        email: string;
        nom: string;
        prenom: string;
        infolettreAcceptee: boolean;
      }) => {
        contactCree = { ...donneesRecu };
      },
    };

    creeContactDansExpediteurEmail({ expediteurEmail })(
      new CompteCree('jeanne.dupond@mail.fr', 'Jeanne', 'Dupont', true),
    );

    expect(contactCree).toStrictEqual({
      email: 'jeanne.dupond@mail.fr',
      prenom: 'Jeanne',
      nom: 'Dupont',
      infolettreAcceptee: true,
    });
  });
});
