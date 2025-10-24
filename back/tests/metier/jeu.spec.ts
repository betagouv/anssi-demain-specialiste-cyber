import { describe, expect, it } from 'vitest';
import { cybercluedo } from '../api/objetsPretsALEmploi';

describe('le jeu', () => {
  it("ajoute une réaction à un jeu s’l n'y en a pas", () => {
    cybercluedo.incrementeReaction('feu');

    expect(cybercluedo.reactions['feu']).toBe(1);
  });

  it("empêche une réaction d'être négative lorsqu’elle est nulle", () => {
    cybercluedo.reactions['feu'] = 0;

    cybercluedo.decrementeReaction('feu');

    expect(cybercluedo.reactions['feu']).toBe(0);
  });

  it("empêche une réaction d'être décrémentée lorsqu’elle n’est pas définie", () => {
    cybercluedo.reactions = {}

    cybercluedo.decrementeReaction('feu');

    expect(cybercluedo.reactions['feu']).toBe(undefined);
  });

});
