<script lang="ts">
  import { onMount } from 'svelte';
  import { jeuxStore } from './stores/jeux.store';
  import VitrineFiltres from './VitrineFiltres.svelte';
  import { jeuxFiltres } from './stores/jeuxFiltres.store';
  import { construisLesJeux } from './jeu';
  import CarteJeu from './CarteJeu.svelte';

  let chargementEnCours = $state(false);
  let erreurChargement = $state(false);

  onMount(async () => {
    chargementEnCours = true;
    try {
      const reponse = await fetch('/api/jeux');
      const tousLesJeux = construisLesJeux(await reponse.json());
      jeuxStore.initialise(tousLesJeux);
    } catch (e) {
      erreurChargement = true;
      console.error(e);
    } finally {
      chargementEnCours = false;
    }
  });
</script>

<dsfr-container>
  <div class="vitrine-des-jeux">
    <hgroup>
      <h2>Explorez les jeux créés par les élèves</h2>
      <p class="fr-text--lg description">
        Mettez en avant la créativité de vos élèves en partageant leurs jeux
        depuis votre espace enseignant.
      </p>
    </hgroup>

    <div class="catalogue">
      <VitrineFiltres />

      <div class="conteneur">
        {#each $jeuxFiltres.resultat as jeu, index (index)}
          <CarteJeu {jeu} modifieVisibiliteJeu={async () => {}} />
        {:else}
          {#if chargementEnCours}
            <p class="fr-text">Chargement...</p>
          {:else if erreurChargement}
            <p class="fr-text">Impossible de récupérer les jeux.</p>
          {:else}
            <p class="fr-text">
              Aucun jeu trouvé correspondant aux critères de recherche.
            </p>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</dsfr-container>

<style lang="scss">
  @use '../style/points-de-rupture' as *;

  .vitrine-des-jeux {
    margin: 3.5rem 0;

    hgroup {
      margin-bottom: 2rem;

      h2 {
        margin: 0 0 0.5rem;
      }

      p {
        margin: 0;
      }
    }
  }

  .catalogue {
    align-items: start;
    display: grid;
    gap: 1rem;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    margin-bottom: 4.5rem;

    .conteneur {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr;

      p {
        grid-column: 1 / span 3;
      }
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
      margin-top: 2rem;

      .conteneur {
        grid-template-columns: repeat(3, minmax(200px, 1fr));
      }
    }
  }

  @include a-partir-de(lg) {
    .catalogue {
      grid-template-columns: repeat(4, minmax(200px, 1fr));

      .conteneur {
        grid-column: 2 / span 3;
        grid-row: 1;
      }
    }
  }
</style>
