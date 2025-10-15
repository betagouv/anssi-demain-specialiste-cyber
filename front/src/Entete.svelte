<svelte:options
  customElement={{
    tag: 'dsc-entete',
    shadow: 'none',
    props: {},
  }}
/>

<script lang="ts">
  import { onMount } from 'svelte';

  let cheminCourant = $state('/');
  onMount(() => {
    cheminCourant = window.location.pathname;
  });
</script>

<dsfr-header
  id="entete"
  brandLogoTitle="Gouvernement"
  brandService="DemainSpécialisteCyber"
  brandLinkTitle="Retour à l'accueil du site - DemainSpécialisteCyber - République Française"
  hasBrandTagline="true"
  brandTagline="Innovation ANSSI"
  hasBrandOperator="true"
  brandOperatorAlt="ANSSI"
  brandOperatorSrc="/assets/images/ANSSI.svg"
  menuId="menu-principal"
  menuModalId="menu-principal-modal"
  hasNavigation="true"
  navigationId="navigation-principale"
  navigationAriaLabel="Menu principal"
  navigationItems={[
    {
      id: 'accueil',
      label: 'Accueil',
      type: 'link',
      href: '/',
      active: cheminCourant === '/',
    },
    {
      id: 'catalogue',
      label: 'Catalogue de ressources',
      type: 'link',
      href: '/catalogue',
      active: cheminCourant === '/catalogue',
    },
    {
      id: 'cyber-en-jeux',
      label: 'CyberEnJeux',
      type: 'link',
      href: '/cyber-en-jeux',
      active: cheminCourant === '/cyber-en-jeux',
    },
    { id: 'mes-jeux', label: 'Mes jeux', type: 'link', href: '/mes-jeux' },
  ]}
></dsfr-header>
