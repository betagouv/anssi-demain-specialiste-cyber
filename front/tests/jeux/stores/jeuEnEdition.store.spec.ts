import { describe, expect, it } from 'vitest';
import { get } from 'svelte/store';
import { jeuEnEditionStore } from '../../../src/jeux/stores/jeuEnEdition.store';

describe("Le store d'un jeu en édition", () => {
  it("par défaut, renvoie un jeu en édition vide", () => {
    const jeuEnEdition = get(jeuEnEditionStore)
    expect(jeuEnEdition).toStrictEqual({})
  });

  it("permet de modifier le jeu en édition", () => {
    jeuEnEditionStore.set({ nom: 'Cybercluedo' })

    const jeuEnEdition = get(jeuEnEditionStore)

    expect(jeuEnEdition).toStrictEqual({ nom: 'Cybercluedo' })
  })
});
