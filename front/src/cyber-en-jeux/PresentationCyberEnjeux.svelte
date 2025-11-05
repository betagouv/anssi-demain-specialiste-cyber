<script lang="ts">
  import InvitationARejoindre from './InvitationARejoindre.svelte';
  import EncartDeclarerUneAction from './EncartDeclarerUneAction.svelte';

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
  const tuiles = [
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
        Imaginé par le laboratoire d’innovation de l’ANSSI et co-construit avec
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
        <div class="corps">
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
                Développer des compétences transverses, telles que l’autonomie,
                la capacité à s’organiser individuellement.
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
                CyberEnJeux s’adapte à toutes les disciplines et permet aux
                élèves de mobiliser concrètement leurs apprentissages, tout en
                renforçant leur motivation.
              </p>
            </article>
          </div>
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
    <lab-anssi-carrousel-tuiles>
      {#each tuiles as tuile, index (index)}
        <dsfr-tile
          title={tuile.titre}
          has-description
          description={tuile.contenu}
          action-markup="false"
          no-link
        >
          <img
            src={tuile.illustration.lien}
            alt={tuile.illustration.alt}
            slot="pictogram"
          />
        </dsfr-tile>
      {/each}
    </lab-anssi-carrousel-tuiles>
  </dsfr-container>

  <dsfr-container>
    <EncartDeclarerUneAction />
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
  @use '../grille' as *;

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

      @include a-partir-de(lg) {
        max-width: taille-pour-colonnes(10);
      }

      @include a-partir-de(xl) {
        max-width: taille-pour-colonnes(8);
      }

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

        .corps {
          display: flex;
          flex-direction: column;
          img {
            align-self: center;
            width: 100%;
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
            flex-direction: row-reverse;

            img {
              width: 50%;
            }

            .articles {
              padding-right: 2rem;
            }
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

    dsfr-tile {
      min-width: 212px;
      scroll-snap-align: center;
      flex-shrink: 0;
      width: calc(100vw - 60px);
      max-width: 384px;

      &:first-of-type {
        margin-left: var(--espacement);

        @include a-partir-de(lg) {
          margin-left: 0;
        }
      }

      &:last-of-type {
        margin-right: var(--espacement);

        @include a-partir-de(lg) {
          margin-right: 0;
        }
      }
    }
  }
</style>
