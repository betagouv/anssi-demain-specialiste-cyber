<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { lesRessourcesCyberTriees } from './ressourceCyber';
  import { ressourcesCyberStore } from './stores/ressourcesCyber.store';
  import { ressourcesCyberFiltrees } from './stores/ressourcesCyberFiltrees.store';
  import CatalogueFiltres from './CatalogueFiltres.svelte';

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
</script>

<dsfr-container>
  <div class="catalogue">
    <CatalogueFiltres />

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
  @use '../points-de-rupture' as *;

  .catalogue {
    display: grid;
    gap: 1rem;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    margin-bottom: 4.5rem;

    .conteneur {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr;
    }
  }

  @include a-partir-de(sm) {
    .catalogue {
      .conteneur {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @include a-partir-de(md) {
    .catalogue {
      margin-top: 5.5rem;

      .conteneur {
        grid-template-columns: repeat(3, minmax(200px, 1fr));
      }
    }
  }

  @include a-partir-de(lg) {
    .catalogue {
      grid-template-columns: repeat(4, minmax(200px, 1fr));
      margin-top: calc(9.5rem - 6px);

      .conteneur {
        grid-column: 2 / span 3;
        grid-row: 1;
      }
    }
  }

  @media (min-width: 1210px) {
    .catalogue {
      margin-top: 7.5rem;
    }
  }
</style>
