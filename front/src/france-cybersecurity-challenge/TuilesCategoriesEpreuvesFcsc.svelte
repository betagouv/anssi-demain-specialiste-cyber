<script lang="ts">
  const categories = [
    { titre: 'Cryptographie', pictogramme: 'cadenas' },
    { titre: 'Reverse', pictogramme: 'roue-reverse' },
    { titre: 'Web', pictogramme: 'navigateur-web' },
    {
      titre: 'Exploitation binaire',
      pictogramme: 'loupe-binaire-dans-bouclier',
    },
    { titre: 'Hardware', pictogramme: 'micro-puce' },
    {
      titre: 'Investigation numérique',
      pictogramme: 'loupe-binaire-empreinte',
    },
    { titre: 'Algorithmique', pictogramme: 'roue-algo' },
  ];
</script>

<div class="categories-epreuves">
  {#each categories as { titre, pictogramme } (titre)}
    <dsfr-tile
      title={titre}
      size="sm"
      actionMarkup="false"
      noLink={true}
      enlarge
    >
      <img
        src={`/assets/images/fcsc/${pictogramme}.svg`}
        slot="pictogram"
        alt="Cadenas"
      />
    </dsfr-tile>
  {/each}
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .categories-epreuves {
    margin: 1.5rem 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(var(--nombre-colonnes), 1fr);
    @include a-partir-de(sm) {
      --nombre-colonnes: 2;
    }
    @include a-partir-de(md) {
      --nombre-colonnes: 3;
    }
    @include a-partir-de(lg) {
      --nombre-colonnes: 4;
    }
  }
</style>
