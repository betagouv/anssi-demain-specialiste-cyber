<svelte:options
  customElement={{ tag: 'dsc-zone-identification', shadow: 'none' }}
/>

<script lang="ts">
  import { profil } from './stores/profil';
</script>

{#if $profil}
  <a class="deconnexion" href="/oidc/deconnexion">Se déconnecter</a>
{:else}
  <a class="connexion" href="/connexion">Se connecter</a>
{/if}
