<svelte:options
  customElement={{
    tag: 'dsc-entete',
    shadow: 'none',
    props: {
      sansNavigation: { type: 'Boolean', attribute: 'sans-navigation' },
      sansZoneIdentification: {
        type: 'Boolean',
        attribute: 'sans-zone-identification',
      },
    },
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
  import { MediaQuery } from 'svelte/reactivity';
  import { TITRE_DSC_SECABLE } from '../constantes';
  import { profil } from '../stores/profil';

  interface Props {
    sansNavigation?: boolean;
    sansZoneIdentification?: boolean;
  }

  const { sansNavigation = false, sansZoneIdentification = false }: Props = $props();

  const ajouteMenuSiConnecte = (elementDeMenu: MenuItem) => ($profil ? [elementDeMenu] : []);

  let cheminCourant = $state('/');
  onMount(() => {
    cheminCourant = window.location.pathname;
  });

  const estPlusPetitQueBureauMediaQuery = new MediaQuery('max-width: 992px');
  const estPlusPetitQueBureau = $derived(estPlusPetitQueBureauMediaQuery.current);
  const lienCyberEnJeux: MenuItem = $derived({
    id: 'cyber-en-jeux',
    label: '🎲\u00A0CyberEnJeux',
    type: 'link',
    href: '/cyber-en-jeux',
    active: cheminCourant === '/cyber-en-jeux' || cheminCourant.startsWith('/jeux'),
  });

  const menuNavigation: MenuItem[] = $derived([
    {
      id: 'la-cybersecurite',
      label: 'Qu’est-ce que la cybersécurité ?',
      type: 'link',
      href: '/la-cybersecurite',
      active: cheminCourant === '/la-cybersecurite',
    },
    {
      id: 'se-former',
      label: 'Se former et s’entrainer',
      type: 'link',
      href: '/se-former',
      active: cheminCourant === '/se-former',
    },
    {
      id: 'les-metiers',
      label: 'Découvrir les métiers',
      type: 'link',
      href: '/les-metiers',
      active: cheminCourant === '/les-metiers' || cheminCourant.startsWith('/familles-metier'),
    },
    {
      id: 'dispositifs-phares',
      label: 'Dispositifs Phares',
      type: 'menu',
      collapsable: true,
      collapseId: 'dispositifs-phares',
      active:
        ['/france-cybersecurity-challenge', '/operation-cactus', '/passe-ton-hack-d-abord'].includes(cheminCourant) ||
        cheminCourant.startsWith('/jeux'),
      items: [
        {
          id: 'france-cybersecurity-challenge',
          label: '🛡️ France Cybersecurity Challenge',
          type: 'link',
          href: '/france-cybersecurity-challenge',
          active: cheminCourant === '/france-cybersecurity-challenge',
        },
        {
          id: 'operation-cactus',
          label: 'Opération Cactus',
          type: 'link',
          href: '/operation-cactus',
          active: cheminCourant === '/operation-cactus',
        },
        {
          id: 'passe-ton-hack',
          label: "Passe Ton Hack d'Abord",
          type: 'link',
          href: '/passe-ton-hack-d-abord',
          active: cheminCourant === '/passe-ton-hack-d-abord',
        },
      ],
    },
    {
      id: 'catalogue-et-selections',
      label: 'Catalogue et sélections',
      type: 'menu',
      collapsable: true,
      collapseId: 'catalogue-et-selections',
      active:
        ['/catalogue', '/selection-enseignants', '/selection-eleves'].includes(cheminCourant) ||
        cheminCourant.startsWith('/metiers'),
      items: [
        {
          id: 'catalogue',
          label: 'Catalogue de ressources',
          type: 'link',
          href: '/catalogue',
          active: cheminCourant === '/catalogue' || cheminCourant.startsWith('/metiers'),
        },
        {
          id: 'selection-enseignants',
          label: 'Sélection enseignants',
          type: 'link',
          href: '/selection-enseignants',
          active: cheminCourant === '/selection-enseignants',
        },
        {
          id: 'selection-eleves',
          label: 'Sélection élèves',
          type: 'link',
          href: '/selection-eleves',
          active: cheminCourant === '/selection-eleves',
        },
      ],
    },
    ...ajouteMenuSiConnecte({
      id: 'mes-jeux',
      label: 'Mes jeux',
      type: 'link',
      href: '/mes-jeux',
      active: cheminCourant === '/mes-jeux',
    }),
    ...(estPlusPetitQueBureau ? [lienCyberEnJeux] : []),
  ]);
</script>

<dsfr-header
  id="entete"
  brandLogoTitle="Gouvernement"
  brandService={TITRE_DSC_SECABLE}
  brandLinkTitle="Retour à l'accueil du site - {TITRE_DSC_SECABLE} - République Française"
  brandLinkHref="/"
  menuId="menu-principal"
  menuModalId="menu-principal-modal"
  hasToolLinks={!sansZoneIdentification}
  duplicateToolLinks={true}
  hasNavigation={!sansNavigation}
  navigationId="navigation-principale"
  navigationAriaLabel="Menu principal"
  navigationItems={menuNavigation}
  hasHeaderTag={false}
  hasSlotAfterNavigation={true}
>
  <dsc-zone-identification slot="toolLinks"></dsc-zone-identification>
  <dsc-zone-identification slot="modalToolLinks"></dsc-zone-identification>
  <a slot="afternavigation" href={lienCyberEnJeux.href} class="lien-cyberenjeux">
    {lienCyberEnJeux.label}
  </a>
</dsfr-header>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .lien-cyberenjeux {
    display: none;

    @include a-partir-de(lg) {
      background-color: var(--background-alt-yellow-moutarde);
      box-shadow: inset 0 1px 0 0 var(--border-default-grey);
      display: flex;
      align-items: center;
      color: var(--text-action-high-grey);
      font-size: 0.875rem;
      line-height: 1.5rem;
      padding: 1rem;

      &:hover {
        background-color: var(--background-alt-yellow-moutarde-hover);
      }

      &:active {
        background-color: var(--background-alt-yellow-moutarde-active);
      }

      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid #0a76f6;
      }
    }
  }
</style>
