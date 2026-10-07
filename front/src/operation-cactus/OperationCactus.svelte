<svelte:options
  customElement={{
    tag: 'dsc-operation-cactus',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import Avantages from './Avantages.svelte';
  import DeclarerUneAction from './DeclarerUneAction.svelte';
  import PoursuivezEnClasse from './PoursuivezEnClasse.svelte';
  import Presentation from './Presentation.svelte';
  import Temoignages from './Temoignages.svelte';
</script>

<Presentation />
<Avantages />
<PoursuivezEnClasse />
<Temoignages />
<DeclarerUneAction />
