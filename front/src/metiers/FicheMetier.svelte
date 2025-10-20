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
  <div class="hero">
    <dsfr-container>
      <div class="entete-fiche-jeu">
        <dsfr-breadcrumb
          segments={[
            { id: 'accueil', label: 'Accueil', href: '/' },
            { id: 'catalogue', label: 'Catalogue de ressources', href: '/' },
            {
              id: `ressource-${metier.id}`,
              label: `${metier.titre}`,
              href: '#',
            },
          ]}
        ></dsfr-breadcrumb>
        <div class="cartouche">
          <h1 class="titre-alternatif-xs">{titre}</h1>
          <p class="texte-xl">{metier.fonction}</p>
          <dsfr-button
            markup="a"
            href={metier.liens.dataemploi}
            label="Lien de redirection"
            target="_blank"
          >
          </dsfr-button>
        </div>
        <div class="illustration">
          <img
            src={metier.liens.illustration ??
              '/assets/images/image-generique.svg'}
            alt="Couverture du métier"
          />
        </div>
      </div>
    </dsfr-container>
  </div>

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
    <section id="remuneration">
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
      <p class="note">
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
      <p>{metier.liens.video}</p>
    </section>
    <section id="liens-utiles">
      <h2>Liens utiles</h2>
      <dsfr-button
        markup="a"
        label="Fiche métierscope"
        href={metier.liens.metierscope}
        target="_blank"
        size="sm"
        kind="tertiary-no-outline"
      ></dsfr-button>
    </section>
  </Fiche>
{/if}

<style lang="scss">
  @use '../points-de-rupture' as *;

  .hero {
    background:
      url('/assets/images/cercles-fond-clair.svg') 50% bottom / auto 100%
        no-repeat,
      url('/assets/images/hero-fond.svg') repeat,
      var(--background-alt-blue-cumulus);
    box-shadow: inset 0 4px 4px 0 rgba(0, 0, 18, 0.06);
    color: var(--text-default-grey);
    padding: 0;

    .texte-xl {
      font-size: 1.25rem;
      line-height: 2rem;
      &::first-letter {
        text-transform: capitalize;
      }
    }

    .cartouche {
      grid-area: cartouche;
      margin-bottom: 3rem;
    }

    .illustration {
      grid-area: illustration;
      background: white;
      padding: 0.25rem 0.25rem 0;
      width: clamp(18rem, 100%, 36.75rem);
      justify-self: center;
      display: flex;

      img {
        width: 100%;
      }
    }

    @include a-partir-de(md) {
      background-position-x: left;
    }

    @include a-partir-de(lg) {
      background-position-x: right;

      .entete-fiche-jeu {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: 'ariane ariane' 'cartouche illustration';

        dsfr-breadcrumb {
          grid-area: ariane;
        }

        .illustration {
          align-self: stretch;
          justify-self: stretch;
          margin-top: 0;
        }
      }
    }
  }

  p {
    margin: 1.5rem 0;
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
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-bottom: 0;
  }
</style>
