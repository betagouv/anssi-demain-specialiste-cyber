<script lang="ts"></script>

<article id="je-me-teste" class="section-pix">
  <dsfr-container>
    <h3 class="section-pix-titre fr-h2">
      Fais le point sur ton niveau avec Pix
    </h3>

    <p class="section-pix-description texte-article-lg">
      Deux parcours Pix pour tester ce que tu sais déjà et repérer ce qu'il te
      reste à apprendre, question après question.
    </p>

    <div class="parcours">
      <div class="parcours-comment">
        <h4 class="parcours-titre">Comment ça marche&nbsp;? 🤔</h4>

        <div class="parcours-etape">
          <span class="parcours-numero">1</span>
          <p>
            Sélectionne le <strong>parcours qui te correspond</strong>.
          </p>
        </div>
        <hr />
        <div class="parcours-etape">
          <span class="parcours-numero">2</span>
          <p>
            Connecte-toi à <strong>ton compte Pix</strong> ou crée-le gratuitement.
          </p>
        </div>
        <hr />
        <div class="parcours-etape">
          <span class="parcours-numero">3</span>
          <p>
            <strong>Réponds à ton rythme&nbsp;:</strong> le parcours s'adapte à ton
            niveau et tu découvres ton résultat à la fin&nbsp;!
          </p>
        </div>
      </div>

      <dsfr-card
        title="Les essentiels de la cyber"
        hasDescription
        description="Prêt(e) à te mesurer aux essentiels de la cybersécurité ? Apprends à déjouer les pires pièges d'internet : mots de passe blindés, bouclier double authentification, esquive anti-phishing, secrets de ton antivirus et défense de tes données perso (RGPD). Équipe-toi et relève le défi !"
        hasBadge
        hasButtons
        size="md"
        src="/assets/images/se-former/illustration-pix-garcon-pull-bleu-ordinateur-etape-1.avif"
        no-link
      >
        <dsfr-badges-group
          slot="badgesgroup"
          badges={[{ label: 'Débutant', accent: 'green-emeraude' }]}
          size="sm"
        ></dsfr-badges-group>

        <dsfr-button
          label="Démarrer le parcours débutant"
          markup="a"
          href="https://app.pix.fr/campagnes/NYGECU655/presentation"
          target="_blank"
          has-icon
          icon-place="right"
          slot="buttonsgroup"
        ></dsfr-button>
      </dsfr-card>

      <dsfr-card
        title="Parcours Expert"
        hasDescription
        description="Passe au niveau pro ! Plonge dans les coulisses de la cybersécurité : bases de la cryptographie, investigation numérique (forensique) et politique de sécurité des systèmes d'information (PSSI). Maîtrise le vrai jargon, adopte le mindset des experts et identifie les acteurs clés de l'écosystème cyber."
        hasBadge
        hasButtons
        size="md"
        src="/assets/images/se-former/illustration-pix-fille-tshirt-orange-ordinateur-etape-2.avif"
        no-link
      >
        <dsfr-badges-group
          slot="badgesgroup"
          badges={[{ label: 'Confirmé', accent: 'blue-cumulus' }]}
          size="sm"
        ></dsfr-badges-group>

        <dsfr-button
          label="Démarrer le parcours confirmé"
          markup="a"
          href="https://app.pix.fr/campagnes/GHWXRH257/presentation"
          target="_blank"
          slot="buttonsgroup"
        ></dsfr-button>
      </dsfr-card>
    </div>
  </dsfr-container>
</article>

<article class="section-cyber">
  <dsfr-container>
    <h3 class="section-cyber-titre fr-h4">
      Aller plus loin dans la cyber&nbsp;!
    </h3>

    <div class="ressources">
      <dsfr-card
        title="Explore le domaine « Protection et sécurité » sur Pix"
        hasDescription
        description="Connecte-toi à ton compte Pix ou crée-en un gratuitement et continue à développer tes compétences. Sécuriser tes appareils et ton réseau, protéger tes données personnelles, adopter les bons réflexes au quotidien : autant de compétences utiles aujourd'hui comme pour les métiers de demain."
        href="https://pix.fr/"
        enlarge
        no-icon
        has-links
        size="md"
        src="/assets/images/se-former/illustration-pix-jeune-fille-chemise-bleu-avec-tablette.avif"
      >
        <dsfr-link
          slot="linksgroup"
          label="Accéder à la plateforme Pix"
          href="https://pix.fr/"
          target="_blank"
          size="md"
          blank
        ></dsfr-link>
      </dsfr-card>

      <dsfr-card
        title="Tu as terminé tes parcours ?"
        hasDescription
        description="Continue l'aventure ! Entraîne-toi sur de vrais challenges et prépare-toi aux compétitions."
        href="#je-m-entraine"
        enlarge
        no-icon
        has-links
        size="md"
        src="/assets/images/se-former/illustration-pix-trophee-avec-certificat.avif"
      >
        <dsfr-link
          slot="linksgroup"
          label="Voir les plateformes d'entrainement"
          href="#je-m-entraine"
          size="md"
        ></dsfr-link>
      </dsfr-card>

      <dsfr-card
        title="Révèle ton potentiel cyber !"
        hasDescription
        description="Les métiers de la cybersécurité cherchent de nouveaux talents. Les compétences que tu valides aujourd'hui sur Pix sont peut-être la première étape de ta future carrière."
        href="/metiers"
        enlarge
        no-icon
        has-links
        size="md"
        src="/assets/images/se-former/illustration-carte-metier-hacker-ethique.avif"
      >
        <dsfr-link
          slot="linksgroup"
          label="Explorer les métiers cyber"
          href="/metiers"
          size="md"
        ></dsfr-link>
      </dsfr-card>
    </div>

    <dsfr-card
      class="carte-defis-parents"
      title="Les défis Pix pour les parents"
      hasDescription
      description="Des parcours de 5 minutes pour explorer le numérique en famille !"
      has-links
      horizontal
      horizontal-proportion="tier"
      size="lg"
      href="https://pix.fr/parents#slice-2"
      src="/assets/images/se-former/illustration-pix-famille-navigue-sur-tablette.avif"
      enlarge
      no-icon
    >
      <dsfr-link
        slot="linksgroup"
        label="Découvrir les défis pour les parents"
        href="https://pix.fr/parents#slice-2"
        target="_blank"
        size="md"
        blank
      ></dsfr-link>
    </dsfr-card>
  </dsfr-container>
</article>

<style lang="scss">
  @use '../../src/style/points-de-rupture' as *;
  @use '../../src/style/grille' as *;

  .section-pix {
    margin-block-end: 3rem;

    &-description {
      margin-block-end: 3rem;
    }
  }

  .parcours {
    background-color: var(--background-alt-blue-france);
    padding: 2.5rem;
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(lg) {
      grid-template-columns: minmax(0, 21.313rem) repeat(2, 1fr);
    }

    &-comment {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-inline-end: 1rem;
    }

    &-titre {
      margin-block-end: 0;
    }

    &-etape {
      display: flex;
      align-items: center;
      gap: 1rem;

      p {
        margin-block-end: 0;
      }
    }

    &-numero {
      color: var(--artwork-minor-blue-france);
      font-size: 1.75rem;
      font-weight: bold;
      line-height: 2.25rem;
      display: flex;
    }
  }

  .section-cyber {
    padding-block-end: 4.5rem;

    &-titre {
      @include a-partir-de(lg) {
        margin-block-end: 2rem;
      }
    }
  }

  .ressources {
    display: grid;
    gap: 1.5rem;
    margin-block-end: 1.5rem;

    @include a-partir-de(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
