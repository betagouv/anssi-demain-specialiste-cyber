<script lang="ts">
  import { rechercheParPublicCible } from './stores/rechercheParPublicCible.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Public cible</legend>
  <ul>
    {#each $ressourcesCyberFiltrees.publicsCible as publicCible}
      <li>
        <label>
          <input
            bind:group={$rechercheParPublicCible}
            type="checkbox"
            value={publicCible}
          />
          <span>{publicCible}</span>
        </label>
      </li>
    {/each}
  </ul>
</fieldset>
