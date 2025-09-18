import { render, waitFor } from '@testing-library/svelte/svelte5';

import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type JeuEnEdition } from '../../src/jeux/jeu';
import FormulaireNouveauJeu from '../../src/jeux/FormulaireNouveauJeu.svelte';
import { type Validateur } from '../../src/validateur';
import { getByRoleDeep } from '../shadow-dom-utilitaires';

const axiosMock = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock('axios', () => {
  return { default: axiosMock };
});

describe('Le formulaire de dépose de jeu', () => {
  const user = userEvent.setup();

  const validateurEnSuccess: Validateur<JeuEnEdition> = {
    estValide: vi.fn().mockReturnValue(true),
    valide: () => ({
      nom: undefined,
      sequence: undefined,
      nomEtablissement: undefined,
    }),
  };
  const proprietesParDefaut = { validateur: validateurEnSuccess };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('propose', () => {
    it('de saisir le nom du jeu', () => {
      const { getByRole } = render(FormulaireNouveauJeu, proprietesParDefaut);

      expect(getByRole('textbox', { name: 'Nom du jeu' })).toBeVisible();
    });

    it('de selectionner une séquence', () => {
      const { getAllByRole, getByRole } = render(
        FormulaireNouveauJeu,
        proprietesParDefaut,
      );

      expect(getAllByRole('radio')).toHaveLength(3);
      expect(getByRole('radio', { name: 'Heure de cours' })).toBeVisible();
      expect(getByRole('radio', { name: 'Demi-journee' })).toBeVisible();
      expect(getByRole('radio', { name: 'Journée' })).toBeVisible();
    });

    it("de saisir un nom d'établissement", () => {
      const { getByRole } = render(FormulaireNouveauJeu, proprietesParDefaut);

      expect(
        getByRole('textbox', { name: 'Nom de votre établissement' }),
      ).toBeVisible();
    });

    it('de selectionner une discipline', async () => {
      const { getByRole } = render(FormulaireNouveauJeu, proprietesParDefaut);

      expect(getByRole('combobox', { name: 'Discipline' })).toBeVisible();
    });

    it('de selectionner une classe', async () => {
      const { getByRole } = render(FormulaireNouveauJeu, proprietesParDefaut);

      expect(getByRole('combobox', { name: 'Classe' })).toBeVisible();
    });
  });

  describe('lors de la soumission', () => {
    it("envoie le formulaire à l'api des jeux", async () => {
      const { getByRole, queryAllByRole } = render(
        FormulaireNouveauJeu,
        proprietesParDefaut,
      );

      await user.type(getByRole('textbox', { name: 'Nom du jeu' }), 'TEST');
      await user.type(
        getByRole('textbox', { name: 'Nom de votre établissement' }),
        'Mon lycée',
      );
      await user.click(getByRole('radio', { name: 'Heure de cours' }));
      await user.selectOptions(
        getByRole('combobox', { name: 'Discipline' }),
        'Mathématiques',
      );
      await user.selectOptions(
        getByRole('combobox', { name: 'Classe' }),
        'Seconde',
      );

      await user.click(getByRoleDeep('button', { name: 'Terminer' }));

      expect(validateurEnSuccess.estValide).toHaveBeenCalledExactlyOnceWith({
        nom: 'TEST',
        sequence: 'heure',
        nomEtablissement: 'Mon lycée',
        discipline: 'mathematiques',
        classe: 'seconde',
      });
      expect(axiosMock.post).toHaveBeenCalledExactlyOnceWith('/api/jeux', {
        nom: 'TEST',
        sequence: 'heure',
        nomEtablissement: 'Mon lycée',
        discipline: 'mathematiques',
        classe: 'seconde',
      });
      expect(queryAllByRole('alert')).toHaveLength(0);
    });

    it("n'envoie pas le formulaire si il y a un souci de validation", async () => {
      const { queryAllByRole } = render(FormulaireNouveauJeu, {
        ...proprietesParDefaut,
        validateur: { ...validateurEnSuccess, estValide: () => false },
      });

      await waitFor(() =>
        expect(getByRoleDeep('button', { name: 'Terminer' })).toBeDefined(),
      );
      await user.click(getByRoleDeep('button', { name: 'Terminer' }));

      expect(axiosMock.post).not.toHaveBeenCalled();
      expect(queryAllByRole('alert')).toHaveLength(0);
    });

    it("affiche pour chaque champ non valide, un message d'erreur", async () => {
      const validateurEnErreur: Validateur<JeuEnEdition> = {
        estValide: () => false,
        valide: () => ({
          nom: 'Le nom est obligatoire',
          sequence: "Le nom de l'établissement est obligatoire",
          nomEtablissement: 'La séquence est obligatoire',
          discipline: 'La discipline est obligatoire',
          classe: 'La classe est obligatoire',
        }),
      };
      const { getByText } = render(FormulaireNouveauJeu, {
        ...proprietesParDefaut,
        validateur: validateurEnErreur,
      });
      await waitFor(() =>
        expect(getByRoleDeep('button', { name: 'Terminer' })).toBeDefined(),
      );
      await user.click(getByRoleDeep('button', { name: 'Terminer' }));

      expect(axiosMock.post).not.toHaveBeenCalled();
      expect(getByText('Le nom est obligatoire')).toBeVisible();
      expect(
        getByText("Le nom de l'établissement est obligatoire"),
      ).toBeVisible();
      expect(getByText('La séquence est obligatoire')).toBeVisible();
      expect(getByText('La discipline est obligatoire')).toBeVisible();
      expect(getByText('La classe est obligatoire')).toBeVisible();
    });
  });
});
