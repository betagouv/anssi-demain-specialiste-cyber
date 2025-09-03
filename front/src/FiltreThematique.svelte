<script lang="ts">
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Thématique Cyber</legend>
  <label>
    <select bind:value={$rechercheParThematique}>
      <option value="">Toutes les thématiques</option>
      {#each $ressourcesCyberFiltrees.thematiques as thematique}
        <option value={thematique}>{thematique}</option>
      {/each}
    </select>
  </label>
</fieldset>

<style lang="scss">
  select {
    width: 100%;
  }
</style>
