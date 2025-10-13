<script lang="ts">
  import { onMount } from 'svelte';
  import { clic } from '../actions.svelte';

  type Onglet = { label: string; fragment: string };
  type Props = {
    onglets: Onglet[];
    ongletActif: number;
  };

  let { onglets, ongletActif = $bindable() }: Props = $props();

  const changeLOngletCourant = () => {
    const hash = new URLSearchParams(window.location.hash?.substring(1));
    const ongletDansLUrl = Array.from(hash)[0];
    if (ongletDansLUrl)
      ongletActif =
        onglets.findIndex((o) => o.fragment === `#${ongletDansLUrl[0]}`) ?? 0;
  };

  onMount(() => {
    changeLOngletCourant();
  });

  $effect(() => {
    window.addEventListener('hashchange', changeLOngletCourant);
    return () => window.removeEventListener('hashchange', changeLOngletCourant);
  });

  let open = $state(false);
  const surLeClicDeLEntete = (event: Event) => {
    event.preventDefault();
    open = !open;
  };

  const surLeClicDUnOnglet = (onglet: Onglet, indice: number) => {
    ongletActif = indice;
    open = false;
  };
</script>

<div class={['menu-onglets', { open }]}>
  <div class="entete" role="button" tabindex="0" use:clic={surLeClicDeLEntete}>
    <span>Naviguer dans CyberEnJeux</span>
  </div>
  <div class="onglets" aria-expanded={open}>
    <ol>
      {#each onglets as onglet, indice (onglet.label)}
        <li class={{ actif: onglets[ongletActif] === onglet }}>
          <a
            href={onglet.fragment}
            use:clic={() => surLeClicDUnOnglet(onglet, indice)}
          >
            {onglet.label}
          </a>
        </li>
      {/each}
    </ol>
  </div>
</div>

<style lang="scss">
  @use '../points-de-rupture' as *;

  .menu-onglets {
    box-sizing: border-box;
    margin: 0 -1.5rem;
    position: relative;
    width: calc(100% + 3rem);

    .entete {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      color: #000091;
      display: flex;
      height: 3rem;
      gap: 0.5rem;
      padding: 0.75rem 1rem;

      span {
        flex: 1;
      }

      &::marker,
      &::-webkit-details-marker {
        display: none;
      }

      &::before {
        background-color: #000091;
        content: ' ';
        flex: 0 0 16px;
        -webkit-mask-image: url('/icons/system/menu-2-fill.svg');
        mask-image: url('/icons/system/menu-2-fill.svg');
        margin-top: 2px;
      }

      &::after {
        background-color: #000091;
        content: ' ';
        flex: 0 0 24px;
        -webkit-mask-image: url('/icons/arrows/arrow-down-s-line.svg');
        mask-image: url('/icons/arrows/arrow-down-s-line.svg');
        transform: rotate(0deg);
        transition: transform 0.2s ease-in-out;
      }
    }

    .onglets {
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      display: none;
      font-size: 1rem;
      font-weight: bold;
      line-height: 1.5rem;
      max-height: 0;
      overflow: hidden;
      position: relative;
      transition:
        display,
        max-height 0.2s ease;
      transition-behavior: allow-discrete;
    }

    &.open {
      .entete {
        background-color: #e3e3fd;

        &::after {
          transform: rotate(-180deg);
        }
      }

      .onglets {
        display: block;
        max-height: initial;
        position: relative;
      }
    }

    ol {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: stretch;
        margin: 0 1rem;

        a {
          flex: 1;
          padding: 0.75rem 0.5rem;
        }

        + li > a {
          border-top: 1px solid #ddd;
        }

        &.actif a {
          background: linear-gradient(#000091, #000091) 0 50% / 2px 24px
            no-repeat;
          color: #000091;
        }
      }
    }

    @include a-partir-de(md) {
      display: flex;
      margin: 2rem auto 0;
      justify-content: center;
      width: clamp(200px, 100%, 639px);

      .entete {
        display: none;
      }

      .onglets {
        display: block;
        font-size: 0.875rem;
        font-weight: normal;
        max-height: initial;
      }

      ol {
        display: flex;
        justify-content: center;
        flex-flow: row nowrap;

        li {
          margin: 0;

          a {
            padding: 0.75rem;
            white-space: nowrap;
          }

          &.actif {
            a {
              background: linear-gradient(#000091, #000091) 0 100% / 100% 2px
                no-repeat;
            }
          }

          + li a {
            border-top: 0;
          }
        }
      }
    }
  }
</style>
