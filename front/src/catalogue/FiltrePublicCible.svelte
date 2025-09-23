<script lang="ts">
  import { rechercheParPublicCible } from './stores/rechercheParPublicCible.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';

  const casesACocher = $derived(
    $ressourcesCyberFiltrees.publicsCible.map((cible) => ({
      label: cible,
      id: cible,
      name: 'public-cible',
      value: cible,
    })),
  );
</script>

{#if casesACocher.length > 0}
  <dsfr-checkboxes-group
    legend="Public cible"
    checkboxes={casesACocher}
    values={$rechercheParPublicCible}
    onvalueschanged={(e: CustomEvent) => ($rechercheParPublicCible = e.detail)}
  >
  </dsfr-checkboxes-group>
{/if}
