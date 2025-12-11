<script lang="ts">
  const { erreur }: { erreur: string } = $props();
</script>

{#if erreur}
  <dsfr-alert
    hasTitle="false"
    hasDescription="true"
    text={erreur}
    type="error"
    icon="error"
  ></dsfr-alert>
{/if}
