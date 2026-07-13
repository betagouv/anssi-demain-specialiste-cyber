<script lang="ts">
</script>

<div class="presentation">
  <dsfr-container>
    <div class="contenu">
      <div class="intro">
        <h2>Une approche ludique et immersive</h2>
        <p class="fr-text--lg">
          Vos élèves intègrent une équipe de réponse à un incident cyber pour
          résoudre un conflit informatique et géopolitique
        </p>
      </div>

      <p class="texte-standard-md">
        Organisé par le Commandement de la Cyberdéfense et le Ministère de
        l’Éducation (COMCYBER), ce challenge est ouvert à tous les élèves
        scolarisés dans des lycées français en équipes avec un objectif de
        mixité&nbsp;! Le challenge distingue les équipes selon les profils de
        filières, générales et technologiques, professionnelles et du supérieur
        en lycée (prépa, certificat de spécialisation cyber et BTS CIEL et BTS
        SIO en lycée).
      </p>

      <dsfr-highlight text="ignoré">
        <div slot="text" class="exergue">
          <p class="exergue-titre">
            Déjà +10&nbsp;000 élèves répartis dans +2&nbsp;000 équipes&nbsp;!
          </p>
          <p class="texte-standard-md">
            Le challenge est organisé chaque année en janvier.
          </p>
          <p class="texte-standard-md exergue-derniere">
            La meilleure équipe de lycée générale et technologique, celle de bac
            professionnel, la meilleure équipe du supérieur et la première équipe
            la plus mixte sont récompensées.
          </p>
        </div>
      </dsfr-highlight>

      <p class="texte-standard-md accroche">
        Vous aussi, faites participer vos élèves à “Passe Ton Hack d’Abord”&nbsp;!
      </p>

      <dsfr-button
        label="Inscrire mes élèves"
        kind="primary"
        markup="a"
        href="https://fcsc.fr/fr/"
      ></dsfr-button>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '@style/points-de-rupture' as *;

  .presentation {
    padding: 1.5rem 0 4.5rem;
  }

  .contenu {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    > *:not(dsfr-button) {
      width: 100%;
    }

    > .texte-standard-md {
      margin: 0;
    }
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;

    h2,
    p {
      margin: 0;
    }
  }

  .accroche {
    font-weight: 700;
  }

  dsfr-highlight {
    .exergue-titre {
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
    }

    .exergue-derniere {
      margin-bottom: 0;
    }
  }
</style>
