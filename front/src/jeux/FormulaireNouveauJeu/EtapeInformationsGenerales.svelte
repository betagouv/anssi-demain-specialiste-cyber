<script lang="ts">
  import { onMount } from 'svelte';
  import { clic } from '../../actions.svelte.js';
  import type { ErreursValidationJeuEnEdition } from '../jeu';
  import { jeuEnEditionStore } from '../stores/jeuEnEdition.store';
  import NomEtablissementAutoComplete from './NomEtablissementAutoComplete.svelte';
  import type { ReferentielEtablissement } from './ReferentielEtablissement';

  export let erreurs: ErreursValidationJeuEnEdition;
  export let referentielEtablissement: ReferentielEtablissement;

  const ajouteEleve = () => {
    $jeuEnEditionStore.eleves ??= [];
    $jeuEnEditionStore.eleves.push('');
  };

  let estPetitEcran = false;
  onMount(() => {
    const mql = window.matchMedia('(max-width: 576px)');
    mql.addEventListener('change', (e: MediaQueryListEvent) => {
      estPetitEcran = e.matches;
    });
    estPetitEcran = mql.matches;
  });
</script>

<NomEtablissementAutoComplete
  bind:valeur={$jeuEnEditionStore.nomEtablissement}
  {referentielEtablissement}
  messageErreur={erreurs.nomEtablissement}
/>

<dsfr-radios-group
  id="sequence"
  legend="Format de la séquence CyberEnJeux"
  inline={!estPetitEcran}
  radios={[
    {
      label: 'Heure de cours',
      id: 'heure',
      name: 'sequence',
      value: 'heure',
    },
    {
      label: 'Demi-journée',
      id: 'demi-journee',
      name: 'sequence',
      value: 'demi-journee',
    },
    {
      label: 'Journée',
      id: 'journee',
      name: 'sequence',
      value: 'journee',
    },
  ]}
  value={$jeuEnEditionStore.sequence}
  onvaluechanged={(e: CustomEvent) => ($jeuEnEditionStore.sequence = e.detail)}
  status={erreurs.sequence ? 'error' : 'default'}
  errorMessage={erreurs.sequence}
></dsfr-radios-group>

<fieldset class="eleves">
  <legend>Elèves participants</legend>

  {#if erreurs.eleves}
    <dsfr-alert
      hasTitle={false}
      hasDescription={true}
      text={erreurs.eleves}
      type="error"
      size="sm"
      id="erreurs-eleves"
      icon=""
      dismissible={false}
    ></dsfr-alert>
  {/if}
  <div class="prenoms">
    {#each $jeuEnEditionStore.eleves ?? [] as eleve, index}
      <dsfr-input
        label="Prénom"
        id="prenom-{index}"
        value={eleve}
        onvaluechanged={(e: CustomEvent) =>
          ($jeuEnEditionStore.eleves = $jeuEnEditionStore.eleves?.toSpliced(
            index,
            1,
            e.detail,
          ))}
      ></dsfr-input>
    {/each}
  </div>
  <div class="actions">
    <dsfr-button
      label="Ajouter un élève"
      kind="secondary"
      hasIcon="true"
      icon="user-add-line"
      use:clic={ajouteEleve}
    ></dsfr-button>
  </div>
</fieldset>

<dsfr-select
  errorMessage={erreurs.discipline}
  id="discipline"
  label="Discipline"
  value={$jeuEnEditionStore.discipline ?? ''}
  onvaluechanged={(e: CustomEvent) =>
    ($jeuEnEditionStore.discipline = e.detail)}
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
    { value: 'physique-chimie', label: 'Physique-chimie' },
    { value: 'svt', label: 'Sciences de la vie et de la Terre' },
    { value: 'technologie', label: 'Technologie' },
    {
      value: 'education-médias-information',
      label: "Éducation aux médias et à l'information",
    },
    {
      value: 'sciences-economiques-sociales',
      label: 'Sciences économiques et sociales',
    },
    {
      value: 'sciences-numériques-technologie',
      label: 'Sciences numériques et technologie',
    },
    { value: 'enseignement-scientifique', label: 'Enseignement scientifique' },
    { value: 'post-bac', label: 'Post Bac' },
    { value: 'autre', label: 'Autre' },
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
  value={$jeuEnEditionStore.classe ?? ''}
  onvaluechanged={(e: CustomEvent) => ($jeuEnEditionStore.classe = e.detail)}
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

<style lang="scss">
  @use '../../points-de-rupture' as *;

  .sequence {
    display: flex;
    flex-direction: column;

    .boutons {
      display: flex;
      flex-direction: column;
    }
  }

  .eleves {
    margin: 0;

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

    .actions {
      display: flex;
      justify-content: start;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    @include a-partir-de(sm) {
      .prenoms {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
</style>
