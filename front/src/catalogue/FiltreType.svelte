<script lang="ts">
  import { rechercheParType } from './stores/rechercheParType.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';

  const casesACocher = $derived(
    $ressourcesCyberFiltrees.types.map((type) => ({
      label: type,
      id: type,
      name: type,
      value: type,
    })),
  );
</script>

{#if casesACocher.length > 0}
  <dsfr-checkboxes-group
    legend="Type"
    checkboxes={casesACocher}
    onvaluechanged={(e: CustomEvent) => ($rechercheParType = e.detail)}
  >
  </dsfr-checkboxes-group>
{/if}
