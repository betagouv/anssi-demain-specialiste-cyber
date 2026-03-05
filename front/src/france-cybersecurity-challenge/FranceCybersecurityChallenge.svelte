<svelte:options
  customElement={{
    tag: 'dsc-france-cybersecurity-challenge',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import Onglets from '../cyber-en-jeux/Onglets.svelte';
  import ResumeFranceCybersecurityChallenge from './ResumeFranceCybersecurityChallenge.svelte';
  import ToutSavoirSurFranceCybersecurityChallenge from './ToutSavoirSurFranceCybersecurityChallenge.svelte';
  import FranceCybersecurityChallenge2026 from './FranceCybersecurityChallenge2026.svelte';

  const liens = [
    { label: 'En résumé', fragment: '#resume', emoji: '📝' },
    {
      label: 'Tout savoir sur le FCSC et l’ECSC',
      fragment: '#tout-savoir',
      emoji: '✅',
    },
    {
      label: 'Le FCSC 2026',
      fragment: '#fcsc-2026',
      emoji: '🛡️',
    },
  ];
  let ongletActif = $state(0);
</script>

<dsfr-container>
  <Onglets onglets={liens} bind:ongletActif titreReplie="Dans cette rubrique" />
</dsfr-container>

{#if ongletActif === 0}
  <ResumeFranceCybersecurityChallenge />
{:else if ongletActif === 1}
  <ToutSavoirSurFranceCybersecurityChallenge />
{:else if ongletActif === 2}
  <FranceCybersecurityChallenge2026 />
{/if}
