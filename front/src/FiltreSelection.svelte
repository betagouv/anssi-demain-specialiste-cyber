<script lang="ts">
  import { rechercheParPublicCible } from './stores/rechercheParPublicCible.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Sélection</legend>
  <ul>
    {#each $ressourcesCyberFiltrees.publicsCible as selection}
      <li>
        <label>
          <input
            bind:group={$rechercheParPublicCible}
            type="checkbox"
            value={selection}
          />
          <span>{selection}</span>
        </label>
      </li>
    {/each}
  </ul>
</fieldset>
