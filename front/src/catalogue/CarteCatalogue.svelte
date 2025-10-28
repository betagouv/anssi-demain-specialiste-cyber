<script lang="ts">
  import type { CouleurDeBadge } from '../badge.type';
  import type { RessourceCyber, TypesRessourceCyber } from './ressourceCyber';

  interface Props {
    ressource: RessourceCyber;
  }
  const { ressource }: Props = $props();

  const couleursTypes: Record<TypesRessourceCyber, CouleurDeBadge> = {
    'Contenus audio / vidéo': 'green-emeraude',
    'Formation - Mentorat': 'pink-tuile',
    'Guides - fiches - études': 'blue-cumulus',
    'Jeux - challenges': 'green-archipel',
    'Outil technique': 'beige-gris-galet',
  };

  const badges = ressource.types.map((type) => ({
    label: type,
    accent: couleursTypes[type] ?? 'purple-glycine',
  }));
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
