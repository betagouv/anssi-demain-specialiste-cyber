<svelte:options
  customElement={{
    tag: 'dsc-operation-cactus',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import Presentation from './Presentation.svelte';
  import Avantages from './Avantages.svelte';
  import PoursuivezEnClasse from './PoursuivezEnClasse.svelte';
  import Temoignages from './Temoignages.svelte';
  import DeclarerUneAction from './DeclarerUneAction.svelte';
</script>

<Presentation />
<Avantages />
<PoursuivezEnClasse />
<Temoignages />
<DeclarerUneAction />
