<script lang="ts">
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
</script>

<dsfr-select
  id="thematiques"
  label="Thématique"
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

<style lang="scss">
  dsfr-select {
    margin-bottom: 1rem;
  }
</style>
