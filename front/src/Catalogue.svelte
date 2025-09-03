<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import FiltreNiveau from './FiltreNiveau.svelte';
  import FiltreSelection from './FiltreSelection.svelte';
  import FiltreThematique from './FiltreThematique.svelte';
  import FiltreType from './FiltreType.svelte';
  import { lesRessourcesCyberTriees } from './ressourceCyber';
  import { rechercheParBesoin } from './stores/rechercheParBesoin.store';
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
    <p>Filtres</p>
    <FiltreThematique />
    <FiltreSelection />
    <FiltreNiveau />
    <FiltreType />

    <fieldset>
      <legend>Besoin</legend>
      <ul>
        <li>
          <label>
            <input bind:group={$rechercheParBesoin} type="radio" value="" />
            <span>Tous les besoins</span>
          </label>
        </li>
        {#each $ressourcesCyberFiltrees.besoins as besoin}
          <li>
            <label>
              <input
                bind:group={$rechercheParBesoin}
                type="radio"
                value={besoin}
              />
              <span>{besoin}</span>
            </label>
          </li>
        {/each}
      </ul>
    </fieldset>
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
