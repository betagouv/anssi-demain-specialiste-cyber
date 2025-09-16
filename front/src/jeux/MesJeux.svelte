<svelte:options customElement={{ tag: 'dsc-mes-jeux', shadow: 'none' }} />

<script lang="ts">
  const deposeUnJeu = () => {
    window.location.assign('/nouveau-jeu');
  };
</script>

<dsfr-container>
  <div class="container">
    <h4>Valorisez la créativité de vos élèves</h4>
    <p>
      Partagez les jeux élaborés par vos élèves lors de séquence CyberEnJeux.
    </p>
    <dsfr-button
      label="Déposer un jeu"
      onclick={deposeUnJeu}
      role="button"
      onkeydown={deposeUnJeu}
      tabindex={0}
    ></dsfr-button>
  </div>
  <div>
    <span>
      Rejoignez la communauté CyberEnJeux pour poser vos questions ou partager
      votre expérience. Rejoindre la communauté
    </span>
  </div>
</dsfr-container>

<style>
  .container {
    align-items: center;
    align-self: stretch;
    background: #f5f5fe;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
  }
</style>
