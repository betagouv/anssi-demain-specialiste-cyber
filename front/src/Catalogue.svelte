<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import FiltreSelection from './FiltreSelection.svelte';
  import FiltreThematique from './FiltreThematique.svelte';
  import { lesRessourcesCyberTriees } from './ressourceCyber';
  import { rechercheParBesoin } from './stores/rechercheParBesoin.store';
  import { rechercheParNiveau } from './stores/rechercheParNiveau.store';
  import { rechercheParType } from './stores/rechercheParType.store';
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

    <fieldset>
      <legend>Niveau</legend>
      <ul>
        {#each $ressourcesCyberFiltrees.niveaux as niveau}
          <li>
            <label>
              <input
                bind:group={$rechercheParNiveau}
                type="checkbox"
                value={niveau}
              />
              <span>{niveau}</span>
            </label>
          </li>
        {/each}
      </ul>
    </fieldset>

    <fieldset>
      <legend>Type</legend>
      <ul>
        {#each $ressourcesCyberFiltrees.types as type}
          <li>
            <label>
              <input
                bind:group={$rechercheParType}
                type="checkbox"
                value={type}
              />
              <span>{type}</span>
            </label>
          </li>
        {/each}
      </ul>
    </fieldset>

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
