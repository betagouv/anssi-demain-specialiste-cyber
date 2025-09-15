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
