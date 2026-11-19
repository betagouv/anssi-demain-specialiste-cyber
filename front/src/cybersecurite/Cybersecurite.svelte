<svelte:options
  customElement={{
    tag: 'dsc-cybersecurite',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import SectionAttaquants from './SectionAttaquants.svelte';
  import SectionCetaitPourRire from './SectionCetaitPourRire.svelte';
  import SectionCryptographie from './SectionCryptographie.svelte';
  import SectionCyberattaques from './SectionCyberattaques.svelte';
  import SectionCyberespace from './SectionCyberespace.svelte';
  import SectionCybersecurite from './SectionCybersecurite.svelte';
  import SectionDonnees from './SectionDonnees.svelte';
  import SectionPrecautions from './SectionPrecautions.svelte';
  import SectionQuiz from './SectionQuiz.svelte';
</script>

<SectionCyberespace />
<SectionDonnees />
<SectionAttaquants />
<SectionCyberattaques />
<SectionCybersecurite />
<SectionCryptographie />
<SectionPrecautions />
<SectionCetaitPourRire />
<SectionQuiz />
