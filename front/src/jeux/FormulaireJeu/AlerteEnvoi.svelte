<script lang="ts">
  const { erreur }: { erreur: string } = $props();
</script>

{#if erreur === 'Un des fichiers est infecté' || erreur === 'Le traitement de vos photos n’a pu aboutir'}
  <dsfr-alert
    hasTitle="true"
    hasDescription="true"
    text="Remplacez-les par des images sûres, dont vous connaissez la provenance, puis réessayez."
    title="Certaines photos n’ont pas pu être ajoutées."
    type="error"
    icon="error"
    dismissible
    size="sm"
  ></dsfr-alert>
{:else if erreur}
  <dsfr-alert
    hasTitle="false"
    hasDescription="true"
    text="Une erreur est survenue, veuillez réessayer. Si le problème persiste veuillez contacter le support : demainspecialistecyber@education.gouv.fr"
    type="error"
    icon="error"
    dismissible
    size="sm"
  ></dsfr-alert>
{/if}

<style lang="scss">
  dsfr-alert {
    margin-top: 32px;
  }
</style>
