<script lang="ts">
  type Props = {
    recherche: string;
    miseEnAvant?: string;
  };
  let { recherche = $bindable(), miseEnAvant = 'Rechercher' }: Props = $props();
</script>

<fieldset>
  <dsfr-input
    type="search"
    placeholder={miseEnAvant}
    value={recherche}
    onvaluechanged={(e: CustomEvent) => (recherche = e.detail)}
  ></dsfr-input>
</fieldset>

<style lang="scss">
  input {
    width: 100%;
  }
</style>
