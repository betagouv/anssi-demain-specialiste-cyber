<script lang="ts">
  import { rechercheParType } from './stores/rechercheParType.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Type</legend>
  <ul>
    {#each $ressourcesCyberFiltrees.types as type}
      <li>
        <dsfr-checkbox
          id={type}
          label={type}
          value={type}
          name={$rechercheParType}
          onvaluechanged={(e: CustomEvent) => ($rechercheParType = e.detail)}
        >
        </dsfr-checkbox>
      </li>
    {/each}
  </ul>
</fieldset>

<style lang="scss">
  fieldset {
    margin: 0;

    legend {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    ul {
      display: flex;
      flex-flow: column nowrap;
      gap: 1rem;
      margin-top: 1rem;
    }
  }
</style>
