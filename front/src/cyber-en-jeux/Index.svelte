<svelte:options
  customElement={{
    tag: 'dsc-cyber-en-jeux',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import Accueil from './Accueil.svelte';
  import Onglets from './Onglets.svelte';
  import Ressources from './Ressources.svelte';
  import VitrineDesJeux from './VitrineDesJeux.svelte';

  const onglets = [
    { label: '👩‍🏫 Présentation de CyberEnJeux', fragment: '#presentation' },
    { label: '🎲 Vitrine des jeux des élèves', fragment: '#vitrine-des-jeux' },
    { label: '📚 Guides et ressources', fragment: '#guides-et-ressources' },
  ];
  let ongletActif = $state(0);
</script>

<dsfr-container>
  <Onglets {onglets} bind:ongletActif></Onglets>
</dsfr-container>

{#if ongletActif === 0}
  <Accueil></Accueil>
{:else if ongletActif === 1}
  <VitrineDesJeux></VitrineDesJeux>
{:else if ongletActif === 2}
  <Ressources></Ressources>
{/if}
