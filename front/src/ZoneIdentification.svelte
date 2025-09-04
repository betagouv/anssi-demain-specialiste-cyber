<svelte:options
  customElement={{ tag: 'dsc-zone-identification', shadow: 'none' }}
/>

<script lang="ts">
  import { profilStore } from './stores/profil.store';
</script>

{#if $profilStore}
  <a class="deconnexion" href="/oidc/deconnexion">Se déconnecter</a>
{:else}
  <a class="connexion" href="/oidc/connexion">Se connecter</a>
{/if}
