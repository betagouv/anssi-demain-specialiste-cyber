<script lang="ts" module>
  export type ElementDeMenu = {
    id: string;
    label: string;
    href: string;
    isCollapsible: boolean;
    type: 'link';
  };

  export type Menu = ElementDeMenu[];
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    menu: Menu;
    menuId: string;
    children?: Snippet;
    apresContenu?: Snippet;
  };
  const { menu, menuId, children: sections, apresContenu }: Props = $props();
</script>

<div class="corps-de-fiche">
  <dsfr-side-menu
    title=""
    items={menu}
    buttonLabel="Dans cette fiche"
    buttonId={menuId}
    hasTitle={false}
  ></dsfr-side-menu>

  <div class="sections">
    <div class="contenu">
      {@render sections?.()}
    </div>
    {@render apresContenu?.()}
  </div>
</div>

<style lang="scss">
  @use './style/points-de-rupture' as *;

  .corps-de-fiche {
    display: grid;
    grid-template-columns: 100%;
    grid-template-areas: 'menu' 'sections';
    max-width: 78rem;
    margin: 0 auto;

    @include a-partir-de(md) {
      grid-template-columns: 11.75rem 1fr;
      grid-template-areas: 'menu sections';
    }

    @include a-partir-de(lg) {
      grid-template-columns: 19.125rem 1fr;
    }

    dsfr-side-menu {
      @include a-partir-de(md) {
        --component-padding: 1.5rem 0;
        height: 100%;
      }
    }

    .sections {
      grid-area: sections;
      padding-top: 2rem;
      padding-bottom: 4.5rem;

      .contenu {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        @include a-partir-de(md) {
          padding-left: 0;
        }

        @include a-partir-de(lg) {
          padding-right: 1.5rem;
        }
      }
    }
  }
</style>
