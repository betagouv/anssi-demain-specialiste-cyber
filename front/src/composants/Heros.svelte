<svelte:options
  customElement={{
    tag: 'dsc-heros',
    props: {
      variant: { attribute: 'variant', type: 'String' },
      ariane: { attribute: 'ariane', type: 'Array' },
      avecFiltres: { attribute: 'avec-filtres', type: 'Boolean' },
    },
  }}
/>

<script lang="ts">
  type Segment = {
    id: string;
    label: string;
    href: string;
  };

  type Props = {
    variant: 'standard' | 'alternatif';
    ariane: Segment[];
    avecFiltres?: boolean;
  };

  const {
    variant = 'standard',
    ariane = [],
    avecFiltres = false,
  }: Props = $props();
</script>

<div class={['heros', variant]}>
  <dsfr-container>
    <div class="conteneur" class:avec-filtres={avecFiltres}>
      <slot name="ariane">
        <dsfr-breadcrumb
          inverse={variant === 'standard'}
          buttonLabel="Voir le fil d'Ariane"
          segments={ariane}
        >
        </dsfr-breadcrumb>
      </slot>
      <div class="principal">
        {#if $$slots['avant-titre']}
          <div class="avant-titre">
            <slot name="avant-titre"></slot>
          </div>
        {/if}
        <hgroup>
          <slot name="titre"></slot>
          {#if $$slots.description}
            <slot name="description"></slot>
          {/if}
        </hgroup>
        {#if $$slots.default}
          <slot></slot>
        {/if}
      </div>
      {#if $$slots.illustration}
        <div class="illustration">
          <slot name="illustration"></slot>
        </div>
      {/if}
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .heros {
    &.standard {
      background:
        linear-gradient(
          90deg,
          var(--bleu-profond-dsc) 69.49%,
          rgb(from var(--bleu-profond-dsc) r g b / 0) 100%
        ),
        url('/assets/images/cercles-fond-sombre.avif') right 20% no-repeat,
        var(--bleu-profond-dsc);

      .conteneur {
        padding: 1px 0 1.5rem;

        @include a-partir-de(md) {
          &.avec-filtres {
            padding-bottom: 5rem;
          }
        }
      }

      .conteneur {
        padding: 1px 0 1.5rem;

        @include a-partir-de(md) {
          &.avec-filtres {
            padding-bottom: 5rem;
          }
        }
      }
    }

    &.alternatif {
      background:
        url('/assets/images/cercles-fond-clair.avif') right 20% no-repeat,
        url('/assets/images/heros-fond-clair.svg') repeat,
        url('/assets/images/heros-fond-clair.svg') repeat,
        var(--background-alt-blue-cumulus);

      .conteneur {
        padding: 1px 0 0;
      }

      @include a-partir-de(lg) {
        .conteneur {
          display: grid;
          gap: 0 1.5rem;
          grid-template-areas:
            'ariane ariane'
            'principal illustration';
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr;

          dsfr-breadcrumb {
            grid-area: ariane;
          }

          .principal {
            align-self: center;
            grid-area: principal;
            margin-right: 1.5rem;
          }

          hgroup {
            margin-bottom: 1.5rem;
          }

          .illustration {
            display: flex;
            align-self: stretch;
            grid-area: illustration;
            justify-self: stretch;
          }
        }
      }

      .conteneur {
        padding: 1px 0 0;
      }

      @include a-partir-de(lg) {
        .conteneur {
          display: grid;
          gap: 0 1.5rem;
          grid-template-areas:
            'ariane ariane'
            'principal illustration';
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr;

          dsfr-breadcrumb {
            grid-area: ariane;
          }

          .principal {
            align-self: center;
            grid-area: principal;
            margin-right: 1.5rem;
          }

          hgroup {
            margin-bottom: 1.5rem;
          }

          .illustration {
            display: flex;
            align-self: stretch;
            grid-area: illustration;
            justify-self: stretch;
          }
        }
      }
    }

    .conteneur {
      display: flex;
      flex-direction: column;
    }
  }
</style>
