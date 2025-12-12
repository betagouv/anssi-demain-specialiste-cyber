<script lang="ts">
  import { clic } from '../../actions.svelte';
  import type { EtapeDeposeJeu } from './FormulaireDeJeu.type';

  const {
    erreur,
    redirigeVersEtape,
  }: {
    erreur: string;
    redirigeVersEtape: (etapeCible: EtapeDeposeJeu) => void;
  } = $props();
</script>

{#if erreur === 'Un des fichiers est infecté' || erreur === 'Le traitement de vos photos n’a pu aboutir'}
  <dsfr-alert
    hasTitle="true"
    title="Certaines photos n’ont pas pu être ajoutées."
    hasDescription="true"
    type="error"
    icon="error"
    dismissible
  >
    <div slot="description">
      <p>
        Remplacez-les par des images sûres, dont vous connaissez la provenance,
        puis réessayez.
      </p>
      <dsfr-button
        label="Accéder aux photos"
        kind="tertiary"
        size="sm"
        use:clic={() => redirigeVersEtape('photos')}
      ></dsfr-button>
    </div>
  </dsfr-alert>
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
