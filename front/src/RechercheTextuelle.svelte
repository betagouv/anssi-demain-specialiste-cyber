<script lang="ts">
  type Props = {
    recherche: string;
    miseEnAvant?: string;
  };
  let { recherche = $bindable(), miseEnAvant = 'Rechercher' }: Props = $props();
</script>

<fieldset>
  <input type="text" bind:value={recherche} placeholder={miseEnAvant} />
</fieldset>

<style lang="scss">
  input {
    width: 100%;
  }
</style>
