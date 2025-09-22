<script lang="ts">
  type Props = {
    recherche: string;
    miseEnAvant?: string;
  };
  let { recherche = $bindable(), miseEnAvant = 'Rechercher' }: Props = $props();
</script>

<dsfr-search
  inputId="recherche"
  class="recherche-textuelle"
  type="search"
  inputPlaceholder={miseEnAvant}
  value={recherche}
  onvaluechanged={(e: CustomEvent) => (recherche = e.detail)}
></dsfr-search>
