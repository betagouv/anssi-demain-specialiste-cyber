<script lang="ts">
  import { rechercheParNiveau } from './stores/rechercheParNiveau.store';
  import { jeuxFiltres } from './stores/jeuxFiltres.store';

  const casesACocher = $derived(
    $jeuxFiltres.niveaux.map((niveau) => ({
      label: niveau,
      id: niveau,
      name: 'niveau',
      value: niveau,
    })),
  );
</script>

{#if casesACocher.length > 0}
  <dsfr-checkboxes-group
    legend="Niveau"
    checkboxes={casesACocher}
    values={$rechercheParNiveau}
    onvalueschanged={(e: CustomEvent) => ($rechercheParNiveau = e.detail)}
  >
  </dsfr-checkboxes-group>
{/if}
