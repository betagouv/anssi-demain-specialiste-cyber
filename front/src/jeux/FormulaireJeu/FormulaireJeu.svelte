<svelte:options
  customElement={{
    tag: 'dsc-formulaire-jeu',
    shadow: 'none',
    props: {
      mode: { type: 'String' },
    },
  }}
/>

<script lang="ts">
  import axios from 'axios';
  import { clic } from '../../actions.svelte';
  import type { Validateur } from '../../validateur';
  import type {
    ErreursValidationJeuEnEdition,
    EvaluationDuJeu,
    InformationsGeneralesDuJeu,
    Jeu,
    JeuEnEdition,
    PhotosDuJeu,
    PresentationDuJeu,
  } from '../jeu';
  import { jeuEnEditionStore } from '../stores/jeuEnEdition.store';
  import { photosJeuStore } from '../stores/photosJeu.store';
  import { ValidateurEvaluationDuJeu } from '../ValidateurEvaluationDuJeu';
  import { ValidateurInformationsGeneralesDuJeu } from '../ValidateurInformationsGeneralesDuJeu';
  import { ValidateurPhotosDuJeu } from '../ValidateurPhotosDuJeu';
  import { ValidateurPresentationDuJeu } from '../ValidateurPresentationDuJeu';
  import EtapeEvaluation from './EtapeEvaluation.svelte';
  import EtapeInformationsGenerales from './EtapeInformationsGenerales.svelte';
  import EtapePhotos from './EtapePhotos.svelte';
  import EtapePresentation from './EtapePresentation.svelte';
  import EtapeTemoignages from './EtapeTemoignages.svelte';
  import EtapierDeposeJeu from './EtapierDeposeJeu.svelte';
  import type {
    EtapeDeposeJeu,
    EtapeModificationJeu,
  } from './FormulaireDeJeu.type.js';
  import {
    AdaptateurAnnuaireEducationNationale,
    type ReferentielEtablissement,
  } from './ReferentielEtablissement.js';
  import { onMount, tick } from 'svelte';
  import EtapierModifieJeu from './EtapierModifieJeu.svelte';

  interface Props {
    mode: 'creation' | 'modification';
    validateurInformationsGenerales: Validateur<InformationsGeneralesDuJeu>;
    validateurPresentation: Validateur<PresentationDuJeu>;
    validateurEvaluation: Validateur<EvaluationDuJeu>;
    validateurPhotosDuJeu: Validateur<PhotosDuJeu>;
    referentielEtablissement: ReferentielEtablissement;
  }

  const {
    mode,
    validateurInformationsGenerales = new ValidateurInformationsGeneralesDuJeu(),
    validateurPresentation = new ValidateurPresentationDuJeu(),
    validateurEvaluation = new ValidateurEvaluationDuJeu(),
    validateurPhotosDuJeu = new ValidateurPhotosDuJeu(),
    referentielEtablissement = new AdaptateurAnnuaireEducationNationale(),
  }: Props = $props();

  let etape = $state<EtapeDeposeJeu | EtapeModificationJeu>(
    'informations-generales',
  );

  $jeuEnEditionStore = {
    eleves: ['', '', '', ''],
    temoignages: [{ prenom: '', details: '' }],
  };

  let erreurs = $state<ErreursValidationJeuEnEdition>({
    nom: undefined,
    nomEtablissement: undefined,
    sequence: undefined,
    classe: undefined,
    discipline: undefined,
  });

  const etapePrecedente = () => {
    switch (etape) {
      case 'presentation':
        etape = 'informations-generales';
        break;
      case 'photos':
        etape = 'presentation';
        break;
      case 'temoignages':
        etape = mode === 'modification' ? 'presentation' : 'photos';
        break;
      case 'evaluation':
        etape = 'temoignages';
        break;
      default:
        break;
    }
  };

  const etapeSuivante = () => {
    switch (etape) {
      case 'informations-generales':
        if (validateurInformationsGenerales.estValide($jeuEnEditionStore)) {
          etape = 'presentation';
          erreurs = {};
        } else {
          erreurs = validateurInformationsGenerales.valide($jeuEnEditionStore);
        }
        break;
      case 'presentation':
        if (validateurPresentation.estValide($jeuEnEditionStore)) {
          etape = mode === 'modification' ? 'temoignages' : 'photos';
          erreurs = {};
        } else {
          erreurs = validateurPresentation.valide($jeuEnEditionStore);
        }
        break;
      case 'photos':
        if (validateurPhotosDuJeu.estValide({ photos: $photosJeuStore })) {
          etape = 'temoignages';
          erreurs = {};
        } else {
          erreurs = validateurPhotosDuJeu.valide({ photos: $photosJeuStore });
        }
        break;
      case 'temoignages':
        etape = 'evaluation';
        break;
      default:
        break;
    }
  };

  const soumets = async (event: Event) => {
    event.preventDefault();

    if (validateurEvaluation.estValide($jeuEnEditionStore)) {
      const formulaire = new FormData();

      formulaire.append(
        'jeu',
        JSON.stringify({
          ...$jeuEnEditionStore,
          temoignages: $jeuEnEditionStore.temoignages?.filter(
            (t) => !!t.prenom.trim() || !!t.details.trim(),
          ),
          eleves: $jeuEnEditionStore.eleves?.filter((e) => !!e?.trim()),
        }),
      );
      formulaire.append('couverture', $photosJeuStore.couverture!);
      $photosJeuStore?.photos?.forEach((photo) => {
        formulaire.append('photos', photo);
      });

      await axios.post('/api/mes-jeux', formulaire);

      window.location.href = '/mes-jeux?jeu-ajoute';
    } else {
      erreurs = validateurEvaluation.valide($jeuEnEditionStore);
    }
  };

  onMount(async () => {
    if (mode === 'modification') {
      const morceaux = window.location.pathname.split('/');
      const id = morceaux[morceaux.length - 1];
      const reponse = await axios.get<JeuEnEdition>(`/api/jeux/${id}`);
      $jeuEnEditionStore = reponse.data;
    }
  });
</script>

<dsfr-container>
  <div class="formulaire-jeu">
    {#if mode === 'creation'}
      <EtapierDeposeJeu etapeCourante={etape} />
    {:else}
      <EtapierModifieJeu etapeCourante={etape as EtapeModificationJeu} />
    {/if}
    <hr />
    {#if etape !== 'temoignages'}
      <p class="fr-text--xs mention">
        Sauf mention contraire, les informations demandées sont obligatoires.
      </p>
    {/if}
    <form novalidate>
      {#if etape === 'informations-generales'}
        <EtapeInformationsGenerales {erreurs} {referentielEtablissement} />
      {:else if etape === 'presentation'}
        <EtapePresentation {erreurs} />
      {:else if etape === 'photos'}
        <EtapePhotos {erreurs} />
      {:else if etape === 'temoignages'}
        <EtapeTemoignages />
      {:else if etape === 'evaluation'}
        <EtapeEvaluation {erreurs} />
      {/if}

      <div class="actions">
        {#if etape !== 'informations-generales'}
          <dsfr-button
            label="Précédent"
            kind="secondary"
            use:clic={etapePrecedente}
          ></dsfr-button>
        {/if}
        {#if etape === 'evaluation'}
          <dsfr-button label="Terminer" kind="primary" use:clic={soumets}
          ></dsfr-button>
        {:else if mode === 'modification' && etape === 'temoignages'}
          <dsfr-button label="Enregistrer les modifications" kind="primary"
          ></dsfr-button>
        {:else}
          <dsfr-button label="Suivant" kind="primary" use:clic={etapeSuivante}
          ></dsfr-button>
        {/if}
      </div>
    </form>
  </div>
</dsfr-container>

<style lang="scss">
  @use '../../points-de-rupture' as *;

  .formulaire-jeu {
    max-width: 792px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    justify-content: center;
    padding: 56px 16px;

    hr {
      margin: 2rem 0;
    }

    .mention {
      margin: 0;
      align-self: flex-start;
      color: #666;
    }

    form {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      gap: 1rem;

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1.5rem;
      }

      :global.erreur {
        color: red;
      }
    }
  }
</style>
