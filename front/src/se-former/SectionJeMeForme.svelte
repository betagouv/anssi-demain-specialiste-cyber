<script lang="ts">
</script>

<div class="section-formation">
  <dsfr-container>
    <h3 class="section-formation-titre fr-h2">Apprends à ton rythme</h3>
    <p class="section-formation-description texte-article-lg">
      Des formations en ligne gratuites, proposées par les acteurs publics de la
      cyber, pour comprendre les menaces, adopter les bons réflexes et découvrir
      le droit du numérique.
    </p>

    <div class="formations">
      <dsfr-card
        title="SensCyber"
        has-description
        description="L'e-sensibilisation gratuite de Cybermalveillance.gouv.fr. Trois modules (comprendre, agir, transmettre) pour connaître les cyberattaques les plus courantes et adopter les bons réflexes, avec un quiz à la fin de chaque chapitre."
        has-detail-end
        detail-end="www.cybermalveillance.gouv.fr"
        has-badge
        href="https://www.cybermalveillance.gouv.fr/sens-cyber"
        blank
        size="md"
        horizontal
        horizontal-proportion="tier"
        src="/assets/images/se-former/illustration-logo-senscyber.avif"
        enlarge
      >
        <dsfr-badges-group
          slot="badgesgroup"
          badges={[{ label: 'Accessible à tous', accent: 'green-emeraude' }]}
          size="sm"
        ></dsfr-badges-group>
      </dsfr-card>

      <dsfr-card
        title="CyberClass"
        has-description
        description="Un parcours de formation libre et modulaire (enjeux, données, réseaux, terminaux) pour outiller les adultes qui sensibilisent les jeunes à la cybersécurité. Conçu par Class'Code dans le cadre du programme TalCyb (France 2030)."
        has-detail-end
        detail-end="cyberclass.fr"
        has-badge
        href="https://cyberclass.fr"
        blank
        size="md"
        horizontal
        horizontal-proportion="tier"
        src="/assets/images/se-former/illustration-logo-cyberclass.avif"
        enlarge
      >
        <dsfr-badges-group
          slot="badgesgroup"
          badges={[
            { label: 'Enseignants et médiateurs', accent: 'pink-tuile' },
          ]}
          size="sm"
        ></dsfr-badges-group>
      </dsfr-card>

      <dsfr-card
        title="SecNumAcadémie"
        has-description
        description="Le MOOC de l'ANSSI fait peau neuve : des parcours sur trois niveaux, de la découverte à l'approfondissement, avec une attestation de réussite à la clé."
        has-detail-end
        detail-end="secnumacademie.gouv.fr"
        has-badge
        href="https://secnumacademie.gouv.fr"
        blank
        size="md"
        horizontal
        horizontal-proportion="tier"
        src="/assets/images/se-former/illustration-logo-secnum.avif"
        enlarge
      >
        <dsfr-badges-group
          slot="badgesgroup"
          badges={[{ label: 'Accessible à tous', accent: 'green-emeraude' }]}
          size="sm"
        ></dsfr-badges-group>
      </dsfr-card>

      <dsfr-card
        title="L'Atelier RGPD"
        has-description
        description="Le MOOC gratuit de la CNIL pour comprendre la protection des données personnelles : notions clés, grands principes, responsabilités de chacun. Une bonne porte d'entrée vers les métiers du droit du numérique."
        has-detail-end
        detail-end="atelier-rgpd.cnil.fr"
        has-badge
        href="https://atelier-rgpd.cnil.fr"
        blank
        size="md"
        horizontal
        horizontal-proportion="tier"
        src="/assets/images/se-former/illustration-logo-atelier-rgpd.avif"
        enlarge
      >
        <dsfr-badges-group
          slot="badgesgroup"
          badges={[{ label: 'Accessible à tous', accent: 'green-emeraude' }]}
          size="sm"
        ></dsfr-badges-group>
      </dsfr-card>
    </div>
  </dsfr-container>
</div>

<style lang="scss">
  @use '../../src/style/points-de-rupture' as *;
  @use '../../src/style/grille' as *;

  .section-formation {
    padding-block-end: 4.5rem;

    &-description {
      margin-block-end: 3rem;
    }
  }

  .formations {
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(lg) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
