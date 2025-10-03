<script>
  import Citation from '../Citation.svelte';
</script>

<div class="accueil">
  <dsfr-container>
    <div class="approuve">
      <h2>
        Déjà testé et approuvé par plus de 800 enseignants auprès de 70 000
        élèves
      </h2>
      <p>
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
      <div class="conteneur">
        <h2>Grâce à CyberEnJeux, développez</h2>
        <img src="/assets/images/cej/collaboration.svg" alt="Collaboration" />
        <div class="articles">
          <article>
            <h6>Les postures collaboratives entre vos élèves</h6>
            <p>
              Développer des compétences transverses, telles que la capacité à
              s’organiser en groupe et à collaborer.
            </p>
          </article>
          <hr />
          <article>
            <h6>Leur autonomie</h6>
            <p>
              Développer des compétences transverses, telles que l’autonomie, la
              capacité à s’organiser individuellement.
            </p>
          </article>
          <hr />
          <article>
            <h6>L'apprentissage par le "faire"</h6>
            <p>
              Valoriser leur travail par la production d’un objet tangible,
              voire stimuler des élèves en difficultés scolaires.
            </p>
          </article>
          <hr />
          <article>
            <h6>L’engagement dans vos disciplines</h6>
            <p>
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
    <lab-anssi-marelle
      titre="Déroulé d’une séquence CyberEnJeux"
      etapesmarelle={[
        {
          titre: 'Préparation de la séquence CyberEnjeu',
          description:
            'Formez-vous aux notions clés de cybersécurité grâce à des ressources simples et accessibles pour bien lancer votre projet.',
          illustration: { lien: '/assets/images/cej/preparer.svg', alt: '' },
          lien: {
            texte: 'Guides et ressources CyberEnJeux',
            href: '#ressources',
          },
        },
        {
          titre: 'Formation des élèves aux enjeux de cybersécurité',
          description:
            'Appuyez-vous sur des supports pédagogiques prêts à l’emploi pour sensibiliser vos élèves aux bons réflexes numériques.',
          illustration: { lien: '/assets/images/cej/former.svg', alt: '' },
          lien: {
            texte: 'Guides et ressources CyberEnJeux',
            href: '#ressources',
          },
        },
        {
          titre: 'Conception de jeux par les élèves',
          description:
            'Aidez-les à concevoir des jeux  sur la cybersécurité en s’inspirant de modèles et de ressources adaptées à leur niveau.',
          illustration: { lien: '/assets/images/cej/concevoir.svg', alt: '' },
          lien: {
            texte: 'Vitrine des jeux des élèves',
            href: '#vitrine-des-jeux',
          },
        },
        {
          titre: 'Valorisation de la séquence et des jeux',
          description:
            'Accédez à votre espace enseignant et partagez les jeux créés par vos élèves pour mettre en avant leur engagement et enrichir la vitrine des jeux !',
          illustration: { lien: '/assets/images/cej/valoriser.svg', alt: '' },
          lien: {
            texte: 'Espace enseignant',
            href: '/mes-jeux',
          },
        },
      ]}
    >
    </lab-anssi-marelle>
  </dsfr-container>
</div>

<style lang="scss">
  :root {
    --brique-marelle-titre-couleur: #161616;
    --brique-marelle-etapes-numero-etape-couleur: #ce614a;
  }

  .accueil {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;

    .approuve {
      margin: 4.5rem auto;
      text-align: center;
      width: clamp(200px, 100%, 736px);

      h2 {
        font-size: 1.75rem;
        line-height: 2.25rem;
        margin: 0 0 1.5rem;
      }

      p {
        font-size: 1.125rem;
        margin: 0 auto;
      }
    }

    .avantages {
      background-color: #a94645;
      color: #fff;

      .conteneur {
        margin: 4.5rem 0;
        display: grid;

        h2 {
          font-size: 1.75rem;
          line-height: 2.25rem;
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
              font-size: 1.125rem;
              font-weight: bold;
              line-height: 1.5rem;
              margin: 0 0 0.5rem;
            }

            p {
              font-size: 1rem;
              line-height: 1.5rem;
              margin: 0;
            }
          }

          hr {
            background-color: #ce614a;
            border: 0;
            display: block;
            height: 1px;
            margin: 0;
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

    lab-anssi-marelle {
      display: block;
      margin-bottom: -3.5rem;
    }
  }
</style>
