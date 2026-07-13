<script lang="ts">
</script>

<div class="avantages">
  <dsfr-container>
    <div class="contenu">
      <h2>En rejoignant le challenge</h2>

      <img
        class="illustration"
        src="/assets/images/passe-ton-hack-d-abord/avantages/illustration.png"
        alt=""
      />

      <div class="liste">
        <div class="item">
          <img
            class="icone"
            src="/assets/images/passe-ton-hack-d-abord/avantages/icone-bouclier.svg"
            alt=""
          />
          <h3 class="item-titre">Formez vos élèves à la cybersécurité</h3>
        </div>
        <hr />
        <div class="item">
          <img
            class="icone"
            src="/assets/images/passe-ton-hack-d-abord/avantages/icone-eleve.svg"
            alt=""
          />
          <h3 class="item-titre">Développez l’esprit d’équipe de vos élèves</h3>
        </div>
        <hr />
        <div class="item">
          <img
            class="icone"
            src="/assets/images/passe-ton-hack-d-abord/avantages/icone-loupe.svg"
            alt=""
          />
          <h3 class="item-titre">
            Faites découvrir la diversité des métiers de la cybersécurité et du
            numérique
          </h3>
        </div>
        <hr />
        <div class="item">
          <img
            class="icone"
            src="/assets/images/passe-ton-hack-d-abord/avantages/icone-valide.svg"
            alt=""
          />
          <h3 class="item-titre">Certifiez les compétences de vos élèves</h3>
        </div>
      </div>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .avantages {
    background-color: #fef3fd;
    padding: 4.5rem 0;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    h2 {
      margin: 0;
    }
  }

  .illustration {
    align-self: center;
    display: block;
    height: auto;
    max-width: 33.5rem;
    width: calc(100% - 20px);
  }

  .liste {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item {
    align-items: flex-start;
    display: flex;
    gap: 0.75rem;
    padding-bottom: 0.5rem;

    .icone {
      flex-shrink: 0;
      height: 2rem;
      object-fit: contain;
      width: 2rem;
    }
  }

  .item-titre {
    color: var(--text-title-grey);
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.75rem;
    margin: 0;
  }
</style>
