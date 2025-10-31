<svelte:options
  customElement={{ tag: 'dsc-zone-identification', shadow: 'none' }}
/>

<script lang="ts">
  import { profil } from './stores/profil';
</script>

{#if $profil}
  <a class="deconnexion" href="/oidc/deconnexion">Se déconnecter</a>
{:else}
  <dsfr-button
    class="connexion"
    href="/connexion"
    label="Mon espace enseignant"
    hasIcon
    icon="account-circle-fill"
    kind="tertiary-no-outline"
    markup="a"
    size="sm"
  >
  </dsfr-button>
{/if}
