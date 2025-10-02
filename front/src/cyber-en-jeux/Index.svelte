<svelte:options
  customElement={{
    tag: 'dsc-cyber-en-jeux',
    shadow: 'none',
  }}
/>

<script>
  import Onglets from './Onglets.svelte';
  const onglets = [
    { label: '👩‍🏫 Présentation de CyberEnJeux', href: '#presentation' },
    { label: '🎲 Vitrine des jeux des élèves', href: '#vitrine-des-jeux' },
    { label: '📚 Guides et ressources', href: '#guides-et-ressources' },
  ];
</script>

<dsfr-container>
  <Onglets onglets={elements}></Onglets>

  <div class="cej">
    <h2>
      Déjà testé et approuvé par plus de 800 enseignants auprès de 70 000 élèves
    </h2>
    <p>
      Imaginé par le laboratoire d’innovation de L’ANSSI et co-construit avec le
      ministère de l’Education nationale et l’association Open Serious Game,
      CyberEnJeux est un dispositif pédagogique innovant permettant de former
      des élèves à la cybersécurité dans le cadre de leurs enseignements… par la
      création de jeux par les élèves eux-mêmes.
    </p>
  </div>
</dsfr-container>

<style lang="scss">
  .cej {
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
</style>
