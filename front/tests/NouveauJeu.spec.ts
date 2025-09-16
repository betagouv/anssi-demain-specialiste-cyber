import { render } from '@testing-library/svelte/svelte5';
import { describe, expect, it } from 'vitest';
import NouveauJeu from '../src/NouveauJeu.svelte';

describe('Le formulaire de dépose de jeu', () => {
  describe('propose', () => {
    it('de saisir le nom du jeu', () => {
      const { getByRole } = render(NouveauJeu);

      expect(getByRole('textbox', { name: 'Nom du jeu' })).toBeVisible();
    });

    it('de selectionner une séquence', () => {
      const { getAllByRole, getByRole } = render(NouveauJeu);

      expect(getAllByRole('radio')).toHaveLength(3);
      expect(getByRole('radio', { name: 'Heure de cours' })).toBeVisible();
      expect(getByRole('radio', { name: 'Demi-journee' })).toBeVisible();
      expect(getByRole('radio', { name: 'Journée' })).toBeVisible();
    });
  });
});
