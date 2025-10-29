<svelte:options
  customElement={{
    tag: 'dsc-fiche-metier',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import Fiche, { type Menu } from '../Fiche.svelte';
  import Heros from '../Heros.svelte';

  type Metier = {
    id: string;
    titre: string;
    fonction: string;
    image: { chemin: string };
    description: string;
    missionPrincipale: string;
    postures: string[];
    formationsCibles: string[];
    preRequis: string[];
    remuneration: {
      junior: number;
      senior: number;
    };
    metiersProches: string[];
    liens: {
      illustration: string;
      dataemploi: string;
      metierscope: string;
      video: string;
    };
  };

  let metier: Metier | undefined = $state(undefined);
  const lienSousTitres = $derived.by(() => {
    if (!metier || !metier.liens.video) {
      return '';
    }
    const positionDernierPoint = metier.liens.video.lastIndexOf('.');
    const lienSansExtension = metier.liens.video.slice(0, positionDernierPoint);
    return `${lienSansExtension}.vtt`;
  });

  onMount(async () => {
    const morceaux = window.location.pathname.split('/');
    const id = morceaux[morceaux.length - 1];
    const reponse = await axios.get<Metier>(`/api/metiers/${id}`);
    metier = reponse.data;
  });

  const menu: Menu = [
    {
      id: 'menu-description',
      label: 'Description du métier',
      href: '#description',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-formation',
      label: 'Formation',
      href: '#formation',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-remuneration',
      label: 'Rémunération',
      href: '#remuneration',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-temoignage',
      label: 'Témoignage',
      href: '#temoignage',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-metiers-proches',
      label: 'Métiers proches',
      href: '#metiers-proches',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-liens-utiles',
      label: 'Liens utiles',
      href: '#liens-utiles',
      isCollapsible: false,
      type: 'link',
    },
  ];

  const zeroWidthSpace = '\u200B';
  const titre = $derived.by(() =>
    metier ? metier.titre.trim().replace('/', `/${zeroWidthSpace}`) : '',
  );
  const formations = $derived.by(() =>
    metier ? metier.formationsCibles.join(', ') : '',
  );
</script>

{#if metier}
  <Heros
    variant="alternatif"
    ariane={[
      { id: 'accueil', label: 'Accueil', href: '/' },
      {
        id: 'catalogue',
        label: 'Catalogue de ressources',
        href: '/catalogue',
      },
      {
        id: `ressource-${metier.id}`,
        label: `${metier.titre}`,
        href: '#',
      },
    ]}
  >
    <dsfr-badge
      label="Métiers • Formation"
      type="accent"
      accent="purple-glycine"
      slot="avant-titre"
    ></dsfr-badge>
    <h1 class="titre-alternatif-xs" slot="titre">{titre}</h1>
    <p class="fr-text--lead" slot="description">{metier.fonction}</p>
    <picture class="illustration" slot="illustration">
      <img
        src={metier.liens.illustration ?? '/assets/images/image-generique.svg'}
        alt="Couverture du métier"
      />
    </picture>
  </Heros>

  <dsfr-container>
    <Fiche menuId="menu-fiche-metier" {menu}>
      <section id="description">
        <h2>Description du métier</h2>
        <p>{metier.description}</p>
        <blockquote>
          <h4>Sa mission principale</h4>
          <p>{metier.missionPrincipale}</p>
        </blockquote>
        <p><strong> Ce qu'on attend&nbsp;: </strong></p>
        <ul>
          {#each metier.postures as posture}
            <li>{posture}</li>
          {/each}
        </ul>
      </section>
      <section id="formation">
        <h2>Formation</h2>
        <ul>
          <li>
            {formations}
          </li>
          {#if metier.preRequis.length > 0}
            <li>{metier.preRequis.join(', ')}</li>
          {/if}
        </ul>
      </section>
      <section id="remuneration" class="remuneration">
        <h2>Rémunération</h2>
        <ul>
          <li>
            Salaire junior&nbsp;: {new Intl.NumberFormat('fr-FR').format(
              metier.remuneration.junior,
            )} euros
          </li>
          <li>
            Salaire senior&nbsp;: {new Intl.NumberFormat('fr-FR').format(
              metier.remuneration.senior,
            )} euros
          </li>
        </ul>
        <p class="fr-text--xs note">
          Les rémunérations présentées sont strictement indicatives et ne
          constituent en aucun cas une grille de rémunération préconisée
        </p>
      </section>
      <section id="metiers-proches">
        <h2>Métiers proches</h2>
        <ul>
          {#each metier.metiersProches as metierProche}
            <li>{metierProche}</li>
          {/each}
        </ul>
      </section>
      <section id="temoignage">
        <h2>Témoignage</h2>
        <dsfr-content type="video">
          <video slot="video" controls crossorigin="anonymous">
            <source src={metier.liens.video} type="video/mp4" />
            <track
              default
              kind="captions"
              srclang="fr"
              label="Français"
              src={lienSousTitres}
            />
          </video>
        </dsfr-content>
      </section>
      <section id="liens-utiles">
        <h2>Liens utiles</h2>
        <dsfr-link
          label="Fiche métierscope"
          href={metier.liens.metierscope}
          blank
          size="md"
        ></dsfr-link>
      </section>
      <dsfr-link
        label="Haut de page"
        href="#"
        size="md"
        has-icon
        icon="arrow-up-fill"
      ></dsfr-link>
    </Fiche>
  </dsfr-container>
{/if}

<style lang="scss">
  @use '../points-de-rupture' as *;

  h1.titre-alternatif-xs {
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;

    &:last-of-type {
      margin: 0 0 1.5rem;
    }
  }

  .illustration {
    display: flex;
    align-self: flex-end;
    justify-self: center;
    width: clamp(280px, 100%, 36.75rem);

    img {
      width: 100%;
    }
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
  }

  blockquote {
    border-left: 4px solid var(--pink-tuile-main-556);
    margin-left: 0;
    padding-left: 1.25rem;

    h4 {
      display: none;
    }

    @include a-partir-de(md) {
      margin-left: 2rem;
      padding-left: 2.25rem;

      h4 {
        display: block;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
      }
    }
  }

  .note {
    color: var(--text-mention-grey);
    margin-bottom: 0;
  }

  video {
    width: 100%;
    aspect-ratio: 16/9;

    @include a-partir-de(md) {
      align-self: flex-start;
      width: calc(50% - 1rem);
    }
  }

  .actions {
    margin-bottom: 3rem;
  }

  .remuneration {
    ul {
      margin-block-end: 1.5rem;
    }
  }
</style>
