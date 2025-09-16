import { render } from '@testing-library/svelte/svelte5';
import { describe, expect, it } from 'vitest';
import NouveauJeu from '../src/NouveauJeu.svelte';

describe('Le formulaire de dépose de jeu', () => {
  describe('propose', () => {
    it('de saisir le nom du jeu', () => {
      const { getByRole } = render(NouveauJeu);

      expect(getByRole('textbox', { name: 'Nom du jeu' })).toBeVisible();
    });
  });
});
