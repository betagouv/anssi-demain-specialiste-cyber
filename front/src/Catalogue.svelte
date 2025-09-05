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
</script>

<div class="catalogue">
  <div class="filtres">
    <RechercheTextuelle
      bind:recherche={$rechercheTextuelle}
      miseEnAvant="Rechercher une ressource"
    />
    <p>Filtres</p>
    <FiltreThematique />
    <FiltrePublicCible />
    <FiltreNiveau />
    <FiltreType />
    <FiltreBesoin />
  </div>

  <div class="conteneur">
    {#each $ressourcesCyberFiltrees.resultat as { id, titre, description } (id)}
      <div id={`${id}`}>
        <h3>{titre}</h3>
        <p>{description}</p>
      </div>
    {:else}
      {#if chargementEnCours}
        <p>Chargement...</p>
      {:else if ressourcesNonTrouvees}
        <p>Impossible de récupérer les ressources.</p>
      {:else}
        <p>Aucune ressource trouvée correspondant aux critères de recherche.</p>
      {/if}
    {/each}
  </div>
</div>

<style lang="scss">
  .catalogue {
    align-items: start;
    display: grid;
    gap: 1rem;
    grid-template-columns: 300px 1fr;
  }

  .conteneur {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
