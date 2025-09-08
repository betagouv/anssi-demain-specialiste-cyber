<svelte:options
  customElement={{
    tag: 'dsc-creation-compte',
    shadow: 'none',
    props: {
      nom: { type: 'String' },
    },
  }}
/>

<script lang="ts">
  const { nom } = $props();
</script>
