<svelte:options
  customElement={{
    tag: 'dsc-heros',
    props: {
      titre: { attribute: 'titre', type: 'String' },
      description: { attribute: 'description', type: 'String' },
      variant: { attribute: 'variant', type: 'String' },
      ariane: { attribute: 'ariane', type: 'Array' },
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
    titre: string;
    description: string;
    variant: 'standard' | 'alternatif';
    ariane: Segment[];
  };

  const {
    titre = 'Demain\u200bSpécialiste\u200bCyber',
    description,
    variant = 'standard',
    ariane = [],
  }: Props = $props();
  const fondSombre = $derived(variant === 'standard');
</script>

<div class={['heros', variant]}>
  <dsfr-container>
    <div class="conteneur" class:fonce={fondSombre}>
      <slot name="breadcrumb">
        <dsfr-breadcrumb segments={ariane} inverse={fondSombre}
        ></dsfr-breadcrumb>
      </slot>
      <hgroup>
        <h1 class="titre-alternatif-xs">
          {titre}
        </h1>
        {#if description}
          <p>
            {description}
          </p>
        {/if}
      </hgroup>
      <slot></slot>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  .heros {
    &.standard {
      background:
        linear-gradient(
          90deg,
          var(--bleu-profond-dsc) 69.49%,
          rgb(from var(--bleu-profond-dsc) r g b / 0) 100%
        ),
        url('/assets/images/cercles-fond-sombre.svg') right 20% no-repeat,
        var(--bleu-profond-dsc);
    }

    &.alternatif {
      background:
        url('/assets/images/cercles-fond-clair.svg') right 20% no-repeat,
        url('/assets/images/hero-fond.svg') repeat,
        var(--background-alt-blue-cumulus);
    }

    .conteneur {
      padding: 1rem 0 1.5rem;
    }

    .fonce {
      color: var(--text-inverted-grey);
    }
  }
</style>
