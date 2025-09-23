<script lang="ts">
  import { rechercheParNiveau } from './stores/rechercheParNiveau.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';

  const casesACocher = $derived(
    $ressourcesCyberFiltrees.niveaux.map((type) => ({
      label: type,
      id: type,
      name: type,
      value: type,
    })),
  );
</script>

{#if casesACocher.length > 0}
  <dsfr-checkboxes-group
    legend="Niveau"
    checkboxes={casesACocher}
    onvaluechanged={(e: CustomEvent) => ($rechercheParNiveau = e.detail)}
  >
  </dsfr-checkboxes-group>
{/if}
