<script lang="ts">
  import { onMount } from 'svelte';
  import { clic } from '../../actions.svelte';
  import { classes } from '../classes';
  import { disciplines } from '../disciplines';
  import type { ErreursValidationJeuEnEdition } from '../jeuEnEdition.type';
  import { sequences } from '../sequences';
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

  const radioSequences = sequences.map((sequence) => ({
    label: sequence.libelle,
    id: sequence.code,
    name: 'sequence',
    value: sequence.code,
  }));
  const optionsDisciplines = disciplines.map((discipline) => ({
    label: discipline.libelle,
    value: discipline.code,
  }));
  const optionsClasses = classes.map((classe) => ({
    label: classe.libelle,
    value: classe.code,
  }));
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
  radios={radioSequences}
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
  options={optionsDisciplines}
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
  options={optionsClasses}
  placeholder="Sélectionner une option"
  placeholderDisabled={true}
  status={erreurs.classe ? 'error' : 'default'}
>
</dsfr-select>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .eleves {
    margin: 0;

    legend {
      color: #161616;
      font-weight: 700;
      line-height: 1.5rem;
      margin-bottom: 1rem;
    }

    dsfr-alert {
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
