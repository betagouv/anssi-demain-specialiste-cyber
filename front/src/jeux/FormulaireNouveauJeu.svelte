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

  <dsfr-select
    errorMessage={erreurs.classe}
    id="classe"
    label="Classe"
    value={classe}
    onvaluechanged={(e: CustomEvent) => (classe = e.detail)}
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
