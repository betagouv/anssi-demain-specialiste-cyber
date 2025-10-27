<script lang="ts">
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<fieldset>
  <legend class="fr-text">Thématique</legend>
  <dsfr-select
    id="thematiques"
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
  fieldset {
    margin: 0 0 1rem;
  }
</style>
