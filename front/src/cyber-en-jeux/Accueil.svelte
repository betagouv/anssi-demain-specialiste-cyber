<script lang="ts">
  import Citation from '../Citation.svelte';
  import InvitationARejoindre from './InvitationARejoindre.svelte';

  type Temoignage = {
    citation: string;
    auteur: string;
    source: string;
  };

  const temoignages: Temoignage[] = [];
  const etapesMarelle = [
    {
      titre: 'Préparation de la séquence CyberEnjeu',
      description:
        '<strong>Formez-vous</strong> aux notions clés de cybersécurité grâce à des <strong>ressources simples et accessibles</strong> pour bien lancer votre projet.',
      illustration: { lien: '/assets/images/cej/preparer.svg', alt: '' },
      lien: {
        texte: 'Guides et ressources CyberEnJeux',
        href: '#guides-et-ressources',
      },
    },
    {
      titre: 'Formation des élèves aux enjeux de cybersécurité',
      description:
        'Appuyez-vous sur des <strong>supports pédagogiques prêts à l’emploi</strong> pour sensibiliser vos élèves aux bons réflexes numériques.',
      illustration: { lien: '/assets/images/cej/former.svg', alt: '' },
      lien: {
        texte: 'Guides et ressources CyberEnJeux',
        href: '#guides-et-ressources',
      },
    },
    {
      titre: 'Conception de jeux par les élèves',
      description:
        'Aidez-les à <strong>concevoir des jeux  sur la cybersécurité</strong> en s’inspirant de modèles et de ressources adaptées à leur niveau.',
      illustration: { lien: '/assets/images/cej/concevoir.svg', alt: '' },
      lien: {
        texte: 'Vitrine des jeux des élèves',
        href: '#vitrine-des-jeux',
      },
    },
    {
      titre: 'Valorisation de la séquence et des jeux',
      description:
        'Accédez à votre espace enseignant et <strong>partagez les jeux créés par vos élèves</strong> pour mettre en avant leur engagement et enrichir la vitrine des jeux !',
      illustration: { lien: '/assets/images/cej/valoriser.svg', alt: '' },
      lien: {
        texte: 'Espace enseignant',
        href: '/mes-jeux',
      },
    },
  ];
</script>

<div class="accueil">
  <dsfr-container>
    <div class="approuve">
      <h2>
        Déjà testé et approuvé par plus de 800 enseignants auprès de 70 000
        élèves
      </h2>
      <p class="fr-text--lg">
        Imaginé par le laboratoire d’innovation de L’ANSSI et co-construit avec
        le ministère de l’Education nationale et l’association Open Serious
        Game, CyberEnJeux est un dispositif pédagogique innovant permettant de
        former des élèves à la cybersécurité dans le cadre de leurs
        enseignements… par la création de jeux par les élèves eux-mêmes.
      </p>
    </div>
  </dsfr-container>

  <div class="avantages">
    <dsfr-container>
      <div class="conteneur sombre">
        <h2>Grâce à CyberEnJeux, développez</h2>
        <img src="/assets/images/cej/collaboration.svg" alt="Collaboration" />
        <div class="articles">
          <article>
            <h6>Les postures collaboratives entre vos élèves</h6>
            <p class="fr-text">
              Développer des compétences transverses, telles que la capacité à
              s’organiser en groupe et à collaborer.
            </p>
          </article>
          <hr />
          <article>
            <h6>Leur autonomie</h6>
            <p class="fr-text">
              Développer des compétences transverses, telles que l’autonomie, la
              capacité à s’organiser individuellement.
            </p>
          </article>
          <hr />
          <article>
            <h6>L'apprentissage par le "faire"</h6>
            <p class="fr-text">
              Valoriser leur travail par la production d’un objet tangible,
              voire stimuler des élèves en difficultés scolaires.
            </p>
          </article>
          <hr />
          <article>
            <h6>L’engagement dans vos disciplines</h6>
            <p class="fr-text">
              CyberEnJeux s’adapte à toutes les disciplines et permet aux élèves
              de mobiliser concrètement leurs apprentissages, tout en renforçant
              leur motivation.
            </p>
          </article>
        </div>
      </div>
    </dsfr-container>
  </div>

  <dsfr-container>
    <lab-anssi-marelle titre="Déroulé d’une séquence CyberEnJeux">
      {#each etapesMarelle as etape, index}
        <lab-anssi-marelle-etape
          {index}
          etapeMarelle={etape}
          pair={(index + 1) % 2 === 0}
        >
          <p slot="etape-description" class="etape-description">
            {@html etape.description}
          </p>
          <span slot="etape-lien" class="etape-lien-conteneur">
            <lab-anssi-icone nom="arrow-right-line" size="sm"></lab-anssi-icone>
            <dsfr-link label={etape.lien.texte} href={etape.lien.href}
            ></dsfr-link>
          </span>
        </lab-anssi-marelle-etape>
      {/each}
    </lab-anssi-marelle>
  </dsfr-container>

  <dsfr-container>
    <hr />
  </dsfr-container>

  <dsfr-container>
    <InvitationARejoindre />
  </dsfr-container>

  <dsfr-container>
    <lab-anssi-carrousel-tuiles
      tuiles={[
        {
          titre: 'Pour tous les enseignements',
          contenu:
            'CyberEnJeux est un outil pédagogique développé pour le monde éducatif, pouvant être organisé dans tout type de disciplines.',
          illustration: { lien: '/assets/images/cej/city-hall.svg', alt: '' },
        },
        {
          titre: 'Dès le cycle 3',
          contenu:
            'CyberEnJeux peut être organisé à partir de 10 ans et tout au long de la scolarité et au-delà !',
          illustration: { lien: '/assets/images/cej/backpack.svg', alt: '' },
        },
        {
          titre: "Prêt à l'emploi",
          contenu:
            "Vous n'avez pas besoin d'être spécialistes cyber pour organiser une séquence CyberEnJeux et quasiment rien à préparer.",
          illustration: { lien: '/assets/images/cej/succes.svg', alt: '' },
        },
      ]}
    >
    </lab-anssi-carrousel-tuiles>
  </dsfr-container>

  <dsfr-container>
    <div class="bandeau">
      <div class="conteneur sombre">
        <h3>Organisez une séquence CyberEnJeux dans votre établissement</h3>
        <p class="fr-text">
          Faites découvrir la cybersécurité autrement ! En déclarant votre
          séquence, vous profitez d’un accompagnement et valorisez votre
          engagement pour une éducation au numérique plus ludique et
          participative.
        </p>
        <div class="action">
          <dsfr-button
            label="Déclarer une action CyberEnJeux"
            kind="inverted"
            target="_blank"
            href="#"
            markup="a"
          ></dsfr-button>
        </div>
      </div>
    </div>
  </dsfr-container>

  {#if temoignages.length > 0}
    <div class="temoignages">
      <dsfr-container>
        <lab-anssi-temoignages
          titre="Les élèves adorent CyberEnJeux !"
          {temoignages}
        ></lab-anssi-temoignages>
      </dsfr-container>
    </div>
  {/if}
</div>

<style lang="scss">
  @use '../points-de-rupture' as *;

  :root {
    --brique-carrousel-bouton-action-texte-couleur: #161616;
    --brique-marelle-titre-couleur: #161616;
    --brique-marelle-etapes-numero-etape-couleur: var(
      --background-flat-pink-tuile
    );
    --brique-temoignages-titre-couleur: #070707;
  }

  .accueil {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;

    .approuve {
      margin: 4.5rem auto;
      text-align: center;
      width: clamp(200px, 100%, 736px);

      p {
        margin: 0 auto;
      }
    }

    .avantages {
      background-color: var(--background-flat-pink-tuile);

      .conteneur {
        color: var(--grey-1000-50);
        margin: 4.5rem 0;
        display: grid;

        h2 {
          margin: 0 0 3.5rem;
        }

        img {
          margin: 0 auto 3rem;
          max-width: clamp(200px, 100%, 360px);
        }

        .articles {
          article {
            margin: 1rem 0;

            h6 {
              margin: 0 0 0.5rem;
            }

            p {
              margin: 0;
            }
          }

          hr {
            background-color: var(--border-default-pink-tuile);
          }
        }

        @include a-partir-de(md) {
          display: block;

          img {
            float: right;
            margin-top: calc(6rem - 7.5%);
            shape-outside: ellipse(36% 38% at 50% 50%) padding-box;
            max-width: 48%;
          }

          .articles {
            display: inline;

            article {
              max-width: 75%;
            }
          }
        }

        @include a-partir-de(lg) {
          .articles {
            article {
              max-width: 60%;
            }
          }
        }

        @include a-partir-de(xl) {
          justify-self: center;
          display: grid;
          grid-template-columns: 568px 430px;
          grid-template-rows: 1fr;
          gap: 0 2rem;
          margin: 4.5rem 0;
          max-width: 1200px;

          img {
            grid-column: 2;
            grid-row: 2;
            margin: 0;
            max-width: 100%;
          }

          .articles {
            grid-column: 1;
            grid-row: 2;

            article {
              max-width: 100%;
            }
          }
        }
      }
    }

    .bandeau {
      background-color: var(--bleu-profond-dsc);
      color: var(--grey-1000-50);
      padding: 2rem 2rem 3rem 2rem;

      .conteneur {
        max-width: 996px;
        margin: 0 auto 1rem;
      }

      h3 {
        margin: 0 0 0.5rem;
      }

      p {
        margin: 0;
      }

      .action {
        width: fit-content;
        margin-top: 2rem;
      }

      @include a-partir-de(lg) {
        .conteneur {
          display: grid;
          grid-template-columns: 0.55fr 0.45fr;
          grid-template-rows: auto auto;
          column-gap: 1.5rem;

          .action {
            grid-column: 2;
            grid-row: 1 / span 2;
            align-self: center;
            justify-self: center;
            margin: 0;
          }
        }
      }
    }

    .temoignages {
      background-color: var(--background-alt-blue-ecume);
    }

    lab-anssi-marelle {
      display: block;
      margin-bottom: -3.5rem;
    }

    .etape-description {
      color: var(--text-default-grey);
    }

    .etape-lien-conteneur {
      color: var(--text-action-high-blue-france);
      display: inline-flex;
      gap: 0.25rem;
    }
  }
</style>
