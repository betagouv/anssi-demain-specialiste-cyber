<script lang="ts">
</script>

<div class="plus-de-ctf">
  <dsfr-container>
    <div class="contenu">
      <h2 class="titre">
        Participez à d’autres challenges régionaux et internationaux ouverts aux
        scolaires et aux étudiants
      </h2>

      <div class="cartes">
        <dsfr-card
          title="Le France Cybersecurity Challenge"
          description="Le France Cybersecurity Challenge (FCSC) est un CTF organisé tous les ans par l’ANSSI. Le FCSC vise à sélectionner les meilleurs joueurs français pour composer la Team France pour l’European Cybersecurity Challenge (ECSC)."
          href="/france-cybersecurity-challenge"
          enlarge
          has-description
        ></dsfr-card>
        <dsfr-card
          title={'Le CSAW Europe « Red Team Competition » - Épreuve lycéens'}
          description="L’épreuve «&#8239;Red Team Competition&#8239;» est dédiée aux lycéen(ne)s, avec l’objectif de sensibiliser les jeunes aux métiers de la sécurité informatique et de susciter des vocations."
          href="https://esisar.grenoble-inp.fr/fr/recherche/epreuve-red-team"
          blank
          enlarge
          has-description
        ></dsfr-card>
        <dsfr-card
          title="Le Breizh CTF"
          description="Le BreizhCTF est une compétition de sécurité informatique de type CTF (Capture the flag) imaginée par deux spécialistes de la cybersécurité, @_SaxX_ et @kaluche_, et organisée par l’agence Bretagne Next."
          href="https://www.breizhctf.com/"
          blank
          enlarge
          has-description
        ></dsfr-card>
      </div>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .plus-de-ctf {
    background-color: #ececfe;
    padding: 3rem 0;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .titre {
    color: var(--text-title-grey, #161616);
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
    margin: 0;
  }

  .cartes {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @include a-partir-de(md) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
