<script lang="ts">
</script>

<div class="avantages">
  <dsfr-container>
    <div class="contenu">
      <h2>Grâce à Cactus, enseignants, élèves, familles…</h2>
      <img
        class="illustration"
        src="/assets/images/operation-cactus/avantages.png"
        alt=""
      />
      <div class="liste">
        <div class="item">
          <h3 class="fr-h6">
            Apprennent à identifier les signes d’un phishing / hameçonnage sur
            les messageries ou les posts
          </h3>
          <p class="texte-standard-md">
            Trouvez les indices d’un message frauduleux pour apprendre à les
            déjouer (adresse, signature, tonalité ou contenu du message…).
          </p>
        </div>
        <hr />
        <div class="item">
          <h3 class="fr-h6">Adoptent les bons réflexes</h3>
          <p class="texte-standard-md">
            Des réflexes simples : ne pas cliquer, vérifier, signaler.
          </p>
        </div>
        <hr />
        <div class="item">
          <h3 class="fr-h6">
            Deviennent des relais dans la chaine de sensibilisation tout au long
            de l’année
          </h3>
          <p class="texte-standard-md">
            Partager les réflexes, transmettre et aider les autres, plus jeunes
            ou plus âgés à ne pas se faire piéger.
          </p>
        </div>
      </div>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .avantages {
    background-color: #fef5e8;
    padding: 4.5rem 0;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    h2 {
      margin: 0;
    }

    @include a-partir-de(md) {
      display: grid;
      grid-template-areas:
        'titre titre'
        'liste illustration';
      grid-template-columns: 1fr 1fr;
      gap: 3rem;

      h2 {
        grid-area: titre;
      }

      .liste {
        grid-area: liste;
      }

      .illustration {
        grid-area: illustration;
      }
    }
  }

  .illustration {
    align-self: center;
    display: block;
    height: auto;
    max-width: 463px;
    width: 100%;
  }

  .liste {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 0.5rem;

    h3 {
      margin: 0;
    }

    p {
      margin: 0;
    }
  }
</style>
