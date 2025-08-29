<svelte:options customElement="dsc-catalogue" />

<script lang="ts">
  import { onMount } from 'svelte';

  let listeRessourcesCyber: { id: number; titre: string }[] = [];
  onMount(async () => {
    const reponse = await fetch('http://localhost:3000/api/ressources-cyber');
    listeRessourcesCyber = await reponse.json();
  });
</script>

Catalogue des ressources cyber SVELTE

{#each listeRessourcesCyber as { id, titre } (id)}
  <span id={`${id}`}>{titre}</span>
{/each}
