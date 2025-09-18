<script lang="ts">
  import { rechercheParNiveau } from './stores/rechercheParNiveau.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Niveau</legend>
  <ul>
    {#each $ressourcesCyberFiltrees.niveaux as niveau}
      <li>
        <dsfr-checkbox
          id={niveau}
          label={niveau}
          value={niveau}
          name={$rechercheParNiveau}
          onvaluechanged={(e: CustomEvent) => ($rechercheParNiveau = e.detail)}
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
