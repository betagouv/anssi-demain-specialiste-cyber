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
