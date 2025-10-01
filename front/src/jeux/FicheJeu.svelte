<svelte:options customElement={{ tag: 'dsc-fiche-jeu', shadow: 'none' }} />

<script lang="ts">
</script>

<div class="hero">
  <nav class="ariane" aria-label="Fil d'Ariane">
    <a href="#">Voir le fil d'Ariane</a>
  </nav>
  <div class="cartouche">
    <p class="titre-alternatif-xs">CyberCluedo</p>
    <p class="elaboration">
      Élaboré par Cindy, Kylian, Kevin et Branda du Lycée Françoise de
      Tournefeuille (31)
    </p>
  </div>
  <div class="illustration-jeu">
    <img src="https://ressources-cyber.cellar-c2.services.clever-cloud.com/Passe_ton_hack.png"/>
  </div>
</div>

<style lang="scss">
  @use '../points-de-rupture' as *;

  .hero {
    padding: 1rem 1rem 0;
    background: var(--blue-france-975-sun-113)
      url('/assets/images/hero-fiche-jeu.svg') no-repeat top right -300px;
    background-size: cover;
    display: flex;
    flex-direction: column;

    @include a-partir-de(md) {
      background-position-x: right -170px;
    }
    @include a-partir-de(lg) {
      background-position-x: right;
    }

    .cartouche {
      padding-bottom: 3rem;
      .titre-alternatif-xs {
        margin-top: 1.5rem;
        color: var(--grey-50-1000);
      }

      .elaboration {
        font-size: 1.25rem;
        line-height: 2rem;
      }
    }

    .illustration-jeu {
      background: white;
      padding: 0.25rem 0.25rem 0;
      max-width: 18rem;
      align-self: center;
      img {
        width: 100%;
      }
    }
  }
</style>
