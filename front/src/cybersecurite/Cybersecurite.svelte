<svelte:options
  customElement={{
    tag: 'dsc-cybersecurite',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import SectionCyberespace from './SectionCyberespace.svelte';
  import SectionDonnees from './SectionDonnees.svelte';
</script>

<SectionCyberespace />
<SectionDonnees />
