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

  onMount(async () => {
    const reponse = await fetch('/api/ressources-cyber');
    const ressourcesCyber = lesRessourcesCyberTriees(await reponse.json());
    ressourcesCyberStore.initialise(ressourcesCyber);
  });
</script>

<h3>Catalogue des ressources cyber</h3>

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
    {#each $ressourcesCyberFiltrees.resultat as { id, titre } (id)}
      <div id={`${id}`}>{titre}</div>
    {:else}
      <p>Chargement...</p>
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
