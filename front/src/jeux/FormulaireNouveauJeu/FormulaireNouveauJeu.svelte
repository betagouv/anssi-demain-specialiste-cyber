<svelte:options
  customElement={{ tag: 'dsc-formulaire-nouveau-jeu', shadow: 'none' }}
/>

<script lang="ts">
  import axios from 'axios';
  import { clic } from '../../actions.svelte.js';
  import type { Validateur } from '../../validateur';
  import type {
    ErreursValidationJeuEnEdition,
    InformationsGeneralesDuJeu,
    PresentationDuJeu,
  } from '../jeu';
  import { ValidateurInformationsGeneralesDuJeu } from '../ValidateurInformationsGeneralesDuJeu';
  import { ValidateurPresentationDuJeu } from '../ValidateurPresentationDuJeu';
  import { jeuEnEditionStore } from '../stores/jeuEnEdition.store';
  import EtapeInformationsGenerales from './EtapeInformationsGenerales.svelte';
  import EtapePresentation from './EtapePresentation.svelte';

  type Etape = 'informations-generales' | 'presentation';

  interface Props {
    validateurInformationsGenerales: Validateur<InformationsGeneralesDuJeu>;
    validateurPresentation: Validateur<PresentationDuJeu>;
  }

  const {
    validateurInformationsGenerales = new ValidateurInformationsGeneralesDuJeu(),
    validateurPresentation = new ValidateurPresentationDuJeu(),
  }: Props = $props();

  let etape = $state<Etape>('informations-generales');

  $jeuEnEditionStore = { eleves: ['', '', '', ''] };

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
      default:
        break;
    }
  };

  const etapeSuivante = () => {
    switch (etape) {
      case 'informations-generales':
        if (validateurInformationsGenerales.estValide($jeuEnEditionStore)) {
          etape = 'presentation';
        } else {
          erreurs = validateurInformationsGenerales.valide($jeuEnEditionStore);
        }
        break;
      default:
        break;
    }
  };

  const soumets = async (event: Event) => {
    event.preventDefault();

    if (!validateurPresentation.estValide($jeuEnEditionStore)) {
      erreurs = validateurPresentation.valide($jeuEnEditionStore);
      return;
    }

    await axios.post('/api/jeux', {
      ...$jeuEnEditionStore,
      eleves: $jeuEnEditionStore.eleves?.filter((e) => !!e?.trim()),
    });
  };
</script>

<dsfr-container>
  <div class="formulaire-jeu">
    <hr />
    <p class="mention">
      Sauf mention contraire, les informations demandées sont obligatoires.
    </p>
    <form novalidate>
      {#if etape === 'informations-generales'}
        <EtapeInformationsGenerales {erreurs} />
      {:else if etape === 'presentation'}
        <EtapePresentation {erreurs} />
      {/if}

      <div class="actions">
        {#if etape === 'informations-generales'}
          <dsfr-button label="Suivant" kind="primary" use:clic={etapeSuivante}
          ></dsfr-button>
        {:else}
          <dsfr-button
            label="Précédent"
            kind="secondary"
            use:clic={etapePrecedente}
          ></dsfr-button>
          <dsfr-button label="Terminer" kind="primary" use:clic={soumets}
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
    align-items: center;
    padding: 56px 16px;

    hr {
      align-self: stretch;
      height: 1px;
      border: 0;
      background-color: #dddddd;
      margin: 2rem 0;
    }

    .mention {
      margin: 0;
      align-self: flex-start;
      color: #666;
      font-size: 0.75rem;
      line-height: 1.25rem;
    }

    form {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      gap: 1.5rem;

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
