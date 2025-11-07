<script lang="ts">
  import type { Snippet } from 'svelte';

  type Lien = {
    lien: string;
    libelle: string;
    detail?: string;
    telechargement?: boolean;
  };

  type Props = {
    titre: string;
    children: Snippet;
    liens: Lien[];
    illustration: { lien: string; alt?: string };
  };

  const { titre, liens, illustration, children }: Props = $props();
</script>

<section class="mise-en-avant sombre">
  <h2>{titre}</h2>
  {@render children?.()}
  <ul>
    {#each liens as { lien, libelle, detail, telechargement }}
      <li>
        <lab-anssi-lien
          titre={libelle}
          href={lien}
          apparence="lien-texte"
          taille="sm"
          positionIcone="droite"
          icone={telechargement ? 'download-line' : undefined}
        ></lab-anssi-lien>
        {#if detail}
          <div class="fr-text--xs detail">{detail}</div>
        {/if}
      </li>
    {/each}
  </ul>
  <img src={illustration.lien} alt={illustration.alt} />
</section>

<style lang="scss">
  @use './style/points-de-rupture' as *;

  .mise-en-avant {
    display: grid;
    color: #ffffff;

    background:
      url('/assets/images/cercles.avif') no-repeat,
      var(--bleu-profond-dsc);
    background-size: auto 100%;
    background-position: 25% bottom;

    @media (min-aspect-ratio: 1/1) {
      background-size: auto auto;
      background-position: right center;
    }

    padding: 3rem 1rem;

    h2 {
      margin: 0 0 1rem;
    }

    :global p {
      margin: 0;
    }

    ul {
      list-style-type: disc;
      padding-left: 1rem;
      margin: 1.5rem 0 2rem;

      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      li {
        .detail {
          margin-top: 0.25rem;
        }
      }
    }

    img {
      max-width: min(240px, 100%);
      justify-self: center;
    }

    @include a-partir-de(lg) {
      padding: 3rem;

      grid-template-rows: repeat(3, auto);
      grid-template-columns: 3fr 2fr;
      gap: 0 1.5rem;

      h2 {
        grid-column: 1;
      }

      :global p {
        grid-column: 1;
      }

      ul {
        grid-column: 1;
      }

      img {
        grid-column: 2;
        grid-row: 1 / span 3;
      }
    }
  }
</style>
