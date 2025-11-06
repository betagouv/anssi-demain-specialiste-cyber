<script lang="ts">
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { jeuxFiltres } from './stores/jeuxFiltres.store';
  import { NomsDesThematiques } from './jeu';
</script>

<dsfr-select
  id="thematiques"
  label="Thématique"
  value={$rechercheParThematique}
  onvaluechanged={(e: CustomEvent) => ($rechercheParThematique = e.detail)}
  placeholder="Toutes les thématiques"
  placeholderDisabled={false}
  options={$jeuxFiltres.thematiques.map((thematique) => ({
    value: thematique,
    label: NomsDesThematiques[thematique],
  }))}
>
</dsfr-select>

<style lang="scss">
  dsfr-select {
    margin-bottom: 1rem;
  }
</style>
