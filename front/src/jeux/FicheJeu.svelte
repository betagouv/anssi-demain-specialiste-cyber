<svelte:options customElement={{ tag: 'dsc-fiche-jeu', shadow: 'none' }} />

<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { libelleClasse } from './classes';
  import { libelleDiscipline } from './disciplines';
  import { enumerationFrancaise, type Jeu } from './jeu';
  import { libelleSequence } from './sequences';
  import BadgesThematiques from '../cyber-en-jeux/BadgesThematiques.svelte';
  import Fiche, { type Menu } from '../Fiche.svelte';

  let jeu: Jeu | undefined;

  onMount(async () => {
    const morceaux = window.location.pathname.split('/');
    const id = morceaux[morceaux.length - 1];
    const reponse = await axios.get<Jeu>(`/api/jeux/${id}`);
    jeu = reponse.data;
  });

  $: temoignages = jeu
    ? jeu.temoignages.map((temoignage) => ({
        citation: temoignage.details,
        auteur: temoignage.prenom,
      }))
    : [];

  $: possedeDesPhotos = jeu ? jeu.photos.photos.length > 0 : false;
  $: possedeDesTemoignages = !!jeu?.temoignages.length;

  $: items = [
    {
      id: 'menu-infos-generales',
      label: 'Informations générales',
      href: '#infos-generales',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-presentation',
      label: 'Présentation du jeu',
      href: '#presentation',
      isCollapsible: false,
      type: 'link',
    },
    ...(possedeDesPhotos
      ? [
          {
            id: 'menu-photos',
            label: 'Photos',
            href: '#photos',
            isCollapsible: false,
            type: 'link',
          },
        ]
      : []),
    ...(possedeDesTemoignages
      ? [
          {
            id: 'menu-temoignages',
            label: 'Témoignages',
            href: '#temoignages',
            isCollapsible: false,
            type: 'link',
          },
        ]
      : []),
  ] as Menu;
</script>

{#if jeu}
  <div class="hero">
    <dsfr-container>
      <div class="entete-fiche-jeu">
        <nav class="ariane" aria-label="Fil d'Ariane">
          <a href="#">Voir le fil d'Ariane</a>
        </nav>
        <div class="cartouche">
          <BadgesThematiques thematiques={jeu.thematiques} taille="md" />
          <p class="titre-alternatif-xs">{jeu.nom}</p>
          <p class="elaboration">
            Élaboré par {enumerationFrancaise(jeu.eleves)}
          </p>

          <p class="etablissement">
            <lab-anssi-icone taille="sm" nom="map-pin-2-line"></lab-anssi-icone>
            {jeu.nomEtablissement}
          </p>
        </div>
        <div class="illustration-jeu">
          <img src={jeu.photos.couverture.chemin} alt="Couverture du jeu" />
        </div>
      </div>
    </dsfr-container>
  </div>

  <Fiche menuId="menu-fiche-jeu" menu={items}>
    <section id="infos-generales">
      <h2>Informations générales</h2>
      <ul>
        <li>
          <span>Format</span>
          <span>{libelleSequence(jeu.sequence)}</span>
        </li>
        <li>
          <span>Établissement</span>
          <span>{jeu.nomEtablissement}</span>
        </li>
        <li>
          <span>Enseignant&middot;e</span>
          <span>{jeu.enseignant}</span>
        </li>
        <li>
          <span>Élèves</span>
          <span>{enumerationFrancaise(jeu.eleves)}</span>
        </li>
        <li>
          <span>Discipline</span>
          <span>{libelleDiscipline(jeu.discipline)}</span>
        </li>
        <li>
          <span>Classe</span>
          <span>{libelleClasse(jeu.classe)}</span>
        </li>
      </ul>
    </section>

    <section id="presentation">
      <h2>Présentation du jeu</h2>
      <p>{jeu.description}</p>
    </section>

    {#if possedeDesPhotos}
      <section id="photos">
        <h2>Photos</h2>
        <div class="photos">
          {#each jeu.photos.photos as photo}
            <img src={photo.chemin} alt="Illustration du jeu" />
          {/each}
        </div>
      </section>
    {/if}

    {#snippet apresContenu()}
      {#if possedeDesTemoignages}
        <lab-anssi-temoignages
          titre="Témoignages"
          {temoignages}
          id="temoignages"
        ></lab-anssi-temoignages>
      {/if}
    {/snippet}
  </Fiche>
{/if}

<style lang="scss">
  @use '../points-de-rupture' as *;

  .hero {
    padding: 1rem 1rem 0;
    background: var(--blue-france-975-sun-113)
      url('/assets/images/hero-fiche-jeu.svg') no-repeat top right -300px;
    background-size: auto 100%;

    @include a-partir-de(md) {
      background-position-x: right -170px;
    }
    @include a-partir-de(lg) {
      background-position-x: right;
    }

    .entete-fiche-jeu {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: 1fr;
      grid-template-areas:
        'fil-ariane'
        'cartouche'
        'illustration';

      @include a-partir-de(lg) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          'fil-ariane fil-ariane'
          'cartouche illustration';
      }

      .ariane {
        grid-area: fil-ariane;
      }

      .cartouche {
        grid-area: cartouche;
        padding-bottom: 1.5rem;

        dsfr-badges-group {
          display: none;

          @include a-partir-de(md) {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 0.625rem;
            align-self: stretch;
          }

          dsfr-badge {
            margin: 0;
          }
        }
        .titre-alternatif-xs {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--grey-50-1000);

          @include a-partir-de(md) {
            margin-top: 0.25rem;
          }
        }

        dsfr-badge {
          display: none;
          margin-top: 1.5rem;
          @include a-partir-de(md) {
            display: block;
          }
        }

        .elaboration,
        .etablissement {
          font-size: 1.25rem;
          line-height: 2rem;
          margin-top: 0;
        }
      }
    }

    .illustration-jeu {
      grid-area: illustration;
      background: white;
      padding: 0.25rem 0.25rem 0;
      max-width: 36.75rem;
      justify-self: center;
      display: flex;

      img {
        width: 100%;
      }
    }
  }

  section {
    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      li {
        span:nth-child(1) {
          &::after {
            content: '\00a0:\00a0';
          }
        }
        span:nth-child(2) {
          font-weight: bold;
        }
      }
    }

    .photos {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr;

      @include a-partir-de(md) {
        grid-template-columns: 1fr 1fr;
      }

      img {
        aspect-ratio: 4/3;
        width: 100%;
        background-color: var(--blue-france-975-sun-113);
      }
    }
  }

  lab-anssi-temoignages {
    display: block;
    margin-top: -44px;

    @include a-partir-de(md) {
      margin-left: -1.5rem;
    }
  }
</style>
