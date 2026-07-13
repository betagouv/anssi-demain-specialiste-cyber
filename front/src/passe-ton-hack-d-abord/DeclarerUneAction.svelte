<script lang="ts">
  import EncartDeclarerUneAction from '../cyber-en-jeux/EncartDeclarerUneAction.svelte';
</script>

<div class="declarer-une-action">
  <dsfr-container>
    <EncartDeclarerUneAction />
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .declarer-une-action {
    padding: 3.5rem 0 4.5rem;
  }
</style>
