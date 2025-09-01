<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';
  import {
    lesRessourcesCyberTriees,
    lesThematiquesCyber,
  } from './ressourceCyber';

  let listeRessourcesCyber: {
    id: number;
    titre: string;
    thematiques: string[];
  }[] = [];
  let thematiques: string[] = [];

  onMount(async () => {
    const reponse = await fetch('/api/ressources-cyber');
    listeRessourcesCyber = lesRessourcesCyberTriees(await reponse.json());
    thematiques = lesThematiquesCyber(listeRessourcesCyber);
  });
</script>

<h3>Catalogue des ressources cyber</h3>

<div class="filtres">
  <p>Filtres</p>
  <label>
    <span>Thématique Cyber</span>
    <select>
      <option value="">Toutes les thématiques</option>
      {#each thematiques as thematique}
        <option value={thematique}>{thematique}</option>
      {/each}
    </select>
  </label>
</div>

<div class="conteneur">
  {#each listeRessourcesCyber as { id, titre } (id)}
    <div id={`${id}`}>{titre}</div>
  {:else}
    <p>Chargement...</p>
  {/each}
</div>

<style lang="scss">
  .conteneur {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
</style>
