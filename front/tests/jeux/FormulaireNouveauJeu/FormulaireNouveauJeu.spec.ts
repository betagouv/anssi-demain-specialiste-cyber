import { render, waitFor } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormulaireNouveauJeu from '../../../src/jeux/FormulaireNouveauJeu/FormulaireNouveauJeu.svelte';
import {
  type InformationsGeneralesDuJeu,
  type JeuEnEdition,
  type PresentationDuJeu,
} from '../../../src/jeux/jeu';
import { type Validateur } from '../../../src/validateur';
import {
  findAllByRoleDeep,
  findByRoleDeep,
  getAllByRoleDeep,
  getByRoleDeep,
  getByTextDeep,
  queryAllByRoleDeep,
  queryByRoleDeep,
} from '../../shadow-dom-utilitaires';

const axiosMock = vi.hoisted(() => ({ post: vi.fn() }));

vi.mock('axios', () => {
  return { default: axiosMock };
});

describe('Le formulaire de dépose de jeu', () => {
  const user = userEvent.setup();

  const validateurInformationsGeneralesEnSucces: Validateur<InformationsGeneralesDuJeu> =
    {
      estValide: vi.fn().mockReturnValue(true),
      valide: () => ({}),
    };
  const validateurPresentationEnSucces: Validateur<PresentationDuJeu> = {
    estValide: vi.fn().mockReturnValue(true),
    valide: () => ({}),
  };
  const proprietesParDefaut = {
    validateurInformationsGenerales: validateurInformationsGeneralesEnSucces,
    validateurPresentation: validateurPresentationEnSucces,
  };

  const etapePrecedente = async () => {
    const boutonPrecedent = await findByRoleDeep('button', {
      name: 'Précédent',
    });
    await user.click(boutonPrecedent);
  };

  const etapeSuivante = async () => {
    const boutonSuivant = await findByRoleDeep('button', {
      name: 'Suivant',
    });
    await user.click(boutonSuivant);
  };

  const terminer = async () => {
    const boutonTerminer = await findByRoleDeep('button', {
      name: 'Terminer',
    });
    await user.click(boutonTerminer);
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
    describe("lors de l'étape des informations générales", () => {
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
          expect(
            getByRoleDeep('combobox', { name: 'Discipline' }),
          ).toBeVisible(),
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
          expect(getAllByRoleDeep('textbox', { name: 'Prénom' })).toHaveLength(
            4,
          ),
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
          expect(getAllByRoleDeep('textbox', { name: 'Prénom' })).toHaveLength(
            6,
          ),
        );
      });
    });

    describe("lors de l'étape de présentation", () => {
      it('de saisir le nom du jeu', async () => {
        render(FormulaireNouveauJeu, proprietesParDefaut);

        await etapeSuivante();

        await waitFor(() =>
          expect(
            getByRoleDeep('textbox', { name: 'Nom du jeu' }),
          ).toBeVisible(),
        );
      });

      it('de selectionner la catégorie du jeu', async () => {
        render(FormulaireNouveauJeu, proprietesParDefaut);

        await etapeSuivante();

        await waitFor(() =>
          expect(
            getByRoleDeep('combobox', { name: 'Catégorie' }),
          ).toBeVisible(),
        );
      });

      it('de selectionner la thématique du jeu', async () => {
        const { getByRole } = render(FormulaireNouveauJeu, proprietesParDefaut);

        await etapeSuivante();

        await waitFor(() =>
          expect(getByRole('listbox', { name: 'Thématiques' })).toBeVisible(),
        );
      });

      it('de saisir la description du jeu', async () => {
        render(FormulaireNouveauJeu, proprietesParDefaut);

        await etapeSuivante();

        await waitFor(() =>
          expect(
            getByRoleDeep('textbox', {
              name: 'Description Présenter le jeu et son fonctionnement en quelques lignes.',
            }),
          ).toBeVisible(),
        );
      });

      it("de revenir à l'étape précédente", async () => {
        render(FormulaireNouveauJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapePrecedente();

        await waitFor(() =>
          expect(
            getByRoleDeep('textbox', { name: 'Nom de votre établissement' }),
          ).toBeVisible(),
        );
      });
    });
    describe("lors de l'étape des temoignages", () => {
      it('de saisir un témoignage', async () => {
        render(FormulaireNouveauJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();

        await waitFor(() =>
          expect(getByRoleDeep('textbox', { name: 'Prénom' })).toBeVisible(),
        );
        await waitFor(() =>
          expect(
            getByRoleDeep('textbox', { name: 'Témoignage' }),
          ).toBeVisible(),
        );
      });

      it("d'ajouter un témoignage", async () => {
        render(FormulaireNouveauJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();

        const temoignages = await findAllByRoleDeep('textbox', {
          name: 'Témoignage',
        });
        expect(temoignages).toHaveLength(1);

        const boutonAjouterTemoignage = await findByRoleDeep('button', {
          name: 'Ajouter un témoignage',
        });
        await user.click(boutonAjouterTemoignage);

        const temoignagesApresAjout = await findAllByRoleDeep('textbox', {
          name: 'Témoignage',
        });
        expect(temoignagesApresAjout).toHaveLength(2);
      });

      it('de supprimer un témoignage', async () => {
        render(FormulaireNouveauJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();

        const temoignages = await findAllByRoleDeep('textbox', {
          name: 'Témoignage',
        });
        expect(temoignages).toHaveLength(1);

        const boutonSupprimer = await findByRoleDeep('button', {
          name: 'Supprimer',
        });
        await user.click(boutonSupprimer);

        const temoignagesApresSuppression = await queryAllByRoleDeep(
          'textbox',
          {
            name: 'Témoignage',
          },
        );
        expect(temoignagesApresSuppression).toHaveLength(0);
      });
    });
  });

  describe('lors de la validation', () => {
    describe("de l'étape des informations générales", () => {
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
        await etapeSuivante();

        expect(axiosMock.post).not.toHaveBeenCalled();
        await waitFor(() =>
          getByTextDeep("Le nom de l'établissement est obligatoire"),
        );
        expect(getByText('La séquence est obligatoire')).toBeVisible();
        expect(getByTextDeep('La discipline est obligatoire')).toBeVisible();
        expect(getByTextDeep('La classe est obligatoire')).toBeVisible();
        expect(getByTextDeep('Au moins un élève est requis')).toBeVisible();
      });
    });

    describe("de l'étape de la présentation", () => {
      it("affiche pour chaque champ non valide, un message d'erreur", async () => {
        const validateurPresentationEnErreur: Validateur<PresentationDuJeu> = {
          estValide: () => false,
          valide: () => ({
            nom: 'Le nom est obligatoire',
            categorie: 'La catégorie est obligatoire',
            thematiques: 'La thématique est obligatoire',
            description: 'La description est obligatoire',
          }),
        };
        const { getByText } = render(FormulaireNouveauJeu, {
          ...proprietesParDefaut,
          validateurPresentation: validateurPresentationEnErreur,
        });
        await etapeSuivante();

        await etapeSuivante();

        expect(axiosMock.post).not.toHaveBeenCalled();
        await waitFor(() => getByTextDeep('Le nom est obligatoire'));
        expect(getByTextDeep('La catégorie est obligatoire')).toBeVisible();
        expect(getByText('La thématique est obligatoire')).toBeVisible();
        expect(getByTextDeep('La description est obligatoire')).toBeVisible();
      });
    });
  });

  describe('lors de la soumission', () => {
    it("envoie le formulaire à l'api des jeux", async () => {
      const donneesJeuAttendues: JeuEnEdition = {
        sequence: 'heure',
        nomEtablissement: 'Mon lycée',
        discipline: 'mathematiques',
        classe: 'seconde',
        eleves: ['Brice', 'Gontran', '', ''],
        nom: 'TEST',
        categorie: 'simulation',
        thematiques: ['menace-cyber', 'orientation'],
        description: 'Description du jeu',
        temoignages: [
          {
            prenom: 'Michel',
            details: "C'était super",
          },
          {
            prenom: 'Martin',
            details: "J'ai aimé",
          },
        ],
      };
      const { getByRole, queryAllByRole } = render(
        FormulaireNouveauJeu,
        proprietesParDefaut,
      );
      // Etape informations générales
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
      await user.type(champNomEtablissement, 'Mon lycée');
      await user.click(champSequence);
      await user.selectOptions(champDiscipline, 'Mathématiques');
      await user.selectOptions(champClasse, 'Seconde');
      await user.type(champsPrenom[0], 'Brice');
      await user.type(champsPrenom[1], 'Gontran');

      await etapeSuivante();

      // Etape présentation
      const champNomDuJeu = await findByRoleDeep('textbox', {
        name: 'Nom du jeu',
      });
      const champCategorie = await findByRoleDeep('combobox', {
        name: 'Catégorie',
      });
      const champThematique = getByRole('listbox', {
        name: 'Thématiques',
      });
      const champDescription = await findByRoleDeep('textbox', {
        name: 'Description Présenter le jeu et son fonctionnement en quelques lignes.',
      });

      await user.type(champNomDuJeu, 'TEST');
      await user.selectOptions(champCategorie, 'Simulation');
      await user.selectOptions(champThematique, [
        'Menace cyber',
        'Orientation',
      ]);
      await user.type(champDescription, 'Description du jeu');
      await etapeSuivante();

      // Etape témoignages
      const ajouterTemoignage = await findByRoleDeep('button', {
        name: 'Ajouter un témoignage',
      });
      await user.click(ajouterTemoignage);

      const champsPrenomTemoignage = await findAllByRoleDeep('textbox', {
        name: 'Prénom',
      });
      const champsTemoignage = await findAllByRoleDeep('textbox', {
        name: 'Témoignage',
      });
      await user.type(champsPrenomTemoignage[0], 'Michel');
      await user.type(champsTemoignage[0], "C'était super");
      await user.type(champsPrenomTemoignage[1], 'Martin');
      await user.type(champsTemoignage[1], "J'ai aimé");

      await terminer();

      expect(
        validateurInformationsGeneralesEnSucces.estValide,
      ).toHaveBeenCalledExactlyOnceWith(donneesJeuAttendues);
      expect(
        validateurPresentationEnSucces.estValide,
      ).toHaveBeenCalledExactlyOnceWith(donneesJeuAttendues);
      expect(axiosMock.post).toHaveBeenCalledExactlyOnceWith('/api/jeux', {
        ...donneesJeuAttendues,
        eleves: ['Brice', 'Gontran'],
      });
      expect(queryAllByRole('alert')).toHaveLength(0);
    });

    it("n'envoie pas le formulaire si il y a un souci de validation", async () => {
      render(FormulaireNouveauJeu, {
        ...proprietesParDefaut,
        validateurPresentation: {
          ...validateurPresentationEnSucces,
          estValide: () => false,
        },
      });
      await etapeSuivante();
      await etapeSuivante();

      await waitFor(() =>
        expect(queryByRoleDeep('button', { name: 'Terminer' })).toBeNull(),
      );
    });
  });
});
