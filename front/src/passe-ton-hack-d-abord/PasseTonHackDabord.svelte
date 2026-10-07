<svelte:options
  customElement={{
    tag: 'dsc-passe-ton-hack-d-abord',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import Avantages from './Avantages.svelte';
  import CommentParticiper from './CommentParticiper.svelte';
  import Communaute from './Communaute.svelte';
  import DeclarerUneAction from './DeclarerUneAction.svelte';
  import PlusDeCtf from './PlusDeCtf.svelte';
  import Presentation from './Presentation.svelte';
  import Temoignages from './Temoignages.svelte';
</script>

<Presentation />
<Avantages />
<Communaute />
<CommentParticiper />
<Temoignages />
<DeclarerUneAction />
<PlusDeCtf />
