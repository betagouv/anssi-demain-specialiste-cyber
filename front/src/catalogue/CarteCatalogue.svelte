<svelte:options
  customElement={{
    tag: 'dsc-carte-catalogue',
    shadow: 'none',
    props: {
      ressource: { type: 'Object' },
    },
  }}
/>

<script lang="ts">
  import {
    laCouleurDuBadgeSelonTypeRessourceCyber,
    type RessourceCyber,
  } from './ressourceCyber';

  interface Props {
    ressource: RessourceCyber;
  }
  const { ressource }: Props = $props();

  const illustrationPetite = $derived(
    `${ressource.urlIllustration.slice(0, ressource.urlIllustration.lastIndexOf('.'))}_petite.avif`,
  );

  const badges = ressource.types.map((type) => ({
    label: type,
    accent: laCouleurDuBadgeSelonTypeRessourceCyber(type),
  }));
</script>

<dsfr-card
  title={ressource.description}
  hasDetailStart
  detailStart={ressource.titre}
  href={ressource.lienExterne || `/ressources-cyber/${ressource.id}`}
  blank={ressource.lienExterne.startsWith('http')}
  src={illustrationPetite || '/assets/images/image-generique.svg'}
  hasHeaderBadge
  hasDetailEnd
  size="sm"
>
  <dsfr-badges-group slot="headerbadges" {badges} size="sm"></dsfr-badges-group>
  {#if ressource.estCertifiee}
    <dsfr-tags-group
      hasIcon
      slot="contentend"
      tags={[
        {
          id: `tag-certifie-${ressource.id}`,
          label: 'Ressource certifiée',
          icon: 'award-fill',
        },
      ]}
      size="sm"
      groupMarkup="div"
    ></dsfr-tags-group>
  {/if}
</dsfr-card>

<style lang="scss">
  dsfr-card {
    height: 100%;
  }
</style>
