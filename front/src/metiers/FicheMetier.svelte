<svelte:options
  customElement={{
    tag: 'dsc-fiche-metier',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { laCouleurDuBadgeSelonTypeRessourceCyber } from '../catalogue/ressourceCyber';
  import Fiche, { type Menu } from '../composants/Fiche.svelte';
  import Heros from '../composants/Heros.svelte';

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
      videos: string[];
    };
  };

  const recupereLesSousTitres = (lienVideo: string) => {
    if (!lienVideo) {
      return { video: lienVideo, sousTitre: '' };
    }

    const positionDernierPoint = lienVideo.lastIndexOf('.');
    const lienSansExtension = lienVideo.slice(0, positionDernierPoint);
    return { video: lienVideo, sousTitre: `${lienSansExtension}.vtt` };
  };

  let metier: Metier | undefined = $state(undefined);
  const videosSousTitrees = $derived.by(
    () => metier?.liens.videos.map(recupereLesSousTitres) ?? [],
  );

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
      accent={laCouleurDuBadgeSelonTypeRessourceCyber()}
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
        <dsfr-highlight text={metier.missionPrincipale} accent="pink-tuile">
          <h4 slot="title" class="titre-highlight">Sa mission principale</h4>
        </dsfr-highlight>
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
        <h2>Rémunération brute</h2>
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
        <h2>Témoignage{videosSousTitrees.length > 1 ? 's' : ''}</h2>
        <div class="videos">
          {#each videosSousTitrees as { video, sousTitre }, index (index)}
            <dsfr-content type="video">
              <video slot="video" controls crossorigin="anonymous">
                <source src={video} type="video/mp4" />
                <track
                  default
                  kind="captions"
                  srclang="fr"
                  label="Français"
                  src={sousTitre}
                />
              </video>
            </dsfr-content>
          {/each}
        </div>
      </section>
      <section id="liens-utiles">
        <h2>Liens utiles</h2>
        <dsfr-link
          label="Fiche métierscope"
          href={metier.liens.metierscope}
          blank
          size="md"
        ></dsfr-link>
        <dsfr-link
          label="Panorama des métiers de la cybersécurité"
          href="https://cyber.gouv.fr/sites/default/files/2021/10/anssi-panorama_metiers_cybersecurite-2020.pdf"
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
  @use '@style/points-de-rupture' as *;

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

  dsfr-highlight {
    margin-top: 1.5rem;
  }

  .titre-highlight {
    display: none;

    @include a-partir-de(md) {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  .note {
    color: var(--text-mention-grey);
    margin-bottom: 0;
  }

  .videos {
    display: grid;
    gap: 0 1rem;
    grid-template-columns: 1fr;

    @include a-partir-de(md) {
      grid-template-columns: 1fr 1fr;
    }

    @include a-partir-de(lg) {
      gap: 0 1.5rem;
    }

    video {
      width: 100%;
      aspect-ratio: 16/9;
    }
  }

  .remuneration {
    ul {
      margin-block-end: 1.5rem;
    }
  }

  #liens-utiles {
    dsfr-link {
      display: block;
    }
  }
</style>
