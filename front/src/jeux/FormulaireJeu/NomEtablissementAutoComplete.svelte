<script lang="ts">
  import type { ReferentielEtablissement } from './ReferentielEtablissement';

  interface Props {
    referentielEtablissement: ReferentielEtablissement;
    valeur?: string;
    messageErreur?: string;
  }
  let {
    messageErreur,
    referentielEtablissement,
    valeur = $bindable(),
  }: Props = $props();

  let suggestions: string[] = $state([]);

  function cadence(
    fonction: (str: string) => Promise<string[]>,
    delai: number,
  ): (terme: string) => void {
    let minuteur: ReturnType<typeof setTimeout>;

    return (terme): void => {
      clearTimeout(minuteur);
      minuteur = setTimeout(async () => {
        suggestions = await fonction(terme);
      }, delai);
    };
  }

  const rechercheEtablissementTemporise = cadence(
    referentielEtablissement.trouveParNom,
    500,
  );

  function surSelection(nomEtablissement: string) {
    suggestions = [];
    valeur = nomEtablissement;
  }
</script>

<div class="conteneur-autocompletion">
  <dsfr-input
    errorMessage={messageErreur}
    id="nomEtablissement"
    label="Nom de votre établissement"
    onvaluechanged={(e: CustomEvent) => {
      valeur = e.detail;
      rechercheEtablissementTemporise(e.detail);
    }}
    status={messageErreur ? 'error' : 'default'}
    value={valeur}
  >
  </dsfr-input>
  <div class="liste-suggestions" class:visible={suggestions.length}>
    {#each suggestions as suggestion, index}
      <div
        id="etablissement-{index}"
        class="option"
        role="button"
        tabindex="0"
        onclick={() => {
          surSelection(suggestion);
        }}
        onkeypress={() => {}}
      >
        <div>{suggestion}</div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .conteneur-autocompletion {
    position: relative;
    .liste-suggestions {
      display: none;
      background-color: white;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      width: 100%;

      position: absolute;
      left: 0;
      top: 100%;
      z-index: 100;
    }

    .visible {
      display: grid;
      border: 1px solid var(--border-default-grey);
    }

    .option {
      padding: 0.25rem;
      cursor: pointer;
      &:focus-visible {
        outline: 2px solid #0a76f6;
      }
      &:hover {
        background-color: var(--background-default-grey-hover);
      }
    }
  }
</style>
