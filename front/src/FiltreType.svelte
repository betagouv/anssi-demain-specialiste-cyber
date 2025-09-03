<script lang="ts">
  import { rechercheParType } from './stores/rechercheParType.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Type</legend>
  <ul>
    {#each $ressourcesCyberFiltrees.types as type}
      <li>
        <label>
          <input bind:group={$rechercheParType} type="checkbox" value={type} />
          <span>{type}</span>
        </label>
      </li>
    {/each}
  </ul>
</fieldset>
