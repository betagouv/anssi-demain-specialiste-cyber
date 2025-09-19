<svelte:options
  customElement={{ tag: 'dsc-formulaire-nouveau-jeu', shadow: 'none' }}
/>

<script lang="ts">
  import axios from 'axios';
  import { clic } from '../actions.svelte';
  import type { Validateur } from '../validateur';
  import type { JeuEnEdition } from './jeu';
  import {
    type ErreursValidationJeuEnEdition,
    ValidateurDeJeuEnEdition,
  } from './ValidateurDeJeuEnEdition';

  interface Props {
    validateur: Validateur<JeuEnEdition>;
  }

  const { validateur = new ValidateurDeJeuEnEdition() }: Props = $props();

  let nom = $state('');
  let nomEtablissement = $state('');
  let sequence = $state('');
  let discipline = $state('');
  let classe = $state('');
  let eleves = $state(['', '', '', '']);

  let erreurs = $state<ErreursValidationJeuEnEdition>({
    nom: undefined,
    nomEtablissement: undefined,
    sequence: undefined,
    classe: undefined,
    discipline: undefined,
  });

  const soumets = async (event: Event) => {
    event.preventDefault();

    const jeu: JeuEnEdition = {
      nom,
      sequence,
      nomEtablissement,
      discipline,
      classe,
      eleves: eleves.filter((e) => !!e?.trim()),
    };
    if (!validateur.estValide(jeu)) {
      erreurs = validateur.valide(jeu);
      return;
    }

    await axios.post('/api/jeux', jeu);
  };

  const ajouteEleve = () => {
    eleves.push('');
  };
</script>

<form novalidate>
  <dsfr-input
    errorMessage={erreurs.nom}
    id="nomDuJeu"
    label="Nom du jeu"
    onvaluechanged={(e: CustomEvent) => (nom = e.detail)}
    status={erreurs.nom ? 'error' : 'default'}
    value={nom}
  >
  </dsfr-input>

  <dsfr-input
    errorMessage={erreurs.nomEtablissement}
    id="nomEtablissement"
    label="Nom de votre établissement"
    onvaluechanged={(e: CustomEvent) => (nomEtablissement = e.detail)}
    status={erreurs.nomEtablissement ? 'error' : 'default'}
    value={nomEtablissement}
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
          bind:group={sequence}
        />
        Heure de cours
      </label>
      <label>
        <input
          type="radio"
          name="sequence"
          value="demi-journee"
          bind:group={sequence}
        />
        Demi-journee
      </label>
      <label>
        <input
          type="radio"
          name="sequence"
          value="journee"
          bind:group={sequence}
        />
        Journée
      </label>
    </div>
    {#if erreurs.sequence}
      <span class="erreur" role="alert">{erreurs.sequence}</span>
    {/if}
  </div>

  <dsfr-select
    errorMessage={erreurs.discipline}
    id="discipline"
    label="Discipline"
    value={discipline}
    onvaluechanged={(e: CustomEvent) => (discipline = e.detail)}
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
      { value: 'histoire-et-geographie', label: 'Histoire et géographie' },
      { value: 'sciences-et-technologie', label: 'Sciences et technologie' },
      { value: 'mathematiques', label: 'Mathématiques' },
    ]}
    placeholder="Sélectionner une option"
    placeholderDisabled={true}
    status={erreurs.discipline ? 'error' : 'default'}
  >
  </dsfr-select>

  <label>
    Classe
    <select placeholder="Sélectionner une option" bind:value={classe}>
      <option value="maternelle">Maternelle</option>
      <option value="cp">CP</option>
      <option value="ce1">CE1</option>
      <option value="ce2">CE2</option>
      <option value="cm1">CM1</option>
      <option value="cm2">CM2</option>
      <option value="6e">6e</option>
      <option value="5e">5e</option>
      <option value="4e">4e</option>
      <option value="3e">3e</option>
      <option value="seconde">Seconde</option>
      <option value="premiere">Première</option>
      <option value="terminale">Terminale</option>
      <option value="classe-prepa">Classe prépa</option>
      <option value="bts">BTS</option>
      <option value="superieur-hors-bts-et-prep"
        >Supérieur (hors BTS et Prepa)
      </option>
    </select>
  </label>
  {#if erreurs.classe}
    <span class="erreur" role="alert">{erreurs.classe}</span>
  {/if}

  <div class="eleves">
    <h5>Elèves participants</h5>
    {#if erreurs.eleves}
      <span class="erreur" role="alert">{erreurs.eleves}</span>
    {/if}
    {#each eleves as eleve, index}
      <dsfr-input
        label="Prénom"
        id="prenom-{index}"
        value={eleve}
        onvaluechanged={(e: CustomEvent) => (eleves[index] = e.detail)}
      ></dsfr-input>
    {/each}
    <dsfr-button
      label="Ajouter un élève"
      kind="secondary"
      use:clic={ajouteEleve}
    ></dsfr-button>
  </div>

  <div class="actions">
    <dsfr-button label="Terminer" kind="primary" use:clic={soumets}
    ></dsfr-button>
  </div>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 792px;

    .sequence {
      display: flex;
      flex-direction: column;

      .boutons {
        display: flex;
        flex-direction: column;
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
</style>
