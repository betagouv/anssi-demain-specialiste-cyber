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
</div>

<style lang="scss">
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
  }
</style>
