<script lang="ts">
  import { rechercheParNiveau } from './stores/rechercheParNiveau.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Niveau</legend>
  <ul>
    {#each $ressourcesCyberFiltrees.niveaux as niveau}
      <li>
        <label>
          <input
            bind:group={$rechercheParNiveau}
            type="checkbox"
            value={niveau}
          />
          <span>{niveau}</span>
        </label>
      </li>
    {/each}
  </ul>
</fieldset>
