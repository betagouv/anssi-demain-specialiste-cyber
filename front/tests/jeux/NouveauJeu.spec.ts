import { render } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NouveauJeu from '../../src/jeux/NouveauJeu.svelte';

const axiosMock = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock('axios', () => {
  return { default: axiosMock };
});

describe('Le formulaire de dépose de jeu', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });
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

    it("de saisir un nom d'établissement", () => {
      const { getByRole } = render(NouveauJeu);

      expect(
        getByRole('textbox', { name: 'Nom de votre établissement' }),
      ).toBeVisible();
    });
  });

  describe('lors de la soumission', () => {
    it("envoie le formulaire à l'api des jeux", async () => {
      const { getByRole, queryAllByRole } = render(NouveauJeu);

      await user.type(getByRole('textbox', { name: 'Nom du jeu' }), 'TEST');
      await user.type(
        getByRole('textbox', { name: 'Nom de votre établissement' }),
        'Mon lycée',
      );
      await user.click(getByRole('radio', { name: 'Heure de cours' }));
      await user.click(getByRole('button', { name: 'Terminer' }));

      expect(axiosMock.post).toHaveBeenCalledExactlyOnceWith('/api/jeux', {
        nom: 'TEST',
        sequence: 'heure',
        nomEtablissement: 'Mon lycée',
      });
      expect(queryAllByRole('alert')).toHaveLength(0);
    });

    it("n'envoie pas le formulaire si il y a un souci de validation", async () => {
      const { getByRole, getByText } = render(NouveauJeu);

      await user.click(getByRole('button', { name: 'Terminer' }));

      expect(axiosMock.post).not.toHaveBeenCalled();
      expect(getByText('Le nom est obligatoire')).toBeVisible();
      expect(
        getByText("Le nom de l'établissement est obligatoire"),
      ).toBeVisible();
      expect(getByText('La séquence est obligatoire')).toBeVisible();
    });
  });
});
