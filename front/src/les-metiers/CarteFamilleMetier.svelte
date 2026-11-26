<script lang="ts">
  import { accentPourFamille, slugifie, type FamilleMetier } from './familleMetier.type';

  type Props = {
    famille: Pick<FamilleMetier, 'titre' | 'sousTitre' | 'code' | 'numéro'>;
    enlarge?: boolean;
  };

  const { famille, enlarge = false }: Props = $props();

  const accent = $derived(accentPourFamille(famille.code));
</script>

<dsfr-card
  title={famille.titre}
  has-description
  description={famille.sousTitre}
  has-badge
  has-links
  no-icon
  size="lg"
  horizontal
  horizontal-proportion="tier"
  href={enlarge ? `/familles-metier/${slugifie(famille.code)}` : undefined}
  no-link={enlarge ? undefined : true}
  {enlarge}
>
  <div class={['carte-famille-image', accent]} slot="image">
    <span class="carte-famille-numero">{famille.numéro}</span>
  </div>
  <dsfr-badges-group slot="badgesgroup" badges={[{ label: famille.code, accent }]} size="sm"></dsfr-badges-group>
  <dsfr-link
    slot="linksgroup"
    label="Explorer cette famille"
    href={`/familles-metier/${slugifie(famille.code)}`}
    size="md"
    has-icon
    icon="arrow-right-line"
    icon-place="right"
  ></dsfr-link>
</dsfr-card>

<style lang="scss">
  .carte-famille-image {
    background-color: var(--image-couleur-fond);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-block: 2.75rem;

    &.yellow-moutarde {
      --image-couleur-fond: var(--background-contrast-yellow-moutarde);
      --numero-couleur-bordure: var(--artwork-motif-yellow-moutarde);
      --numero-couleur-texte: var(--text-label-yellow-moutarde);
    }
    &.green-emeraude {
      --image-couleur-fond: var(--background-contrast-green-emeraude);
      --numero-couleur-bordure: var(--artwork-motif-green-emeraude);
      --numero-couleur-texte: var(--text-label-green-emeraude);
    }
    &.blue-cumulus {
      --image-couleur-fond: var(--background-contrast-blue-cumulus);
      --numero-couleur-bordure: var(--artwork-motif-blue-cumulus);
      --numero-couleur-texte: var(--text-label-blue-cumulus);
    }
    &.purple-glycine {
      --image-couleur-fond: var(--background-contrast-purple-glycine);
      --numero-couleur-bordure: var(--artwork-motif-purple-glycine);
      --numero-couleur-texte: var(--text-label-purple-glycine);
    }
    &.green-archipel {
      --image-couleur-fond: var(--background-contrast-green-archipel);
      --numero-couleur-bordure: var(--artwork-motif-green-archipel);
      --numero-couleur-texte: var(--text-label-green-archipel);
    }
  }

  .carte-famille-numero {
    --numero-dimension: 47.75%;

    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: 0.75rem solid var(--numero-couleur-bordure);
    color: var(--numero-couleur-texte);
    font-size: 4.188rem;
    font-weight: bold;
    width: var(--numero-dimension);
  }
</style>
