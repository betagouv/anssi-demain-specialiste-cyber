<svelte:options
  customElement={{
    tag: 'dsc-carte-catalogue',
    shadow: 'none',
    props: {
      ressource: { type: 'Object' },
      markup: { type: 'String' },
    },
  }}
/>

<script lang="ts">
  import {
    laCouleurDuBadgeSelonTypeRessourceCyber,
    urlDeLIllustrationPetite,
    type RessourceCyber,
  } from './ressourceCyber';

  interface Props {
    ressource: RessourceCyber;
    markup?: 'h2' | 'h3' | 'h4' | 'h5';
  }

  const { ressource, markup = 'h3' }: Props = $props();

  const illustrationPetite = $derived(
    urlDeLIllustrationPetite(ressource.urlIllustration),
  );

  const badges = $derived(
    ressource.types.map((type) => ({
      label: type,
      accent: laCouleurDuBadgeSelonTypeRessourceCyber(type),
    })),
  );
</script>

<dsfr-card
  title={ressource.description}
  hasDetailStart
  detailStart={ressource.titre}
  href={ressource.lienExterne || `/ressources-cyber/${ressource.id}`}
  blank={ressource.lienExterne.startsWith('http')}
  src={illustrationPetite}
  hasHeaderBadge
  hasDetailEnd
  size="sm"
  {markup}
  enlarge
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
