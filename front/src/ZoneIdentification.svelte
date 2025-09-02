<svelte:options
  customElement={{ tag: 'dsc-zone-identification', shadow: 'none' }}
/>

<script lang="ts">
  import { profilStore } from './stores/profil.store';
  const estConnecte = profilStore.utilisateurEstConnecte();
</script>

{#if estConnecte}
  <a class="deconnexion" href="/oidc/deconnexion">Se déconnecter</a>
{:else}
  <a class="connexion" href="/oidc/connexion">Se connecter</a>
{/if}
