<svelte:options
  customElement={{
    tag: 'dsc-passe-ton-hack-d-abord',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import Presentation from './Presentation.svelte';
  import Avantages from './Avantages.svelte';
  import Communaute from './Communaute.svelte';
  import CommentParticiper from './CommentParticiper.svelte';
</script>

<Presentation />
<Avantages />
<Communaute />
<CommentParticiper />
