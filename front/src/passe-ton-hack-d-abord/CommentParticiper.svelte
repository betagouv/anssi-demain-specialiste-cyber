<script lang="ts">
</script>

<div class="comment-participer">
  <dsfr-container>
    <div class="contenu">
      <h2>Comment participer&nbsp;?</h2>

      <ol class="etapes">
        <li class="etape">
          <div class="indicateur" aria-hidden="true">1</div>
          <h3 class="etape-titre">
            Pré-inscription dès septembre chaque année
          </h3>
          <img
            class="etape-media etape-media--1"
            src="/assets/images/passe-ton-hack-d-abord/comment-participer/etape-1.png"
            alt=""
          />
        </li>
        <li class="etape">
          <div class="indicateur" aria-hidden="true">2</div>
          <h3 class="etape-titre">
            Composition des équipes sur le backoffice jusque début janvier
          </h3>
          <img
            class="etape-media etape-media--2"
            src="/assets/images/passe-ton-hack-d-abord/comment-participer/etape-2.png"
            alt=""
          />
        </li>
        <li class="etape">
          <div class="indicateur" aria-hidden="true">3</div>
          <h3 class="etape-titre">
            Fin janvier organisation du challenge durant 3 semaines
          </h3>
          <img
            class="etape-media etape-media--3"
            src="/assets/images/passe-ton-hack-d-abord/comment-participer/etape-3.png"
            alt=""
          />
        </li>
      </ol>

      <div class="action">
        <dsfr-button
          label="Inscrire mes élèves"
          kind="primary"
          markup="a"
          target="_blank"
          href="https://partage02.magistere.apps.education.fr/course/section.php?id=2066"
        ></dsfr-button>
      </div>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;
  @use '@style/grille' as *;

  .comment-participer {
    padding-top: 3.5rem;
  }

  .contenu {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 4.5rem;

    h2 {
      margin: 0;
      text-align: center;
      width: 100%;
    }
  }

  .etapes {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;

    @include a-partir-de(md) {
      gap: 2rem;
    }

    @include a-partir-de(lg) {
      max-width: taille-pour-colonnes(10);
    }
  }

  .etape {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @include a-partir-de(md) {
      column-gap: 1rem;
      display: grid;
      grid-template-areas: 'contenu indicateur media';
      grid-template-columns: 1fr 6.75rem 1fr;

      .etape-titre {
        grid-area: contenu;
      }

      .indicateur {
        grid-area: indicateur;
        justify-self: start;
      }

      .etape-media {
        grid-area: media;
      }

      .etape-media--3 {
        margin-top: 3rem;
      }

      &:nth-child(even) {
        grid-template-areas: 'media indicateur contenu';

        .indicateur {
          justify-self: end;
        }
      }
    }
  }

  .indicateur {
    align-items: center;
    background: var(--artwork-minor-blue-france, #6a6af4);
    border-radius: 9999px;
    color: var(--text-inverted-grey, #fff);
    display: flex;
    font-size: 2.5rem;
    font-weight: 700;
    height: 4.5rem;
    justify-content: center;
    line-height: 1;
    width: 4.5rem;
  }

  .etape-titre {
    color: var(--text-title-grey);
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 1.75rem;
    margin: 0;
    width: 100%;
  }

  .etape-media {
    display: block;
    height: auto;
    margin: 0 auto;
  }

  .etape-media--1 {
    width: min(72.4%, 426px);
  }

  .etape-media--2 {
    width: min(93.2%, 548px);
  }

  .etape-media--3 {
    width: min(100%, 588px);
  }
</style>
