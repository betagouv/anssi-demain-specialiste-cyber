<svelte:options customElement={{ tag: 'dsc-fiche-jeu', shadow: 'none' }} />

<script lang="ts">
  const items = [
    {
      id: 'menu-infos-generales',
      label: 'Informations générales',
      href: '#infos-generales',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-presentation',
      label: 'Présentation du jeu',
      href: '#presentation',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-photos',
      label: 'Photos',
      href: '#photos',
      isCollapsible: false,
      type: 'link',
    },
    {
      id: 'menu-temoignages',
      label: 'Témoignages',
      href: '#temoignages',
      isCollapsible: false,
      type: 'link',
    },
  ];
  const temoignages = [
    {
      citation:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim cursus at ullamcorper mauris non. Integer aliquam, scelerisque viverra sed enim interdum. In sem elit vivamus ut pellentesque leo eget lacus odio.',
      source: 'Détails',
      auteur: 'Kevin',
    },
    {
      citation:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim cursus at ullamcorper mauris non. Integer aliquam, scelerisque viverra sed enim interdum. In sem elit vivamus ut pellentesque leo eget lacus odio.',
      source: 'Détails',
      auteur: 'Mme A',
    },
  ];
</script>

<div class="hero">
  <dsfr-container>
    <div class="entete-fiche-jeu">
      <nav class="ariane" aria-label="Fil d'Ariane">
        <a href="#">Voir le fil d'Ariane</a>
      </nav>
      <div class="cartouche">
        <dsfr-badge
          label="Thématique cyber"
          accent="purple-glycine"
          type="accent"
        ></dsfr-badge>
        <p class="titre-alternatif-xs">CyberCluedo</p>
        <p class="elaboration">
          Élaboré par Cindy, Kylian, Kevin et Branda du Lycée Françoise de
          Tournefeuille (31)
        </p>
      </div>
      <div class="illustration-jeu">
        <img
          src="https://ressources-cyber.cellar-c2.services.clever-cloud.com/Passe_ton_hack.png"
        />
      </div>
    </div>
  </dsfr-container>
</div>

<div class="corps-de-fiche">
  <dsfr-side-menu
    title=""
    {items}
    buttonLabel="Dans cette fiche"
    buttonId="menu-fiche-jeu"
    hasTitle={false}
  ></dsfr-side-menu>

  <div class="sections">
    <div class="contenu">
      <section id="infos-generales">
        <h2>Informations générales</h2>
        <ul>
          <li>
            <span>Format</span>
            <span>Demi journée </span>
          </li>
          <li>
            <span>Établissement</span>
            <span>Lycée Françoise de Tournefeuille (31)</span>
          </li>
          <li>
            <span>Enseignant&middot;e</span>
            <span>Delphine</span>
          </li>
          <li>
            <span>Élèves</span>
            <span>Cindy, Kilian, Kevin et Brenda</span>
          </li>
          <li>
            <span>Discipline</span>
            <span>Sciences économiques et sociales</span>
          </li>
          <li>
            <span>Classe</span>
            <span>Seconde</span>
          </li>
        </ul>
      </section>

      <section id="presentation">
        <h2>Présentation du jeu</h2>
        <p>
          Inspirés du célèbre jeu de société, mes élèves ont imaginé Cyber
          Cluedo, un jeu d’enquête autour d’une cyberattaque fictive. Le but ?
          Découvrir qui a commis l’attaque, avec quel outil (clé USB piégée,
          phishing, etc.) et dans quel service (CDI, administration, salle
          informatique…). Ce projet leur a permis de réfléchir aux menaces
          numériques tout en mobilisant leur créativité, leur logique et leur
          esprit d’équipe. Une façon ludique et concrète d’aborder les enjeux de
          cybersécurité en classe.
        </p>
      </section>

      <section id="photos">
        <h2>Photos</h2>
        <div class="photos">
          <img src="/assets/images/image-generique.svg" alt="generique" />
          <img src="/assets/images/image-generique.svg" alt="generique" />
          <img src="/assets/images/image-generique.svg" alt="generique" />
        </div>
      </section>
    </div>

    <lab-anssi-temoignages titre="Témoignages" {temoignages} id="temoignages"
    ></lab-anssi-temoignages>
  </div>
</div>

<style lang="scss">
  @use '../points-de-rupture' as *;

  .hero {
    padding: 1rem 1rem 0;
    background: var(--blue-france-975-sun-113)
      url('/assets/images/hero-fiche-jeu.svg') no-repeat top right -300px;
    background-size: auto 100%;

    @include a-partir-de(md) {
      background-position-x: right -170px;
    }
    @include a-partir-de(lg) {
      background-position-x: right;
    }

    .entete-fiche-jeu {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas:
        'fil-ariane'
        'cartouche'
        'illustration';

      @include a-partir-de(lg) {
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        grid-template-areas:
          'fil-ariane fil-ariane'
          'cartouche illustration';
      }

      .ariane {
        grid-area: fil-ariane;
      }

      .cartouche {
        grid-area: cartouche;
        padding-bottom: 3rem;
        .titre-alternatif-xs {
          margin-top: 1.5rem;
          color: var(--grey-50-1000);

          @include a-partir-de(md) {
            margin-top: 0.25rem;
          }
        }

        dsfr-badge {
          display: none;
          margin-top: 1.5rem;
          @include a-partir-de(md) {
            display: block;
          }
        }

        .elaboration {
          font-size: 1.25rem;
          line-height: 2rem;
        }
      }
    }

    .illustration-jeu {
      grid-area: illustration;
      background: white;
      padding: 0.25rem 0.25rem 0;
      max-width: 36.75rem;
      justify-self: center;
      display: flex;

      img {
        width: 100%;
      }
    }
  }

  .corps-de-fiche {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 'menu' 'sections';
    max-width: 78rem;
    margin: 0 auto;

    @include a-partir-de(md) {
      grid-template-columns: 11.75rem 1fr;
      grid-template-areas: 'menu sections';
      padding-top: 1.5rem;
    }

    @include a-partir-de(lg) {
      grid-template-columns: 19.125rem 1fr;
    }

    dsfr-side-menu {
      @include a-partir-de(md) {
        height: 100%;
      }
    }

    .sections {
      grid-area: sections;
      padding-top: 2rem;

      @include a-partir-de(md) {
        padding-top: 0.75rem;
      }
      .contenu {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding-left: 1rem;
        padding-right: 1rem;

        @include a-partir-de(md) {
          padding-left: 0;
        }

        @include a-partir-de(lg) {
          padding-right: 1.5rem;
        }

        section {
          ul {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            li {
              span:nth-child(1) {
                &::after {
                  content: '\00a0:\00a0';
                }
              }
              span:nth-child(2) {
                font-weight: bold;
              }
            }
          }

          .photos {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr;

            @include a-partir-de(md) {
              grid-template-columns: 1fr 1fr;
            }

            img {
              aspect-ratio: 4/3;
              width: 100%;
              background-color: var(--blue-france-975-sun-113);
            }
          }
        }
      }
      lab-anssi-temoignages {
        display: block;
        margin-top: -44px;
        @include a-partir-de(md) {
          margin-left: -1.5rem;
        }
      }
    }
  }
</style>
