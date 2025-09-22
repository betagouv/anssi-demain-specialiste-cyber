<svelte:options
  customElement={{ tag: 'dsc-formulaire-nouveau-jeu', shadow: 'none' }}
/>

<script lang="ts">
  import axios from 'axios';
  import { clic } from '../actions.svelte';
  import type { Validateur } from '../validateur';
  import type {
    ErreursValidationJeuEnEdition,
    InformationsGeneralesDuJeu,
    JeuEnEdition,
    PresentationDuJeu,
  } from './jeu';
  import { ValidateurInformationsGeneralesDuJeu } from './ValidateurInformationsGeneralesDuJeu';
  import { ValidateurPresentationDuJeu } from './ValidateurPresentationDuJeu';

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

  let jeu = $state<JeuEnEdition>({ eleves: ['', '', '', ''] });

  let erreurs = $state<ErreursValidationJeuEnEdition>({
    nom: undefined,
    nomEtablissement: undefined,
    sequence: undefined,
    classe: undefined,
    discipline: undefined,
  });

  const etapeSuivante = () => {
    switch (etape) {
      case 'informations-generales':
        if (validateurInformationsGenerales.estValide(jeu)) {
          etape = 'presentation';
        } else {
          erreurs = validateurInformationsGenerales.valide(jeu);
        }
        break;
      default:
        break;
    }
  };

  const soumets = async (event: Event) => {
    event.preventDefault();
    if (!validateurPresentation.estValide(jeu)) {
      erreurs = validateurPresentation.valide(jeu);

      return;
    }

    await axios.post('/api/jeux', {
      ...jeu,
      eleves: jeu.eleves?.filter((e) => !!e?.trim()),
    });
  };

  const ajouteEleve = () => {
    jeu.eleves = [...(jeu.eleves ?? []), ''];
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
        <dsfr-input
          errorMessage={erreurs.nomEtablissement}
          id="nomEtablissement"
          label="Nom de votre établissement"
          onvaluechanged={(e: CustomEvent) => (jeu.nomEtablissement = e.detail)}
          status={erreurs.nomEtablissement ? 'error' : 'default'}
          value={jeu.nomEtablissement}
        >
        </dsfr-input>

        <div class="sequence">
          <p>Format de la séquence CyberEnJeux</p>
          <div class="boutons">
            <label>
              <input
                type="radio"
                name="sequence"
                value="heure"
                required
                bind:group={jeu.sequence}
              />
              Heure de cours
            </label>
            <label>
              <input
                type="radio"
                name="sequence"
                value="demi-journee"
                bind:group={jeu.sequence}
              />
              Demi-journee
            </label>
            <label>
              <input
                type="radio"
                name="sequence"
                value="journee"
                bind:group={jeu.sequence}
              />
              Journée
            </label>
          </div>
          {#if erreurs.sequence}
            <span class="erreur" role="alert">{erreurs.sequence}</span>
          {/if}
        </div>

        <fieldset class="eleves">
          <legend>Elèves participants</legend>

          {#if erreurs.eleves}
            <span class="erreur" role="alert">{erreurs.eleves}</span>
          {/if}
          <div class="prenoms">
            {#each jeu.eleves ?? [] as eleve, index}
              <dsfr-input
                label="Prénom"
                id="prenom-{index}"
                value={eleve}
                onvaluechanged={(e: CustomEvent) =>
                  (jeu.eleves = jeu.eleves?.toSpliced(index, 1, e.detail))}
              ></dsfr-input>
            {/each}
          </div>
          <dsfr-button
            label="Ajouter un élève"
            kind="secondary"
            use:clic={ajouteEleve}
          ></dsfr-button>
        </fieldset>

        <dsfr-select
          errorMessage={erreurs.discipline}
          id="discipline"
          label="Discipline"
          value={jeu.discipline}
          onvaluechanged={(e: CustomEvent) => (jeu.discipline = e.detail)}
          options={[
            { value: 'francais', label: 'Français' },
            { value: 'langues-vivantes', label: 'Langues vivantes' },
            { value: 'arts-plastiques', label: 'Arts plastiques' },
            { value: 'education-musicale', label: 'Éducation musicale' },
            { value: 'histoire-des-arts', label: 'Histoire des arts' },
            {
              value: 'education-physique-et-sportive',
              label: 'Éducation physique et sportive',
            },
            {
              value: 'enseignement-moral-et-civique',
              label: 'Enseignement moral et civique',
            },
            {
              value: 'histoire-et-geographie',
              label: 'Histoire et géographie',
            },
            {
              value: 'sciences-et-technologie',
              label: 'Sciences et technologie',
            },
            { value: 'mathematiques', label: 'Mathématiques' },
          ]}
          placeholder="Sélectionner une option"
          placeholderDisabled={true}
          status={erreurs.discipline ? 'error' : 'default'}
        >
        </dsfr-select>

        <dsfr-select
          errorMessage={erreurs.classe}
          id="classe"
          label="Classe"
          value={jeu.classe}
          onvaluechanged={(e: CustomEvent) => (jeu.classe = e.detail)}
          options={[
            { value: 'maternelle', label: 'Maternelle' },
            { value: 'cp', label: 'CP' },
            { value: 'ce1', label: 'CE1' },
            { value: 'ce2', label: 'CE2' },
            { value: 'cm1', label: 'CM1' },
            { value: 'cm2', label: 'CM2' },
            { value: '6e', label: '6e' },
            { value: '5e', label: '5e' },
            { value: '4e', label: '4e' },
            { value: '3e', label: '3e' },
            { value: 'seconde', label: 'Seconde' },
            { value: 'premiere', label: 'Première' },
            { value: 'terminale', label: 'Terminale' },
            { value: 'classe-prepa', label: 'Classe prépa' },
            { value: 'bts', label: 'BTS' },
            {
              value: 'superieur-hors-bts-et-prep',
              label: 'Supérieur (hors BTS et Prepa)',
            },
          ]}
          placeholder="Sélectionner une option"
          placeholderDisabled={true}
          status={erreurs.classe ? 'error' : 'default'}
        >
        </dsfr-select>
      {/if}
      {#if etape === 'presentation'}
        <dsfr-input
          errorMessage={erreurs.nom}
          id="nomDuJeu"
          label="Nom du jeu"
          onvaluechanged={(e: CustomEvent) => (jeu.nom = e.detail)}
          status={erreurs.nom ? 'error' : 'default'}
          value={jeu.nom}
        >
        </dsfr-input>
      {/if}

      <div class="actions">
        {#if etape === 'informations-generales'}
          <dsfr-button label="Suivant" kind="primary" use:clic={etapeSuivante}
          ></dsfr-button>
        {:else}
          <dsfr-button label="Terminer" kind="primary" use:clic={soumets}
          ></dsfr-button>
        {/if}
      </div>
    </form>
  </div>
</dsfr-container>

<style lang="scss">
  @use '../points-de-rupture' as *;
  .formulaire-jeu {
    max-width: 792px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    justify-content: center;
    align-items: center;
    padding: 56px 16px;
    gap: 10px;

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
      .sequence {
        display: flex;
        flex-direction: column;

        .boutons {
          display: flex;
          flex-direction: column;
        }
      }

      .eleves {
        legend {
          color: #161616;
          font-weight: 700;
          line-height: 1.5rem;
          margin-bottom: 1rem;
        }
        .prenoms {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr;
          grid-template-rows: auto;
        }

        @include a-partir-de(sm) {
          .prenoms {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      }

      .actions {
        display: flex;
        justify-content: flex-end;
      }

      .erreur {
        color: red;
      }

      input:user-invalid {
        border: 2px solid red;
      }
    }
  }
</style>
