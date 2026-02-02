import { render, waitFor } from '@testing-library/svelte/svelte5';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Jeu } from '../../../src/jeu.type';
import FormulaireJeu from '../../../src/jeux/FormulaireJeu/FormulaireJeu.svelte';
import { type ReferentielEtablissement } from '../../../src/jeux/FormulaireJeu/ReferentielEtablissement';
import {
  construisJeuEnEditionDepuisJeu,
  type EvaluationDuJeu,
  type InformationsGeneralesDuJeu,
  type JeuEnEdition,
  type PhotosDuJeu,
  type PresentationDuJeu,
} from '../../../src/jeux/jeuEnEdition.type';
import { jeuEnEditionStore } from '../../../src/jeux/stores/jeuEnEdition.store';
import { photosJeuStore } from '../../../src/jeux/stores/photosJeu.store';
import { type Validateur } from '../../../src/jeux/validateur';
import {
  findAllByRoleDeep,
  findByRoleDeep,
  findByTextDeep,
  getAllByRoleDeep,
  getByRoleDeep,
  getByTextDeep,
  queryAllByRoleDeep,
  queryByRoleDeep,
} from '../../shadow-dom-utilitaires';

const axiosMock = vi.hoisted(() => ({
  post: vi.fn(),
  patch: vi.fn(),
}));
const isAxiosErrorMock = vi.hoisted(() => vi.fn());

vi.mock('axios', () => {
  return { default: axiosMock, isAxiosError: isAxiosErrorMock };
});

vi.stubGlobal('URL', {
  createObjectURL: () => 'blob:',
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
  const validateurEvaluationEnSucces: Validateur<EvaluationDuJeu> = {
    estValide: vi.fn().mockReturnValue(true),
    valide: () => ({}),
  };
  const validateurPhotosDuJeuEnSucces: Validateur<PhotosDuJeu> = {
    estValide: vi.fn().mockReturnValue(true),
    valide: () => ({}),
  };
  const referentielEtablissement: ReferentielEtablissement = {
    trouveParNom: async () => [],
  };
  const proprietesParDefaut = {
    mode: 'creation',
    validateurInformationsGenerales: validateurInformationsGeneralesEnSucces,
    validateurPresentation: validateurPresentationEnSucces,
    validateurEvaluation: validateurEvaluationEnSucces,
    validateurPhotosDuJeu: validateurPhotosDuJeuEnSucces,
    referentielEtablissement,
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

  const formDataVersObjet = (fd: FormData) => {
    const obj: Record<string, unknown> = {};
    for (const [key, value] of fd.entries()) {
      obj[key] = value;
    }
    return obj;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('indique', () => {
    it('que tous les champs sont obligatoire sauf mention contraire', async () => {
      const { getByText } = render(FormulaireJeu, proprietesParDefaut);

      expect(
        getByText(
          'Sauf mention contraire, les informations demandées sont obligatoires.',
        ),
      ).toBeVisible();
    });
    describe("lors de l'étape des informations générales", () => {
      it("qu'on est à l'étape 1 sur 5", async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() =>
          expect(getByTextDeep('Étape 1 sur 5')).toBeVisible(),
        );
      });

      it("qu'on est à l'étape 'Informations Générales'", async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() =>
          expect(
            getByRoleDeep('heading', {
              name: /.*Informations générales.*/,
            }),
          ).toBeVisible(),
        );
      });

      it("que l'étape suivante est 'Présentation du jeu'", async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() =>
          expect(getByTextDeep('Présentation du jeu')).toBeVisible(),
        );
      });
    });

    describe("lors de l'étape de présentation du jeu", () => {
      beforeEach(async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
      });

      it("qu'on est à l'étape 2 sur 5", async () => {
        await waitFor(() =>
          expect(getByTextDeep('Étape 2 sur 5')).toBeVisible(),
        );
      });

      it("qu'on est à l'étape 'Présentation du jeu'", async () => {
        await waitFor(() =>
          expect(
            getByRoleDeep('heading', {
              name: /.*Présentation du jeu.*/,
            }),
          ).toBeVisible(),
        );
      });

      it("que l'étape suivante est 'Photos'", async () => {
        await waitFor(() => expect(getByTextDeep('Photos')).toBeVisible());
      });
    });

    describe("lors de l'étape des photos", () => {
      beforeEach(async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();
      });

      it("qu'on est à l'étape 3 sur 5", async () => {
        await waitFor(() =>
          expect(getByTextDeep('Étape 3 sur 5')).toBeVisible(),
        );
      });

      it("qu'on est à l'étape 'Photos'", async () => {
        await waitFor(() =>
          expect(
            getByRoleDeep('heading', {
              name: /photos/i,
            }),
          ).toBeVisible(),
        );
      });

      it("que l'étape suivante est 'Témoignages (facultatif)'", async () => {
        await waitFor(() =>
          expect(getByTextDeep('Témoignages (facultatif)')).toBeVisible(),
        );
      });
    });

    describe("lors de l'étape des témoignages", () => {
      beforeEach(async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
      });

      it("qu'on est à l'étape 4 sur 5", async () => {
        await waitFor(() =>
          expect(getByTextDeep('Étape 4 sur 5')).toBeVisible(),
        );
      });

      it("qu'on est à l'étape 'Témoignages (facultatif)'", async () => {
        await waitFor(() =>
          expect(
            getByRoleDeep('heading', {
              name: /.*Témoignages \(facultatif\).*/,
            }),
          ).toBeVisible(),
        );
      });

      it("que l'étape suivante est 'Votre avis nous intéresse'", async () => {
        await waitFor(() =>
          expect(getByTextDeep('Votre avis nous intéresse')).toBeVisible(),
        );
      });
    });

    describe("lors de l'étape de l'évaluation", () => {
      beforeEach(async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
      });

      it("qu'on est à l'étape 5 sur 5", async () => {
        await waitFor(() =>
          expect(getByTextDeep('Étape 5 sur 5')).toBeVisible(),
        );
      });

      it("qu'on est à l'étape 'Votre avis nous intéresse'", async () => {
        await waitFor(() =>
          expect(
            getByRoleDeep('heading', {
              name: /.*Votre avis nous intéresse [^!].*/,
            }),
          ).toBeVisible(),
        );
      });
    });
  });

  describe('propose', () => {
    describe("lors de l'étape des informations générales", () => {
      it('de selectionner une séquence', async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() => expect(getAllByRoleDeep('radio')).toHaveLength(3));
        expect(
          getByRoleDeep('radio', { name: 'Heure de cours' }),
        ).toBeVisible();
        expect(getByRoleDeep('radio', { name: 'Demi-journée' })).toBeVisible();
        expect(getByRoleDeep('radio', { name: 'Journée' })).toBeVisible();
      });

      it("de saisir un nom d'établissement", async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() =>
          expect(
            getByRoleDeep('textbox', { name: 'Nom de votre établissement' }),
          ).toBeVisible(),
        );
      });

      it('de selectionner une discipline', async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() =>
          expect(
            getByRoleDeep('combobox', { name: 'Discipline' }),
          ).toBeVisible(),
        );
      });

      it('de selectionner une classe', async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() =>
          expect(getByRoleDeep('combobox', { name: 'Classe' })).toBeVisible(),
        );
      });

      it('de saisir 4 prénoms', async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() =>
          expect(getAllByRoleDeep('textbox', { name: 'Prénom' })).toHaveLength(
            4,
          ),
        );
      });

      it('d‘ajouter un prénom d‘élève', async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await waitFor(() =>
          expect(
            getByRoleDeep('button', { name: 'Ajouter un élève' }),
          ).toBeVisible(),
        );
      });

      it('de saisir plus que 4 élèves', async () => {
        render(FormulaireJeu, proprietesParDefaut);
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
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();

        await waitFor(() =>
          expect(
            getByRoleDeep('textbox', { name: 'Nom du jeu' }),
          ).toBeVisible(),
        );
      });

      it('de selectionner la catégorie du jeu', async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();

        await waitFor(() =>
          expect(
            getByRoleDeep('combobox', { name: 'Catégorie' }),
          ).toBeVisible(),
        );
      });

      it('de selectionner la thématique du jeu', async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();

        const thematiques = await findByRoleDeep('group');
        expect(thematiques).toBeDefined();
      });

      it('de saisir la description du jeu', async () => {
        render(FormulaireJeu, proprietesParDefaut);

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
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapePrecedente();

        await waitFor(() =>
          expect(
            getByRoleDeep('textbox', { name: 'Nom de votre établissement' }),
          ).toBeVisible(),
        );
      });
    });

    describe("lors de l'étape de téléversement des photos", () => {
      beforeEach(async () => {
        render(FormulaireJeu, proprietesParDefaut);
        await etapeSuivante();
        await etapeSuivante();
        photosJeuStore.set({});
      });

      it("d'indiquer qu'on a recueilli le consentement des parents d'élèves", async () => {
        await waitFor(() =>
          expect(
            getByRoleDeep('checkbox', {
              name: 'J’atteste avoir recueilli le consentement des parents de tous les élèves présents sur les photos pour leur diffusion sur ce site.',
            }),
          ).toBeVisible(),
        );
      });

      it('de supprimer la couverture précédemment téléversée', async () => {
        photosJeuStore.set({ couverture: new Blob() });

        const boutonSuppressionCouverture = await findByRoleDeep('button', {
          name: 'Supprimer',
        });
        await user.click(boutonSuppressionCouverture);

        expect(get(photosJeuStore).couverture).toBeUndefined();
      });

      it('de supprimer la couverture précédemment téléversée', async () => {
        const fichier1 = new File(['fichier1'], 'fichier1.jpg');
        const fichier2 = new File(['fichier2'], 'fichier2.jpg');
        photosJeuStore.set({
          photos: [fichier1, fichier2],
        });

        const boutonsSupprimerPhoto = await findAllByRoleDeep('button', {
          name: 'Supprimer',
        });
        await user.click(boutonsSupprimerPhoto[1]);

        expect(get(photosJeuStore).photos).toEqual([fichier1]);
      });
    });

    describe("lors de l'étape des temoignages", () => {
      it('de saisir un témoignage', async () => {
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
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
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
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
        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
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

        const temoignagesApresSuppression = queryAllByRoleDeep('textbox', {
          name: 'Témoignage',
        });
        expect(temoignagesApresSuppression).toHaveLength(0);
      });
    });

    describe("lors de l'étape de l'évaluation", () => {
      it("d'évaluer la découverte des métiers de la cyber par les élèves", async () => {
        const { getAllByRole, getByText } = render(
          FormulaireJeu,
          proprietesParDefaut,
        );

        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();

        expect(
          getByText(
            'CyberEnJeux a-t-il permis aux élèves de découvrir les enjeux et les métiers de la cybersécurité ?',
          ),
        ).toBeVisible();
        expect(getAllByRole('radio', { name: '1' })).toHaveLength(3);
        expect(getAllByRole('radio', { name: '2' })).toHaveLength(3);
        expect(getAllByRole('radio', { name: '3' })).toHaveLength(3);
        expect(getAllByRole('radio', { name: '4' })).toHaveLength(3);
        expect(getAllByRole('radio', { name: '5' })).toHaveLength(3);
        expect(
          getByRoleDeep('textbox', {
            name: 'Souhaitez-vous nous en dire plus ? (facultatif)',
          }),
        ).toBeVisible();
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
              nomEtablissement: 'Le nom de l‘établissement est obligatoire',
              sequence: 'La séquence est obligatoire',
              discipline: 'La discipline est obligatoire',
              classe: 'La classe est obligatoire',
              eleves: 'Au moins un élève est requis',
            }),
          };
        render(FormulaireJeu, {
          ...proprietesParDefaut,
          validateurInformationsGenerales:
            validateurInformationsGeneralesEnErreur,
        });
        await etapeSuivante();

        expect(axiosMock.post).not.toHaveBeenCalled();
        await waitFor(() =>
          getByTextDeep('Le nom de l‘établissement est obligatoire'),
        );
        expect(getByTextDeep('La séquence est obligatoire')).toBeVisible();
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
        render(FormulaireJeu, {
          ...proprietesParDefaut,
          validateurPresentation: validateurPresentationEnErreur,
        });
        await etapeSuivante();

        await etapeSuivante();

        expect(axiosMock.post).not.toHaveBeenCalled();
        await waitFor(() => getByTextDeep('Le nom est obligatoire'));
        expect(getByTextDeep('La catégorie est obligatoire')).toBeVisible();
        expect(getByTextDeep('La thématique est obligatoire')).toBeVisible();
        expect(getByTextDeep('La description est obligatoire')).toBeVisible();
      });
    });

    describe("de l'étape des photos", () => {
      it("affiche une erreur si il n'y a pas de couverture de selectionnée", async () => {
        const validateurPhotosDuJeuEnErreur: Validateur<PhotosDuJeu> = {
          estValide: () => false,
          valide: () => ({
            photos: 'La couverture est obligatoire',
          }),
        };
        render(FormulaireJeu, {
          ...proprietesParDefaut,
          validateurPhotosDuJeu: validateurPhotosDuJeuEnErreur,
        });
        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();

        await waitFor(() => getByTextDeep('La couverture est obligatoire'));
      });
    });

    describe("de l'étape de l'évaluation'", () => {
      it("affiche pour chaque champ non valide, un message d'erreur", async () => {
        const validateurEvaluationEnErreur: Validateur<EvaluationDuJeu> = {
          estValide: () => false,
          valide: () => ({
            evaluationDecouverte: 'Le score de découverte est obligatoire',
            evaluationInteret: "Le score de l'intérêt est obligatoire",
            evaluationSatisfactionGenerale:
              'Le score de satisfaction est obligatoire',
          }),
        };
        render(FormulaireJeu, {
          ...proprietesParDefaut,
          validateurEvaluation: validateurEvaluationEnErreur,
        });
        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await terminer();

        expect(axiosMock.post).not.toHaveBeenCalled();

        await waitFor(() =>
          getByTextDeep('Le score de découverte est obligatoire'),
        );
        expect(
          getByTextDeep("Le score de l'intérêt est obligatoire"),
        ).toBeVisible();
        expect(
          getByTextDeep('Le score de satisfaction est obligatoire'),
        ).toBeVisible();
      });
    });
  });

  describe('lors de la soumission', () => {
    it("envoie le formulaire à l'api des jeux", async () => {
      const donneesJeuAttenduesALaValidation: JeuEnEdition = {
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
        evaluationDecouverte: 2,
        evaluationInteret: 3,
        evaluationSatisfactionGenerale: 4,
        precisions: "j'ai bien aimé",
        consentement: true,
      };
      const donneesAttenduesALaSoumission = {
        ...donneesJeuAttenduesALaValidation,
        eleves: ['Brice', 'Gontran'],
      };
      const { queryAllByRole, getAllByRole } = render(
        FormulaireJeu,
        proprietesParDefaut,
      );
      // Etape informations générales
      const champNomEtablissement = await findByRoleDeep('textbox', {
        name: 'Nom de votre établissement',
      });
      const champSequence = await findByRoleDeep('radio', {
        name: 'Heure de cours',
      });
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
      const groupThematiques = await findByRoleDeep('group');
      const champDescription = await findByRoleDeep('textbox', {
        name: 'Description Présenter le jeu et son fonctionnement en quelques lignes.',
      });

      await user.type(champNomDuJeu, 'TEST');
      await user.selectOptions(champCategorie, 'Simulation');
      await user.click(groupThematiques);
      const menaceCyber = await findByRoleDeep('checkbox', {
        name: 'Menace cyber',
      });
      const orientation = await findByRoleDeep('checkbox', {
        name: 'Orientation',
      });
      await user.click(menaceCyber);
      await user.click(orientation);

      await user.type(champDescription, 'Description du jeu');
      await etapeSuivante();

      // Etape Photos
      photosJeuStore.set({});
      get(photosJeuStore).couverture = new Blob();

      const caseConsentement = await findByRoleDeep('checkbox', {
        name: 'J’atteste avoir recueilli le consentement des parents de tous les élèves présents sur les photos pour leur diffusion sur ce site.',
      });
      await user.click(caseConsentement);

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

      await etapeSuivante();
      // Etape évaluation
      const radioEvaluationDecouverte = getAllByRole('radio', {
        name: '2',
      })[0];
      const radioEvaluationInteret = getAllByRole('radio', {
        name: '3',
      })[1];
      const radioEvaluationSatisfaction = getAllByRole('radio', {
        name: '4',
      })[2];
      const champPrecisions = await findByRoleDeep('textbox', {
        name: 'Souhaitez-vous nous en dire plus ? (facultatif)',
      });

      await user.click(radioEvaluationDecouverte);
      await user.click(radioEvaluationInteret);
      await user.click(radioEvaluationSatisfaction);
      await user.type(champPrecisions, "j'ai bien aimé");

      await terminer();

      expect(
        validateurInformationsGeneralesEnSucces.estValide,
      ).toHaveBeenCalledExactlyOnceWith(donneesJeuAttenduesALaValidation);
      expect(
        validateurPresentationEnSucces.estValide,
      ).toHaveBeenCalledExactlyOnceWith(donneesJeuAttenduesALaValidation);

      expect(
        validateurEvaluationEnSucces.estValide,
      ).toHaveBeenCalledExactlyOnceWith(donneesJeuAttenduesALaValidation);

      expect(axiosMock.post).toHaveBeenCalledExactlyOnceWith(
        '/api/mes-jeux',
        expect.any(FormData),
      );
      const formDataEnvoye = formDataVersObjet(axiosMock.post.mock.calls[0][1]);
      expect(JSON.parse(formDataEnvoye.jeu as string)).toEqual(
        donneesAttenduesALaSoumission,
      );
      expect(queryAllByRole('alert')).toHaveLength(0);
    });

    it("n'envoie pas le formulaire si il y a un souci de validation", async () => {
      render(FormulaireJeu, {
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

    it('Désactive le bouton de soumission le temps de la requête', async () => {
      axiosMock.post.mockImplementationOnce(() => {
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve(undefined);
          }, 100),
        );
      });
      const { getAllByRole } = render(FormulaireJeu, proprietesParDefaut);
      // Etape informations générales
      const champNomEtablissement = await findByRoleDeep('textbox', {
        name: 'Nom de votre établissement',
      });
      const champSequence = await findByRoleDeep('radio', {
        name: 'Heure de cours',
      });
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
      const groupThematiques = await findByRoleDeep('group');
      const champDescription = await findByRoleDeep('textbox', {
        name: 'Description Présenter le jeu et son fonctionnement en quelques lignes.',
      });

      await user.type(champNomDuJeu, 'TEST');
      await user.selectOptions(champCategorie, 'Simulation');
      await user.click(groupThematiques);
      const menaceCyber = await findByRoleDeep('checkbox', {
        name: 'Menace cyber',
      });
      const orientation = await findByRoleDeep('checkbox', {
        name: 'Orientation',
      });
      await user.click(menaceCyber);
      await user.click(orientation);

      await user.type(champDescription, 'Description du jeu');
      await etapeSuivante();

      // Etape Photos
      photosJeuStore.set({});
      get(photosJeuStore).couverture = new Blob();

      const caseConsentement = await findByRoleDeep('checkbox', {
        name: 'J’atteste avoir recueilli le consentement des parents de tous les élèves présents sur les photos pour leur diffusion sur ce site.',
      });
      await user.click(caseConsentement);

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

      await etapeSuivante();
      // Etape évaluation
      const radioEvaluationDecouverte = getAllByRole('radio', {
        name: '2',
      })[0];
      const radioEvaluationInteret = getAllByRole('radio', {
        name: '3',
      })[1];
      const radioEvaluationSatisfaction = getAllByRole('radio', {
        name: '4',
      })[2];
      const champPrecisions = await findByRoleDeep('textbox', {
        name: 'Souhaitez-vous nous en dire plus ? (facultatif)',
      });

      await user.click(radioEvaluationDecouverte);
      await user.click(radioEvaluationInteret);
      await user.click(radioEvaluationSatisfaction);
      await user.type(champPrecisions, "j'ai bien aimé");
      await terminer();

      const boutonTerminer = await findByRoleDeep('button', {
        name: 'Terminer',
      });

      await waitFor(() => expect(boutonTerminer).toBeDisabled());
    });

    describe("affiche un message d'erreur", () => {
      beforeEach(() => {
        photosJeuStore.set({});
        get(photosJeuStore).couverture = new Blob();
      });
      it('générique si la soumission échoue pour une raison inconnu', async () => {
        axiosMock.post.mockRejectedValueOnce(new Error('Erreur de test API'));
        isAxiosErrorMock.mockReturnValue(false);

        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await terminer();

        const erreurAPI = await findByTextDeep(
          'Une erreur est survenue, veuillez réessayer. Si le problème persiste veuillez contacter le support : demainspecialistecyber@education.gouv.fr',
        );
        expect(erreurAPI).toBeVisible();
      });

      it("et précise si la soumission échoue à cause d'une photo vérolée", async () => {
        axiosMock.post.mockRejectedValueOnce({
          response: { data: { erreur: 'Un des fichiers est infecté' } },
        });
        isAxiosErrorMock.mockReturnValue(true);

        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await terminer();

        const erreurAPI = await findByTextDeep(
          'Certaines photos n’ont pas pu être ajoutées.',
        );
        expect(erreurAPI).toBeVisible();
      });

      it("et précise si la soumission échoue à cause d'une erreur sur le traitement des photos", async () => {
        axiosMock.post.mockRejectedValueOnce({
          response: {
            data: { erreur: 'Le traitement de vos photos n’a pu aboutir' },
          },
        });
        isAxiosErrorMock.mockReturnValue(true);

        render(FormulaireJeu, proprietesParDefaut);

        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await etapeSuivante();
        await terminer();

        const erreurAPI = await findByTextDeep(
          'Certaines photos n’ont pas pu être ajoutées.',
        );
        expect(erreurAPI).toBeVisible();
      });
    });
  });

  describe('en mode modification', () => {
    beforeEach(() => {
      render(FormulaireJeu, {
        ...proprietesParDefaut,
        mode: 'modification',
      });
    });

    it("saute l'étape des photos en avançant", async () => {
      await etapeSuivante();
      await etapeSuivante();

      await waitFor(() =>
        expect(
          getByRoleDeep('heading', {
            name: /.*Témoignages \(facultatif\).*/,
          }),
        ).toBeVisible(),
      );
    });

    it("saute l'étape des photos en reculant", async () => {
      await etapeSuivante();
      await etapeSuivante();
      await etapePrecedente();

      await waitFor(() =>
        expect(getByTextDeep('Présentation du jeu')).toBeVisible(),
      );
    });

    it("on n'a que 3 étapes", async () => {
      await waitFor(() => expect(getByTextDeep('Étape 1 sur 3')).toBeVisible());
    });

    describe('sur la dernière étape (témoignages)', () => {
      beforeEach(async () => {
        await etapeSuivante();
        await etapeSuivante();
      });

      it('affiche le bouton "Enregistrer les modifications"', async () => {
        await waitFor(() =>
          expect(
            queryByRoleDeep('button', {
              name: 'Enregistrer les modifications',
            }),
          ).toBeVisible(),
        );
      });

      it('n\'affiche pas le bouton "Suivant"', async () => {
        await waitFor(() =>
          expect(
            queryByRoleDeep('button', {
              name: 'Suivant',
            }),
          ).toBeNull(),
        );
      });

      describe("sur l'enregistrement", () => {
        async function engistreModification() {
          const boutonEnregistrer = await findByRoleDeep('button', {
            name: 'Enregistrer les modifications',
          });
          await user.click(boutonEnregistrer);
        }

        it("envoie le formulaire à l'api des jeux", async () => {
          jeuEnEditionStore.set({
            id: '1234',
            sequence: 'heure',
            nomEtablissement: 'Mon lycée',
            discipline: 'mathematiques',
            classe: 'seconde',
            eleves: ['Brice', 'Gontran'],
            nom: 'TEST',
            categorie: 'simulation',
            thematiques: ['menace-cyber', 'orientation'],
            description: 'Description du jeu',
            temoignages: [{ prenom: 'Michel', details: "C'était super" }],
          } as JeuEnEdition);

          await engistreModification();

          expect(axiosMock.patch).toHaveBeenCalledExactlyOnceWith(
            '/api/jeux/1234',
            {
              sequence: 'heure',
              nomEtablissement: 'Mon lycée',
              discipline: 'mathematiques',
              classe: 'seconde',
              eleves: ['Brice', 'Gontran'],
              nom: 'TEST',
              categorie: 'simulation',
              thematiques: ['menace-cyber', 'orientation'],
              description: 'Description du jeu',
              temoignages: [{ prenom: 'Michel', details: "C'était super" }],
            },
          );
        });

        it("n'envoie pas les propriétés non modifiables", async () => {
          const jeu: Jeu = {
            id: '1234',
            reactions: {},
            enseignant: 'Jeanne',
            photos: {
              couverture: {
                chemin: '',
              },
              photos: [],
            },
            categorie: 'autre',
            classe: '3e',
            description: '',
            discipline: 'mathématiques',
            eleves: [],
            estCache: false,
            estProprietaire: true,
            niveau: 'Cycle 4 (5e-3e)',
            nom: 'Nom du Jeu',
            nomEtablissement: 'Nom etablissement',
            sequence: 'journee',
            temoignages: [],
            thematiques: [],
          };
          jeuEnEditionStore.set(construisJeuEnEditionDepuisJeu(jeu));

          await engistreModification();

          expect(axiosMock.patch).toHaveBeenCalledExactlyOnceWith(
            '/api/jeux/1234',
            {
              categorie: 'autre',
              classe: '3e',
              description: '',
              discipline: 'mathématiques',
              eleves: [],
              estCache: false,
              nom: 'Nom du Jeu',
              nomEtablissement: 'Nom etablissement',
              sequence: 'journee',
              temoignages: [],
              thematiques: [],
            },
          );
        });

        it('supprime les élèves non renseignés', async () => {
          jeuEnEditionStore.set({
            id: '1234',
            eleves: ['', 'Michel'],
          } as JeuEnEdition);

          await engistreModification();

          expect(axiosMock.patch).toHaveBeenCalledExactlyOnceWith(
            '/api/jeux/1234',
            { eleves: ['Michel'] },
          );
        });

        it('supprime les témoignages non renseignés', async () => {
          jeuEnEditionStore.set({
            id: '1234',
            temoignages: [
              { prenom: '', details: '' },
              { prenom: 'Marc', details: '' },
              { prenom: '', details: 'Super' },
              { prenom: 'Michel', details: 'Génial' },
            ],
          } as JeuEnEdition);

          await engistreModification();

          expect(axiosMock.patch).toHaveBeenCalledExactlyOnceWith(
            '/api/jeux/1234',
            {
              eleves: undefined,
              temoignages: [{ prenom: 'Michel', details: 'Génial' }],
            },
          );
        });

        it('affiche une erreur si la soumission échoue', async () => {
          axiosMock.patch.mockRejectedValueOnce(
            new Error('Erreur de test API'),
          );
          isAxiosErrorMock.mockReturnValue(false);

          await engistreModification();

          const erreurAPI = await findByTextDeep(
            'Une erreur est survenue, veuillez réessayer. Si le problème persiste veuillez contacter le support : demainspecialistecyber@education.gouv.fr',
          );
          expect(erreurAPI).toBeVisible();
        });
      });
    });
  });
});
