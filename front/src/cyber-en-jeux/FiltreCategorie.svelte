<script lang="ts">
  import { NomDesCategories } from '../jeu.type';
  import { jeuxFiltres } from './stores/jeuxFiltres.store';
  import { rechercheParCategorie } from './stores/rechercheParCategorie.store';

  const categories = $derived(
    $jeuxFiltres.categories.map((categorie) => ({
      value: categorie,
      label: NomDesCategories[categorie],
    })),
  );
</script>

<fieldset>
  <legend class="fr-text">Catégorie</legend>
  <dsfr-select
    id="categories"
    value={$rechercheParCategorie}
    onvaluechanged={(e: CustomEvent) => ($rechercheParCategorie = e.detail)}
    placeholder="Toutes les catégories"
    placeholderDisabled={false}
    options={categories}
  >
  </dsfr-select>
</fieldset>

<style lang="scss">
  fieldset {
    margin: 0 0 1rem;
  }
</style>
