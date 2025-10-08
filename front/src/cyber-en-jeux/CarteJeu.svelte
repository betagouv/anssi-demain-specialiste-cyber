<script lang="ts">
  import { enumerationFrancaise } from '../jeux/jeu';
  import BadgesThematiques from './BadgesThematiques.svelte';
  import type { Thematique } from './jeu';

  type Props = {
    id: string;
    nom: string;
    eleves: string[];
    nomEtablissement: string;
    thematiques?: Thematique[];
    cheminCouverture: string;
  };

  const {
    id,
    nom,
    eleves,
    nomEtablissement,
    thematiques,
    cheminCouverture,
  }: Props = $props();
</script>

<dsfr-card
  title={nom}
  description="Élaboré par {enumerationFrancaise(eleves)}"
  href={`/jeux/${id}`}
  src={cheminCouverture}
  hasHeaderBadge
  hasDetailStartIcon
  detailStartIcon="map-pin-2-line"
  hasDetailStart
  detailStart={nomEtablissement}
>
  {#if thematiques && thematiques.length > 0}
    <div slot="headerbadges">
      <BadgesThematiques {thematiques} taille="sm" />
    </div>
  {/if}
</dsfr-card>
