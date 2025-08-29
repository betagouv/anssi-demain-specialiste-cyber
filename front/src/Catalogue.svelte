<svelte:options customElement={{ tag: 'dsc-catalogue', shadow: 'none' }} />

<script lang="ts">
  import { onMount } from 'svelte';

  let listeRessourcesCyber: { id: number; titre: string }[] = [];
  onMount(async () => {
    const reponse = await fetch('http://localhost:3000/api/ressources-cyber');
    listeRessourcesCyber = await reponse.json();
    listeRessourcesCyber = listeRessourcesCyber.sort((a, b) =>
      a.titre.localeCompare(b.titre)
    );
  });
</script>

<h3>Catalogue des ressources cyber</h3>

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
