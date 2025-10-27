<script lang="ts">
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { jeuxFiltres } from './stores/jeuxFiltres.store';
  import { NomsDesThematiques } from './jeu';
</script>

<fieldset>
  <legend class="fr-text">Thématique</legend>
  <dsfr-select
    id="thematiques"
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
</fieldset>

<style lang="scss">
  fieldset {
    margin: 0 0 1rem;
  }
</style>
