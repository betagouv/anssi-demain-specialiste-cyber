<svelte:options
  customElement={{
    tag: 'dsc-cybersecurite',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import SectionAttaquants from './SectionAttaquants.svelte';
  import SectionCryptographie from './SectionCryptographie.svelte';
  import SectionCyberattaques from './SectionCyberattaques.svelte';
  import SectionCyberespace from './SectionCyberespace.svelte';
  import SectionDonnees from './SectionDonnees.svelte';
</script>

<SectionCyberespace />
<SectionDonnees />
<SectionAttaquants />
<SectionCyberattaques />
<SectionCryptographie />
