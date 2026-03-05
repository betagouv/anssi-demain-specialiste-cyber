<svelte:options
  customElement={{
    tag: 'dsc-cyber-en-jeux',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import PresentationCyberEnjeux from './PresentationCyberEnjeux.svelte';
  import Onglets from './Onglets.svelte';
  import Ressources from './Ressources.svelte';
  import VitrineDesJeux from './VitrineDesJeux.svelte';

  const onglets = [
    {
      emoji: '👩‍🏫',
      label: 'Présentation de CyberEnJeux',
      fragment: '#presentation',
    },
    {
      emoji: '🎲',
      label: 'Vitrine des jeux des élèves',
      fragment: '#vitrine-des-jeux',
    },
    {
      emoji: '📚',
      label: 'Guides et ressources',
      fragment: '#guides-et-ressources',
    },
  ];
  let ongletActif = $state(0);
</script>

<dsfr-container>
  <Onglets {onglets} bind:ongletActif titreReplie="Naviguer dans CyberEnJeux" />
</dsfr-container>

{#if ongletActif === 0}
  <PresentationCyberEnjeux></PresentationCyberEnjeux>
{:else if ongletActif === 1}
  <VitrineDesJeux></VitrineDesJeux>
{:else if ongletActif === 2}
  <Ressources></Ressources>
{/if}
