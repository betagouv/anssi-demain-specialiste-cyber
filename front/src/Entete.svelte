<svelte:options
  customElement={{
    tag: 'dsc-entete',
    shadow: 'none',
    props: {},
  }}
/>

<script lang="ts" module>
  type MenuItem = {
    id: string;
    type?: 'link' | 'menu' | 'mega-menu';
    active?: boolean;
    collapsable?: boolean;
    collapseId?: string;
    label: string;
    href?: string;
    items?: MenuItem[];
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { profil } from './stores/profil';

  const ajouteMenuSiConnecte = (elementDeMenu: MenuItem) =>
    $profil ? [elementDeMenu] : [];

  let cheminCourant = $state('/');
  onMount(() => {
    cheminCourant = window.location.pathname;
  });

  const menuNavigation: MenuItem[] = $derived([
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
      active:
        cheminCourant === '/catalogue' || cheminCourant.startsWith('/metiers'),
    },
    {
      id: 'cyber-en-jeux',
      label: 'CyberEnJeux',
      type: 'link',
      href: '/cyber-en-jeux',
      active:
        cheminCourant === '/cyber-en-jeux' || cheminCourant.startsWith('/jeux'),
    },
    ...ajouteMenuSiConnecte({
      id: 'mes-jeux',
      label: 'Mes jeux',
      type: 'link',
      href: '/mes-jeux',
      active: cheminCourant === '/mes-jeux',
    }),
  ]);

  const afficheMenuNavigation = $derived(cheminCourant !== '/nouveau-jeu');
</script>

<dsfr-header
  id="entete"
  brandLogoTitle="Gouvernement"
  brandService="DemainSpécialisteCyber"
  brandLinkTitle="Retour à l'accueil du site - DemainSpécialisteCyber - République Française"
  brandLinkHref="/"
  hasBrandTagline="true"
  brandTagline="Innovation ANSSI"
  hasBrandOperator="true"
  brandOperatorAlt="ANSSI"
  brandOperatorSrc="/assets/images/ANSSI.svg"
  menuId="menu-principal"
  menuModalId="menu-principal-modal"
  hasToolLinks="true"
  hasNavigation={afficheMenuNavigation}
  navigationId="navigation-principale"
  navigationAriaLabel="Menu principal"
  navigationItems={menuNavigation}
>
  <div slot="toolLinks">
    <dsc-zone-identification></dsc-zone-identification>
  </div>
</dsfr-header>
