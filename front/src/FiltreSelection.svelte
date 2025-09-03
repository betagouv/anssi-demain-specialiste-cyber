<script lang="ts">
  import { rechercheParSelection } from './stores/rechercheParSelection.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Sélection</legend>
  <ul>
    {#each $ressourcesCyberFiltrees.selections as selection}
      <li>
        <label>
          <input
            bind:group={$rechercheParSelection}
            type="checkbox"
            value={selection}
          />
          <span>{selection}</span>
        </label>
      </li>
    {/each}
  </ul>
</fieldset>
