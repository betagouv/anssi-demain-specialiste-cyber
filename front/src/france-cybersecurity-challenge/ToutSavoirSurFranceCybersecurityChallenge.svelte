<script lang="ts">
  import TuilesCategoriesEpreuvesFcsc from './TuilesCategoriesEpreuvesFcsc.svelte';
  import CartesDerouleECSC from './CartesDerouleECSC.svelte';
</script>

<dsfr-container>
  <div class="sections">
    <section>
      <h3>Le FCSC, un challenge accessible à tous</h3>

      <dsfr-highlight
        text="Le France Cybersecurity Challenge (FCSC) est accessible à tous !"
      ></dsfr-highlight>

      <p class="texte-standard-md">
        C’est l’occasion pour les jeunes âgé(e)s de 14 à 25 ans de se tester et
        se mesurer à une grande variété d’épreuves conçues par des experts de la
        cybersécurité. La compétition est également accessible en hors catégorie
        pour les joueurs n'étant pas éligibles à l'European Cybersecurity
        Challenge (âge, disponibilité, nationalité).
      </p>
    </section>

    <section>
      <h3>100% en ligne et flexible</h3>
      <p class="texte-standard-md">
        Le FCSC se déroule pendant 10 jours et la participation est entièrement
        en ligne, sans aucune contrainte horaire.
      </p>
      <p class="texte-standard-md">
        Chaque joueur et joueuse participe seul(e) mais peut choisir de
        rejoindre la
        <dsfr-link
          label="communauté FCSC sur Discord"
          href="https://discord.com/invite/rwZY6hh8z8"
        ></dsfr-link>
        pour échanger avec les autres participant(e)s.
      </p>
    </section>

    <section>
      <h3>Comment est établi le classement du FCSC&nbsp;?</h3>
      <p class="texte-standard-md">
        Le FCSC propose une cinquantaine d'épreuves dans plusieurs catégories
        techniques :
      </p>

      <TuilesCategoriesEpreuvesFcsc/>

      <p class="texte-standard-md">
        Tout au long du challenge, les joueurs et joueuses sont positionnés dans
        un classement en constante évolution. Ce classement est établi sur la
        base du nombre de points collectés par chaque participant(e).
      </p>
      <p class="texte-standard-md">
        Chaque épreuve vaut au démarrage 500 points mais voit sa valeur évoluer
        au fil du challenge en fonction du nombre de personnes qui sont
        parvenues à les résoudre (scoring dynamique) : plus une épreuve a été
        résolue, plus sa valeur en point diminue !
      </p>
      <p class="texte-standard-md">
        Avant la conclusion du challenge, il est demandé à chaque participant(e)
        de partager deux solutions rédigées ("write-up") qui seront examinées en
        cas de sélection pour les entretiens de sélection pour l'équipe France.
      </p>
    </section>

    <section id="selection-team-france">
      <h3>Sélection de la Team France pour l’ECSC</h3>
      <img
        src="/assets/images/fcsc/selection-team-france.svg"
        alt="Team France avec 5 juniors et 5 seniors"
      />
      <p class="texte-standard-md">
        La Team France qui va représenter la France lors de l’European
        Cybersecurity Challenge (ECSC) est sélectionnée parmi les joueurs(ses)
        les mieux classés dans chaque catégorie technique, parmi les
        participants(e)s junior et senior (les personnes "Hors catégorie" ne
        sont pas éligibles à la participation au challenge européen).
      </p>
      <p class="texte-standard-md">
        Les 3 meilleurs(es) joueur(ses) junior et senior (soit 6 personnes) dans
        chacune des 5 catégories (soit un maximum de 30 personnes, une personne
        pouvant être présente dans plusieurs catégories) sont reçus en entretien
        à distance par les spécialistes de l'ANSSI.
      </p>
      <p class="texte-standard-md">
        <b
          >Suite à ces entretiens, 14 personnes sont sélectionnées : 5 junior et
          5 seniors ainsi que 2 remplaçants(e)s dans chaque catégorie d'âge.</b
        >
      </p>
      <p class="texte-standard-md">
        Les entretiens se déroulent en général courant juin et la sélection est
        finalisée fin juin / début juillet.
      </p>
    </section>

    <section id="preparation-team-france-ecsc">
      <h3>Préparation de la Team France à l‘ECSC</h3>
      <img
        src="/assets/images/fcsc/preparation-team-france-ecsc.avif"
        alt="Logos Team France et ECSC"
      />
      <p class="texte-standard-md">
        Une fois la Team France (équipe de France) sélectionnée, l'ensemble des
        joueurs(es) est accompagnée par les coaches de l'ANSSI pour se préparer
        au challenge européen qui se déroule au 3e trimestre de l'année. Durant
        l'été, l'équipe est invitée à relever ensemble des challenges, avec le
        soutien de l'ANSSI.
      </p>
      <p class="texte-standard-md">
        Un entraînement de l'ensemble des équipes des États membres de l'Union
        européenne est généralement organisé en septembre. À cette occasion,
        l'équipe France est invitée à se réunir dans les locaux de l'ANSSI pour
        participer.
      </p>
    </section>

    <section id="deroule-ecsc">
      <h3>Déroulé de l’ECSC</h3>
      <p class="texte-standard-md">
        L’European Cybersecurity Challenge (ECSC) est organisé par l'Agence
        européenne pour la cybersécurité - l'ENISA - et se déroule chaque année
        pendant 2 jours dans un Etat membre de l'Union européenne.
      </p>
      <dsfr-highlight text="En 2026, l'ECSC se déroule en Allemagne."
      ></dsfr-highlight>
      <p class="texte-standard-md">
        Le challenge se déroule sur 2 jours en 2 temps :
      </p>
      <CartesDerouleECSC></CartesDerouleECSC>
    </section>

    <dsfr-link
      href="#"
      label="Haut de page"
      size="md"
      has-icon
      icon="arrow-up-fill"
    ></dsfr-link>
  </div>
</dsfr-container>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .sections {
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @include a-partir-de(lg) {
      gap: 3rem;
    }

    #selection-team-france,
    #preparation-team-france-ecsc {
      img {
        width: 100%;
        margin-bottom: 1.5rem;
      }
    }
  }

  p:last-child {
    margin-bottom: 0;
  }
</style>
