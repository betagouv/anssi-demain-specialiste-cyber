<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import FiltreBesoin from './FiltreBesoin.svelte';
  import FiltreNiveau from './FiltreNiveau.svelte';
  import FiltrePublicCible from './FiltrePublicCible.svelte';
  import FiltreThematique from './FiltreThematique.svelte';
  import FiltreType from './FiltreType.svelte';
  import RechercheTextuelle from './RechercheTextuelle.svelte';
  import { lesRessourcesCyberTriees } from './ressourceCyber';
  import { rechercheTextuelle } from './stores/rechercheTextuelle.store';
  import { ressourcesCyberStore } from './stores/ressourcesCyber.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';

  let chargementEnCours = $state(false);
  let ressourcesNonTrouvees = $state(false);

  onMount(async () => {
    chargementEnCours = true;
    try {
      const reponse = await fetch('/api/ressources-cyber');
      const ressourcesCyber = lesRessourcesCyberTriees(await reponse.json());
      ressourcesCyberStore.initialise(ressourcesCyber);
    } catch (e) {
      ressourcesNonTrouvees = true;
      console.error(e);
    } finally {
      chargementEnCours = false;
    }
  });

  const afficheLesFiltres = () => {
    const menu = document.querySelector('.menu') as HTMLElement;
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  };

  const reinitialiseLesFiltres = () => {
    // ressourcesCyberFiltrees.reinitialise();
    rechercheTextuelle.set('');
  };
</script>

<dsfr-container>
  <div class="catalogue">
    <div class="filtres">
      <RechercheTextuelle
        bind:recherche={$rechercheTextuelle}
        miseEnAvant="Rechercher une ressource"
      />
      <dsfr-button
        class="bascule-filtres"
        label="Voir les filtres"
        kind="secondary"
        onclick={afficheLesFiltres}
        onkeydown={afficheLesFiltres}
        role="button"
        tabindex={0}
      >
      </dsfr-button>
      <div class="menu">
        <p>Filtres</p>
        <dsfr-button
          class="reinitialise-filtres"
          label="Réinitialiser les filtres"
          kind="secondary"
          onclick={reinitialiseLesFiltres}
          onkeydown={reinitialiseLesFiltres}
          role="button"
          tabindex={0}
        ></dsfr-button>
        <FiltreThematique />
        <FiltrePublicCible />
        <FiltreNiveau />
        <FiltreType />
        <FiltreBesoin />
      </div>
    </div>

    <div class="conteneur">
      {#each $ressourcesCyberFiltrees.resultat as { id, titre, description } (id)}
        <dsfr-card
          title={description}
          hasDetailStart
          detailStart={titre}
          href={`/ressources-cyber/${id}`}
          src="/assets/images/image-generique.svg"
          hasHeaderBadge
        >
          <dsfr-badges-group
            slot="headerbadges"
            badges={[{ label: 'Libellé', accent: 'purple-glycine' }]}
            size="sm"
          ></dsfr-badges-group>
        </dsfr-card>
      {:else}
        {#if chargementEnCours}
          <p>Chargement...</p>
        {:else if ressourcesNonTrouvees}
          <p>Impossible de récupérer les ressources.</p>
        {:else}
          <p>
            Aucune ressource trouvée correspondant aux critères de recherche.
          </p>
        {/if}
      {/each}
    </div>
  </div>
</dsfr-container>

<style lang="scss">
  @use './points-de-rupture' as *;

  .catalogue {
    align-items: start;
    display: grid;
    gap: 1rem;

    :global dsfr-input {
      display: block;
      margin: 3rem auto;
      width: clamp(320px, 100%, 516px);
    }

    .filtres {
      grid-column: 1 / -1;

      .menu {
        display: none;

        .reinitialise-filtres {
          display: block;
          width: 100%;
        }
      }
    }

    @include a-partir-de(lg) {
      grid-template-columns: repeat(4, minmax(220px, 1fr));

      :global dsfr-input {
        margin: 0;
        width: clamp(100px, 100%, 320px);
      }

      .filtres {
        grid-column: 1;
        grid-row: 1;

        .bascule-filtres {
          display: none;
        }

        .menu {
          display: block;
        }
      }
    }

    .conteneur {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr;

      @include a-partir-de(sm) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include a-partir-de(md) {
        grid-template-columns: repeat(3, minmax(220px, 1fr));
      }

      @include a-partir-de(lg) {
        grid-column: 2 / span 3;
      }
    }
  }
</style>
