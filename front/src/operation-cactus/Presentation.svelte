<script lang="ts">
</script>

<div class="presentation">
  <dsfr-container>
    <div class="intro">
      <h2>
        Le hameçonnage ou <em>phishing</em>, premier risque cyber du grand public
      </h2>
      <p class="fr-text--lg">
        L’opération «&nbsp;Cactus&nbsp;» est une campagne nationale qui a pour but
        de sensibiliser aux risques de l’hameçonnage et à renforcer les réflexes
        numériques.
      </p>
    </div>
  </dsfr-container>

  <dsfr-container>
    <div class="cartes-cles">
      <dsfr-tile
        title={"2 541 945 élèves ont déjà participé à une Opération Cactus dans 4 768 établissements"}
        no-link
        action-markup="false"
        markup-level="3"
      >
        <img
          slot="pictogram"
          src="/assets/images/operation-cactus/picto-eleves.svg"
          alt=""
        />
      </dsfr-tile>
      <dsfr-tile
        title={"67 % des établissements ont engagé une action de sensibilisation après l’exercice"}
        no-link
        action-markup="false"
        markup-level="3"
      >
        <img
          slot="pictogram"
          src="/assets/images/operation-cactus/picto-etablissements.svg"
          alt=""
        />
      </dsfr-tile>
    </div>
  </dsfr-container>

  <dsfr-container>
    <div class="paragraphes">
      <p class="texte-standard-md">
        Depuis 2025, initié par le Parquet de Paris en charge de la
        cybercriminalité avec le MEN et de nombreux partenaires, un faux message
        est envoyé sur les messageries des espaces numériques de travail et les
        outils de vie scolaire des établissements volontaires dans toute la
        France.
      </p>
      <p class="texte-standard-md">
        Elle cible à la fois les collégiens, les lycéens, leurs parents et les
        personnels d’éducation.
      </p>
      <p class="texte-standard-md">
        Un poster est affiché dans les établissements pour initier le débat dans
        les collèges et les lycées. Un second message permet d’expliquer la
        démarche et de proposer des réflexes de sécurité numérique pour
        identifier et réagir face à l’hameçonnage. Les enseignants sont ensuite
        invités à engager une séance de sensibilisation pour travailler ces
        réflexes.
      </p>
    </div>
  </dsfr-container>

  <dsfr-container>
    <div class="partenaires">
      <h3>Les partenaires</h3>
      <p class="texte-standard-md">
        Une action collective nationale avec la participation en territoires des
        régions académiques et de leurs partenaires (collectivités et
        entreprises opérant les services d’ENT et de vie scolaire).
      </p>
      <div class="logos">
        <img
          src="/assets/images/operation-cactus/partenaires/educ-nationale.svg"
          alt="Ministère de l’Éducation nationale"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/parquet-paris.svg"
          alt="Parquet de Paris"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/justice.svg"
          alt="Ministère de la Justice"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/cybermalveillance.svg"
          alt="CyberMalveillance.gouv.fr"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/comcyber-mi.svg"
          alt="COMCYBER-MI"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/interieur.svg"
          alt="Ministère de l’Intérieur"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/cnil.svg"
          alt="CNIL"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/unaf.svg"
          alt="Unaf"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/e-enfance.svg"
          alt="e-Enfance"
        />
        <img
          src="/assets/images/operation-cactus/partenaires/france-tv.svg"
          alt="france.tv"
        />
      </div>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .presentation {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 3.5rem 0;
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;

    h2 {
      margin: 0;
    }

    p {
      margin: 0;
    }
  }

  .cartes-cles {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @include a-partir-de(md) {
      flex-direction: row;

      dsfr-tile {
        flex: 1;
      }
    }
  }

  .paragraphes p:last-child {
    margin-bottom: 0;
  }

  .partenaires {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    h3 {
      margin: 0;
    }

    p {
      margin: 0;
    }
  }

  .logos {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem 3rem;
    justify-content: center;
    padding-top: 1.5rem;

    img {
      max-width: 100%;
    }
  }
</style>
