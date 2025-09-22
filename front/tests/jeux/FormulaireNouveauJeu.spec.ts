import { render, waitFor } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormulaireNouveauJeu from '../../src/jeux/FormulaireNouveauJeu.svelte';
import { InformationsGeneralesDuJeu } from '../../src/jeux/jeu';
import { type Validateur } from '../../src/validateur';
import {
  findAllByRoleDeep,
  findByRoleDeep,
  getAllByRoleDeep,
  getByRoleDeep,
  getByTextDeep,
} from '../shadow-dom-utilitaires';

const axiosMock = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock('axios', () => {
  return { default: axiosMock };
});

describe('Le formulaire de dépose de jeu', () => {
  const user = userEvent.setup();

  const validateurInformationsGeneralesEnSuccess: Validateur<InformationsGeneralesDuJeu> =
    {
      estValide: vi.fn().mockReturnValue(true),
      valide: () => ({
        nom: undefined,
        sequence: undefined,
        nomEtablissement: undefined,
      }),
    };
  const proprietesParDefaut = {
    validateurInformationsGenerales: validateurInformationsGeneralesEnSuccess,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('indique', () => {
    it('que tous les champs sont obligatoire sauf mention contraire', async () => {
      const { getByText } = render(FormulaireNouveauJeu, proprietesParDefaut);

      expect(
        getByText(
          'Sauf mention contraire, les informations demandées sont obligatoires.',
        ),
      ).toBeVisible();
    });
  });
  describe('propose', () => {
    it('de saisir le nom du jeu', async () => {
      render(FormulaireNouveauJeu, proprietesParDefaut);

      await waitFor(() =>
        expect(getByRoleDeep('textbox', { name: 'Nom du jeu' })).toBeVisible(),
      );
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

    it("de saisir un nom d'établissement", async () => {
      render(FormulaireNouveauJeu, proprietesParDefaut);

      await waitFor(() =>
        expect(
          getByRoleDeep('textbox', { name: 'Nom de votre établissement' }),
        ).toBeVisible(),
      );
    });

    it('de selectionner une discipline', async () => {
      render(FormulaireNouveauJeu, proprietesParDefaut);

      await waitFor(() =>
        expect(getByRoleDeep('combobox', { name: 'Discipline' })).toBeVisible(),
      );
    });

    it('de selectionner une classe', async () => {
      render(FormulaireNouveauJeu, proprietesParDefaut);

      await waitFor(() =>
        expect(getByRoleDeep('combobox', { name: 'Classe' })).toBeVisible(),
      );
    });

    it('de saisir 4 prénoms', async () => {
      render(FormulaireNouveauJeu, proprietesParDefaut);

      await waitFor(() =>
        expect(getAllByRoleDeep('textbox', { name: 'Prénom' })).toHaveLength(4),
      );
    });

    it('d‘ajouter un prénom d‘élève', async () => {
      render(FormulaireNouveauJeu, proprietesParDefaut);

      await waitFor(() =>
        expect(
          getByRoleDeep('button', { name: 'Ajouter un élève' }),
        ).toBeVisible(),
      );
    });

    it('de saisir plus que 4 élèves', async () => {
      render(FormulaireNouveauJeu, proprietesParDefaut);
      const boutonAjouterEleve = await findByRoleDeep('button', {
        name: 'Ajouter un élève',
      });

      await user.click(boutonAjouterEleve);
      await user.click(boutonAjouterEleve);

      await waitFor(() =>
        expect(getAllByRoleDeep('textbox', { name: 'Prénom' })).toHaveLength(6),
      );
    });
  });

  describe('lors de la soumission', () => {
    it("envoie le formulaire à l'api des jeux", async () => {
      const { getByRole, queryAllByRole } = render(
        FormulaireNouveauJeu,
        proprietesParDefaut,
      );
      const champNomDuJeu = await findByRoleDeep('textbox', {
        name: 'Nom du jeu',
      });
      const champNomEtablissement = await findByRoleDeep('textbox', {
        name: 'Nom de votre établissement',
      });
      const champSequence = getByRole('radio', { name: 'Heure de cours' });
      const champDiscipline = await findByRoleDeep('combobox', {
        name: 'Discipline',
      });
      const champClasse = await findByRoleDeep('combobox', { name: 'Classe' });
      const champsPrenom = await findAllByRoleDeep('textbox', {
        name: 'Prénom',
      });
      const boutonTerminer = await findByRoleDeep('button', {
        name: 'Terminer',
      });

      await user.type(champNomDuJeu, 'TEST');
      await user.type(champNomEtablissement, 'Mon lycée');
      await user.click(champSequence);
      await user.selectOptions(champDiscipline, 'Mathématiques');
      await user.selectOptions(champClasse, 'Seconde');
      await user.type(champsPrenom[0], 'Brice');
      await user.type(champsPrenom[1], 'Gontran');
      await user.click(boutonTerminer);

      expect(
        validateurInformationsGeneralesEnSuccess.estValide,
      ).toHaveBeenCalledExactlyOnceWith({
        nom: 'TEST',
        sequence: 'heure',
        nomEtablissement: 'Mon lycée',
        discipline: 'mathematiques',
        classe: 'seconde',
        eleves: ['Brice', 'Gontran'],
      });
      expect(axiosMock.post).toHaveBeenCalledExactlyOnceWith('/api/jeux', {
        nom: 'TEST',
        sequence: 'heure',
        nomEtablissement: 'Mon lycée',
        discipline: 'mathematiques',
        classe: 'seconde',
        eleves: ['Brice', 'Gontran'],
      });
      expect(queryAllByRole('alert')).toHaveLength(0);
    });

    it("n'envoie pas le formulaire si il y a un souci de validation", async () => {
      const { queryAllByRole } = render(FormulaireNouveauJeu, {
        ...proprietesParDefaut,
        validateurInformationsGenerales: {
          ...validateurInformationsGeneralesEnSuccess,
          estValide: () => false,
        },
      });
      const boutonTerminer = await findByRoleDeep('button', {
        name: 'Terminer',
      });

      await user.click(boutonTerminer);

      expect(axiosMock.post).not.toHaveBeenCalled();
      expect(queryAllByRole('alert')).toHaveLength(0);
    });

    it("affiche pour chaque champ non valide, un message d'erreur", async () => {
      const validateurInformationsGeneralesEnErreur: Validateur<InformationsGeneralesDuJeu> =
        {
          estValide: () => false,
          valide: () => ({
            nomEtablissement: "Le nom de l'établissement est obligatoire",
            sequence: 'La séquence est obligatoire',
            discipline: 'La discipline est obligatoire',
            classe: 'La classe est obligatoire',
            eleves: 'Au moins un élève est requis',
          }),
        };
      const { getByText } = render(FormulaireNouveauJeu, {
        ...proprietesParDefaut,
        validateurInformationsGenerales:
          validateurInformationsGeneralesEnErreur,
      });
      const boutonTerminer = await findByRoleDeep('button', {
        name: 'Terminer',
      });

      await user.click(boutonTerminer);

      expect(axiosMock.post).not.toHaveBeenCalled();
      await waitFor(() =>
        getByTextDeep("Le nom de l'établissement est obligatoire"),
      );
      expect(getByText('La séquence est obligatoire')).toBeVisible();
      expect(getByTextDeep('La discipline est obligatoire')).toBeVisible();
      expect(getByTextDeep('La classe est obligatoire')).toBeVisible();
      expect(getByText('Au moins un élève est requis')).toBeVisible();
    });
  });
});
