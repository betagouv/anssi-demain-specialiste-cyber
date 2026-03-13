<script lang="ts">
  import CarteParticipationFcsc from './CarteParticipationFcsc.svelte';
  import CarteDiscordFcsc from './CarteDiscordFcsc.svelte';

  const tuiles = [
    {
      titre: 'Plusieurs dizaines d’épreuves nouvelles chaque année',
      illustration: { lien: '/assets/images/fcsc/ide-code.svg', alt: '' },
    },
    {
      titre: 'Un challenge entièrement à distance',
      illustration: { lien: '/assets/images/fcsc/utilisateur-pc.svg', alt: '' },
    },
    {
      titre: 'Des épreuves adaptées aux débutants comme aux spécialistes',
      illustration: {
        lien: '/assets/images/fcsc/utilisateur-bol.svg',
        alt: '',
      },
    },
  ];

  const temoignages = [
    {
      citation:
        'Le France Cybersecurity Challenge m’a vraiment passionnée : j’ai adoré analyser des vulnérabilités, résoudre des challenges de cryptographie et comprendre concrètement comment fonctionnent les attaques et les défenses en cybersécurité.',
      auteur: 'Lena, élève en terminale, participante au FCSC 2023',
    },
  ];
</script>

<dsfr-container>
  <div class="participe">
    <h2>Participe au France Cybersecurity Challenge !</h2>
    <p class="texte-article-lg">
      Chaque année plusieurs milliers de personnes participent au France
      Cybersecurity Challenge (FCSC). Organisé par l'Agence nationale de la
      sécurité des systèmes d'information (ANSSI), le FCSC est ouvert à toutes
      et tous. Les participant(e)s de 14 à 25 ans qui le souhaitent peuvent
      tenter d'être sélectionné(e)s pour rejoindre la Team France et participer
      au challenge européen.
    </p>
    <lab-anssi-carrousel-tuiles>
      {#each tuiles as tuile, index (index)}
        <dsfr-tile
          title={tuile.titre}
          action-markup="false"
          no-link
          markupLevel="2"
        >
          <img
            src={tuile.illustration.lien}
            alt={tuile.illustration.alt}
            slot="pictogram"
          />
        </dsfr-tile>
      {/each}
    </lab-anssi-carrousel-tuiles>
    <dsfr-button
      href="https://fcsc.fr/fr/"
      label="Participer au challenge"
      markup="a"
      target="_blank"
    >
    </dsfr-button>
  </div>
</dsfr-container>

<dsfr-container class="benefices">
  <div class="contenu">
    <h2>En participant au France Cybersecurity Challenge</h2>
    <img
      src="/assets/images/fcsc/3-jeunes-supporters-fcsc.svg"
      alt="Trois jeunes supporters souriants avec un drapeau FCSC"
    />
    <div class="liste-benefices">
      <div class="benefice">
        <h6>Teste et mesure tes compétences cyber</h6>
        <p class="texte-standard-md">
          Relève les épreuves dans une grande variété de domaine, conçues par
          des experts de la cybersécurité&nbsp;: crypto, reverse, pwn, web,
          forensics, algorithmique, hardware, etc.
        </p>
      </div>
      <hr />
      <div class="benefice">
        <h6>Représente peut-être la France à l’ECSC</h6>
        <p class="texte-standard-md">
          Les 14 meilleurs/es joueurs/ses rejoindront la Team France (10
          titulaires, 4 remplaçants/es) et affronteront une trentaine d'équipes
          européennes dans le cadre de l’European Cybersecurity Challenge,
          organisé par l'ENISA (European Network and Information System Security
          Agency).
        </p>
      </div>
      <hr />
      <div class="benefice">
        <h6>Rejoue +530 épreuves du FCSC sur Hackropole</h6>
        <p class="texte-standard-md">
          Toutes les épreuves des FCSC des années précédentes sont accessibles
          sur Hackropole. Une plateforme qui propose un environnement
          d’apprentissage, sans limite de temps, et où les solutions d’une
          épreuve peuvent être consultées sans avoir résolu le challenge.
        </p>
        <lab-anssi-icone nom="arrow-right-line" size="sm"></lab-anssi-icone>
        <dsfr-link
          href="https://hackropole.fr/fr/"
          label="Explorer les épreuves sur Hackropole"
          blank
        ></dsfr-link>
      </div>
    </div>
  </div>
</dsfr-container>

<dsfr-container class="cartes">
  <div class="contenu">
    <CarteParticipationFcsc />
    <CarteDiscordFcsc />
  </div>
</dsfr-container>

<div class="temoignages">
  <lab-anssi-temoignages titre="Témoignages" {temoignages}
  ></lab-anssi-temoignages>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;
  @use '@style/grille' as *;

  .participe {
    margin: 0 auto;
    padding: 3rem 0 4.5rem;
    text-align: center;

    @include a-partir-de(lg) {
      max-width: taille-pour-colonnes(10);
    }

    @include a-partir-de(xl) {
      max-width: taille-pour-colonnes(8);
    }

    lab-anssi-carrousel-tuiles {
      display: block;
      margin-top: 3rem;
    }
  }

  dsfr-tile {
    scroll-snap-align: center;
    flex-shrink: 0;
    min-width: 235px;
    width: calc(33% - 14px);
  }

  .benefices {
    background: var(--background-alt-pink-tuile);
    padding: 72px 0;

    @include a-partir-de(lg) {
      .contenu {
        display: grid;
        grid-template-areas:
          'titre titre'
          'liste image';
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;

        h2 {
          grid-area: titre;
        }

        img {
          grid-area: image;
          align-self: center;
        }

        .liste-benefices {
          padding-right: 1.5rem;
          grid-area: liste;
        }
      }
    }

    img {
      width: 100%;
      max-width: 588px;
      margin: 3.5rem auto 2rem;
      display: block;
    }

    .benefice {
      padding: 1rem 0 1rem;

      h6 {
        margin-bottom: 0.5rem;
      }

      .texte-standard-md {
        margin-bottom: 0.5rem;
      }

      lab-anssi-icone {
        color: var(--text-action-high-blue-france);
        margin-right: 0.5rem;
      }

      dsfr-link {
        display: inline-block;
        margin-bottom: 0.5rem;
      }
    }
  }

  .cartes {
    padding: 72px 0;

    .contenu {
      display: flex;
      gap: 1.5rem;
      flex-direction: column;
    }
  }

  .temoignages {
    background-color: var(--background-alt-blue-ecume);
  }
</style>
