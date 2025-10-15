<script lang="ts">
  import type { RessourceCyber } from './ressourceCyber';

  interface Props {
    ressource: RessourceCyber;
  }
  const { ressource }: Props = $props();
</script>

<dsfr-card
  title={ressource.description}
  hasDetailStart
  detailStart={ressource.titre}
  href={ressource.lienExterne || `/ressources-cyber/${ressource.id}`}
  blank={ressource.lienExterne.startsWith('http')}
  src={ressource.urlIllustration || '/assets/images/image-generique.svg'}
  hasHeaderBadge
  hasDetailEnd
>
  <dsfr-badges-group
    slot="headerbadges"
    badges={[{ label: 'Libellé', accent: 'purple-glycine' }]}
    size="sm"
  ></dsfr-badges-group>
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
