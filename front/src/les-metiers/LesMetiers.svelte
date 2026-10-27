<svelte:options
  customElement={{
    tag: 'dsc-les-metiers',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import { onMount } from 'svelte';
  import IconeJecouteLesPros from '../../statique/assets/images/les-metiers/icone-lecteur-video.svg?raw';
  import IconeJeTraceMaRoute from '../../statique/assets/images/les-metiers/icone-sac-a-dos.svg?raw';
  import IconeJExplore from '../../statique/assets/images/se-former/icone-personnage-devant-ordinateur.svg?raw';
  import IconeJeMeRepere from '../../statique/assets/images/se-former/icone-rond-avec-coche-rouge.svg?raw';
  import SectionJEcouteLesPros from './SectionJEcouteLesPros.svelte';
  import SectionJeMeRepere from './SectionJeMeRepere.svelte';
  import SectionJeTraceMaRoute from './SectionJeTraceMaRoute.svelte';
  import SectionJExplore from './SectionJExplore.svelte';

  type Categorie =
    'je-me-repere' | 'j-explore' | 'j-ecoute-les-pros' | 'je-trace-ma-route';

  type ElementFiltre = {
    icone: string;
    libelle: string;
    description: string;
    valeur: Categorie;
    href: string;
  };

  type Fonctionnalite = {
    titre: string;
    description: string;
  };

  let categorieActive: Categorie = $state('je-me-repere');

  const fonctionnalitesOnisep: Fonctionnalite[] = [
    {
      titre: '20 portraits de pros',
      description:
        'Découvre leur quotidien, leur parcours et leurs conseils pour te lancer.',
    },
    {
      titre: 'Des fiches métiers détaillées',
      description:
        'Analyste SOC, hackeuse éthique, juriste… Explore les fiches pour mieux comprendre les missions de chaque métier.',
    },
    {
      titre: 'Des témoignages en vidéo',
      description:
        'Rencontre les pros en vidéo et fais-toi une idée concrète de leur travail.',
    },
  ];

  const filtresCategories: ElementFiltre[] = [
    {
      icone: IconeJeMeRepere,
      libelle: '1. Je me repère',
      description:
        'Six profils pour comprendre les grandes familles de métiers de la cyber.',
      valeur: 'je-me-repere',
      href: '#je-me-repere',
    },
    {
      icone: IconeJExplore,
      libelle: "2. J'explore",
      description:
        'Cinq familles de métiers, du pilotage de la sécurité à la gestion de crise.',
      valeur: 'j-explore',
      href: '#j-explore',
    },
    {
      icone: IconeJecouteLesPros,
      libelle: "3. J'écoute les pros",
      description:
        'Vingt professionnel(le)s et professionnels racontent leur quotidien.',
      valeur: 'j-ecoute-les-pros',
      href: '#j-ecoute-les-pros',
    },
    {
      icone: IconeJeTraceMaRoute,
      libelle: '4. Je trace ma route',
      description:
        'Du bac pro au doctorat, plusieurs chemins mènent aux métiers de la cyber.',
      valeur: 'je-trace-ma-route',
      href: '#je-trace-ma-route',
    },
  ];

  const valeursCategories: Categorie[] = filtresCategories.map((f) => f.valeur);

  function estUneCategorie(valeur: string): valeur is Categorie {
    return (valeursCategories as string[]).includes(valeur);
  }

  function synchroniseDepuisLeHash(): void {
    const hash = window.location.hash.substring(1);
    if (estUneCategorie(hash)) {
      categorieActive = hash;
    }
  }

  onMount(() => {
    synchroniseDepuisLeHash();
    window.addEventListener('hashchange', synchroniseDepuisLeHash);
    return () =>
      window.removeEventListener('hashchange', synchroniseDepuisLeHash);
  });
</script>

<section class="test-metier">
  <dsfr-container>
    <div class="test-metier-encart">
      <div class="test-metier-contenu">
        <dsfr-badge label="2 minutes" accent="green-bourgeon"></dsfr-badge>

        <h2 class="test-metier-titre fr-h1">
          Quels métiers cyber sont faits pour toi&nbsp;?
        </h2>
        <p class="test-metier-description">
          Réponds spontanément à 5 questions sur ta façon de penser et d'agir au
          quotidien. À la fin, on te montrera le profil qui te correspond le
          mieux.
        </p>

        <dsfr-button
          label="Démarrer le test"
          markup="a"
          href="#je-me-repere"
          size="lg"
        ></dsfr-button>
      </div>

      <div class="test-metier-illustration">
        <img
          src="/assets/images/les-metiers/illustration-test-metiers-cyber.avif"
          alt=""
        />
      </div>
    </div>
  </dsfr-container>
</section>

<section class="onisep">
  <dsfr-container>
    <lab-anssi-fonctionnalites
      titre="Découvre la cyber avec celles et ceux qui la font"
      description="Avec le Zoom «&nbsp;Les métiers de la cybersécurité&nbsp;» de l'Onisep, rencontre 20 pros et découvre les métiers de la cyber à travers leurs expériences et leurs conseils."
      fonctionnalites={fonctionnalitesOnisep}
      avec-cta
    >
      <div slot="media" class="onisep-media">
        <img
          src="/assets/images/les-metiers/illustration-brochure-onisep.avif"
          alt=""
        />
        <dsfr-link label="Consulter le Zoom" size="sm" href="#" blank
        ></dsfr-link>
      </div>
      <div slot="cta" class="onisep-cta">
        <dsfr-button
          label="Découvrir les 20 portraits"
          kind="primary"
          size="lg"
          has-icon
          markup="a"
          href="https://www.onisep.fr/les-metiers-de-la-cybersecurite"
          icon="arrow-right-line"
          icon-place="right"
        ></dsfr-button>
        <dsfr-button
          label="Voir le dossier en ligne"
          kind="tertiary-no-outline"
          markup="a"
          href="https://www.onisep.fr/les-metiers-de-la-cybersecurite"
          target="_blank"
        ></dsfr-button>
      </div>
    </lab-anssi-fonctionnalites>
  </dsfr-container>
</section>

<section class="par-ou-commencer">
  <dsfr-container>
    <h2 class="par-ou-commencer-titre fr-h2">Par où commencer&nbsp;?</h2>

    <lab-anssi-filtres
      type="liens"
      elements={filtresCategories}
      elementActif={categorieActive}
    ></lab-anssi-filtres>
  </dsfr-container>

  {#if categorieActive === 'je-me-repere'}
    <SectionJeMeRepere />
  {:else if categorieActive === 'j-explore'}
    <SectionJExplore />
  {:else if categorieActive === 'j-ecoute-les-pros'}
    <SectionJEcouteLesPros />
  {:else if categorieActive === 'je-trace-ma-route'}
    <SectionJeTraceMaRoute />
  {/if}
</section>

<section class="profils-feminins">
  <dsfr-container>
    <dsfr-card
      title="La cyber a besoin de toutes et de tous"
      markup="h2"
      has-description
      description="17 % de femmes dans le secteur en 2024, contre 11 % en 2021 : ça progresse, mais il reste de la place. Parmi les vingt pros rencontrés par l'Onisep, dix sont des femmes : cryptologue, hackeuse éthique, gestionnaire de crise, analyste forensique dans les armées… Et tous les profils sont attendus, techniques ou non."
      has-buttons
      variations="no-background"
      size="lg"
      horizontal
      horizontal-proportion="tier"
      no-link
      src="/assets/images/les-metiers/illustration-femme-cheveux-bleus-veste-orange.avif"
    >
      <dsfr-button
        slot="buttonsgroup"
        label="Découvrir les portraits féminins"
        markup="a"
        href="#j-ecoute-les-pros"
        kind="secondary"
      ></dsfr-button>
    </dsfr-card>
  </dsfr-container>
</section>

<section class="recrutements">
  <dsfr-container>
    <div class="recrutements-grille">
      <div class="recrutements-intro">
        <h2 class="recrutements-titre fr-h2">La cyber recrute</h2>
        <p>
          Les profils techniques sont nombreux, mais le secteur a aussi besoin
          de juristes, de formateurs, de communicants ou de commerciaux.
        </p>
        <p>
          Et il n'y a pas que les bac + 5&nbsp;: les diplômés de bac + 2 et bac
          + 3 sont tout autant recherchés.
        </p>
        <dsfr-link
          label="Voir les offres d'emploi sur Campus Cyber"
          href="https://campuscyber.fr/emploi"
          size="md"
          blank
        ></dsfr-link>
      </div>

      <div class="recrutements-chiffres">
        <p class="recrutements-chapeau">
          Entreprises, hôpitaux, collectivités, armées, administrations&nbsp;:
          toutes les organisations ont besoin de spécialistes pour se protéger.
        </p>

        <div class="recrutements-cartes">
          <dsfr-card
            title="23 182"
            has-description
            description="offres d'emploi en 2024, soit + 49% en 5 ans"
            has-detail-end
            detail-end="Source : Observatoire des métiers de la cybersécurité 2025"
            size="sm"
            no-link
          ></dsfr-card>

          <dsfr-card
            title="77 %"
            has-description
            description="des offres d'emploi proposent un CDI"
            has-detail-end
            detail-end="Source : Observatoire des métiers de la cybersécurité 2025"
            size="sm"
            no-link
          ></dsfr-card>

          <dsfr-card
            title="17 %"
            has-description
            description="offres d'emploi en cybersécurité en 2024, soit + 49% en 5 ans"
            has-detail-end
            detail-end="Source : Cyberscope 2024"
            size="sm"
            no-link
          ></dsfr-card>

          <dsfr-card
            title="40 000 €"
            has-description
            description="brut par an : le salaire moyen dans la cybersécurité"
            has-detail-end
            detail-end="Source : Campus Cyber Évolution 2025"
            size="sm"
            no-link
          ></dsfr-card>
        </div>

        <p class="recrutements-source fr-text--xs">
          Sources&nbsp;: Chiffres repris du Zoom Onisep "Les métiers de la
          cybersécurité" (2026)
        </p>
      </div>
    </div>
  </dsfr-container>
</section>

<section class="bloc-fin-de-page">
  <dsfr-container>
    <div class="bloc-fin-de-page-grille">
      <dsfr-card
        title="Envie de passer à la pratique ?"
        markup="h2"
        has-description
        description="Pas besoin d'attendre le diplôme pour commencer. Teste tes connaissances avec Pix, entraîne-toi sur de vrais challenges et mesure-toi aux autres en compétition."
        size="md"
        no-link
        horizontal
        horizontal-proportion="tier"
        has-links
        src="/assets/images/les-metiers/illustration-pix-score-115-1024.avif"
      >
        <dsfr-link
          label="Accéder à la plateforme Pix"
          size="md"
          href="https://pix.fr"
          target="_blank"
          has-icon
          icon="external-link-line"
          icon-place="right"
          slot="linksgroup"
          blank
        ></dsfr-link>
      </dsfr-card>

      <dsfr-card
        title="Vous êtes enseignant(e) ?"
        markup="h2"
        has-description
        description="Ces contenus s'utilisent en classe, pour la découverte des métiers au collège comme pour l'accompagnement à l'orientation au lycée : six affiches à imprimer, le Zoom Onisep à télécharger, des témoignages vidéo à projeter, le Panorama des métiers de l'ANSSI pour aller plus loin. Retrouvez tout cela, avec CyberEnJeux et l'Opération Cactus, dans le catalogue de ressources."
        size="md"
        no-link
        horizontal
        horizontal-proportion="tier"
        has-links
      >
        <dsfr-link
          label="Voir le catalogue enseignants"
          size="md"
          href="/selection-enseignants"
          has-icon
          icon="arrow-right-line"
          icon-place="right"
          slot="linksgroup"
        ></dsfr-link>
      </dsfr-card>
    </div>

    <dsfr-link
      class="lien-haut-de-page"
      label="Haut de page"
      href="#"
      has-icon
      icon="arrow-up-line"
      icon-place="left"
      size="sm"
    ></dsfr-link>
  </dsfr-container>
</section>
