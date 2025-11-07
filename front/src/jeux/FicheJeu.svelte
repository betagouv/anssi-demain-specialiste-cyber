<svelte:options customElement={{ tag: 'dsc-fiche-jeu', shadow: 'none' }} />

<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import BadgesThematiques from '../cyber-en-jeux/BadgesThematiques.svelte';
  import Fiche, { type Menu } from '../Fiche.svelte';
  import Heros from '../Heros.svelte';
  import { libelleClasse } from './classes';
  import { libelleDiscipline } from './disciplines';
  import { enumerationFrancaise, type Jeu } from './jeu';
  import Reactions from './Reactions.svelte';
  import { libelleSequence } from './sequences';

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
  <Heros
    variant="alternatif"
    ariane={[
      { id: 'accueil', label: 'Accueil', href: '/' },
      { id: 'cyber-en-jeux', label: 'CyberEnJeux', href: '/cyber-en-jeux' },
      { id: jeu.id, label: jeu.nom, href: '#' },
    ]}
  >
    <div class="badges" slot="avant-titre">
      <BadgesThematiques thematiques={jeu.thematiques} taille="md" />
    </div>
    <h1 class="titre-alternatif-xs" slot="titre">
      {jeu.nom}
    </h1>
    <svelte:fragment slot="description">
      <p class="fr-text--lead elaboration">
        Élaboré par {enumerationFrancaise(jeu.eleves)}
      </p>
      <p class="fr-text--lead etablissement">
        <lab-anssi-icone taille="sm" nom="map-pin-2-line"></lab-anssi-icone>
        {jeu.nomEtablissement}
      </p>
    </svelte:fragment>
    <div class="actions">
      <Reactions reactionsDuJeu={jeu.reactions} idJeu={jeu.id}></Reactions>
    </div>
    <picture class="illustration" slot="illustration">
      <img src={jeu.photos.couverture.chemin} alt="Couverture du jeu" />
    </picture>
  </Heros>

  <dsfr-container>
    <Fiche menuId="menu-fiche-jeu" menu={items}>
      {#if jeu.estProprietaire}
        <div class="actions-entete">
          <dsfr-button
            label="Modifier"
            hasIcon
            icon="edit-line"
            markup="a"
            href={`/modification-jeu/${jeu.id}`}
            kind="tertiary"
          ></dsfr-button>
        </div>
      {/if}
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
        <p class="fr-text">{jeu.description}</p>
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
  </dsfr-container>
{/if}

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .badges {
    display: none;
  }

  h1.titre-alternatif-xs {
    margin-bottom: 0.75rem;
  }

  p {
    margin: 0;

    &:last-of-type {
      margin: 0 0 1.5rem;
    }
  }

  .actions-entete {
    display: flex;
    justify-content: flex-end;
  }

  .actions {
    margin-bottom: 3rem;
  }

  .illustration {
    background: white;
    display: flex;
    align-self: flex-end;
    justify-self: center;
    padding: 0.25rem 0.25rem 0;
    width: clamp(280px, 100%, 36.75rem);

    img {
      width: 100%;
    }
  }

  @include a-partir-de(md) {
    .badges {
      display: block;
    }
  }

  @include a-partir-de(lg) {
    h1.titre-alternatif-xs {
      margin: 0.25rem 0 0.5rem;
    }

    .illustration {
      margin-top: 0;
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
