<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import {lesRessourcesCyberTriees, type RessourceCyber} from './ressourceCyber';
  import { rechercheParThematique } from './stores/rechercheParThematique.store';
  import { ressourcesCyberStore } from './stores/ressourcesCyber.store';
  import { ressourcesCyberFiltre } from './stores/ressourcesCyberFiltre.store';

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
    <label>
      <span>Thématique Cyber</span>
      <select bind:value={$rechercheParThematique}>
        <option value="">Toutes les thématiques</option>
        {#each $ressourcesCyberFiltre.thematiques as thematique}
          <option value={thematique}>{thematique}</option>
        {/each}
      </select>
    </label>
  </div>

  <div class="conteneur">
    {#each $ressourcesCyberFiltre.resultat as { id, titre } (id)}
      <div id={`${id}`}>{titre}</div>
    {:else}
      <p>Chargement...</p>
    {/each}
  </div>
</div>

<style lang="scss">
  .catalogue {
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
