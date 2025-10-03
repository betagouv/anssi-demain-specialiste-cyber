<svelte:options
  customElement={{
    tag: 'dsc-cyber-en-jeux',
    shadow: 'none',
  }}
/>

<script>
  import Accueil from './Accueil.svelte';
  import Onglets from './Onglets.svelte';
  const onglets = [
    { label: '👩‍🏫 Présentation de CyberEnJeux', href: '#presentation' },
    { label: '🎲 Vitrine des jeux des élèves', href: '#vitrine-des-jeux' },
    { label: '📚 Guides et ressources', href: '#guides-et-ressources' },
  ];
</script>

<dsfr-container>
  <Onglets {onglets}></Onglets>
</dsfr-container>

<Accueil></Accueil>
