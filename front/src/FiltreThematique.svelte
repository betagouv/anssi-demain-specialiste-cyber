<script lang="ts">
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend>Thématique</legend>
  <dsfr-select
    value={$rechercheParThematique}
    onvaluechanged={(e: CustomEvent) => ($rechercheParThematique = e.detail)}
    placeholder="Toutes les thématiques"
    placeholderDisabled={false}
    options={$ressourcesCyberFiltrees.thematiques.map((thematique) => ({
      label: thematique,
      value: thematique,
    }))}
  >
  </dsfr-select>
</fieldset>

<style lang="scss">
  select {
    width: 100%;
  }
</style>
