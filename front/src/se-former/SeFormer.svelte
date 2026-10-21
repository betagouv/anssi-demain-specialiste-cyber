<svelte:options
  customElement={{
    tag: 'dsc-se-former',
    shadow: 'none',
  }}
/>

<script lang="ts">
  import { onMount } from 'svelte';
  import '../selections/Selection.svelte';
  import IconeJeMEntraine from '../../statique/assets/images/se-former/icone-manette-jeux-videos.svg?raw';
  import IconeJeMeForme from '../../statique/assets/images/se-former/icone-personnage-devant-ordinateur.svg?raw';
  import IconeJeMeTeste from '../../statique/assets/images/se-former/icone-rond-avec-coche-rouge.svg?raw';
  import IconeJeMeMesure from '../../statique/assets/images/se-former/icone-trophee.svg?raw';
  import SectionJeMeForme from './SectionJeMeForme.svelte';
  import SectionJeMeTeste from './SectionJeMeTeste.svelte';

  type Categorie =
    'je-me-teste' | 'je-me-forme' | 'je-mentraine' | 'je-me-mesure';

  type Fonctionnalite = {
    titre: string;
    description: string;
  };

  type ElementFiltre = {
    icone: string;
    libelle: string;
    description: string;
    valeur: Categorie;
    href: string;
  };

  let categorieActive: Categorie = $state('je-me-teste');

  const fonctionnalitesPix: Fonctionnalite[] = [
    {
      titre: 'Des parcours adaptés à chacun',
      description:
        'Débutant(e) ou futur(e) pro, choisis ton parcours, relève les défis et développe tes compétences !',
    },
    {
      titre: 'Des défis inspirés de cas concrets',
      description:
        "Mets tes connaissances à l'épreuve avec des situations inspirées du terrain et développe les bons réflexes face aux cybermenaces.",
    },
    {
      titre: 'Des tutos pour progresser',
      description:
        'Découvre des tutoriels simples et pratiques pour approfondir tes connaissances et maîtriser progressivement les outils et méthodes de la cybersécurité.',
    },
  ];

  const filtresCategories: ElementFiltre[] = [
    {
      icone: IconeJeMeTeste,
      libelle: '1. Je me teste',
      description:
        'Fais le point sur tes connaissances cyber avec les parcours Pix.',
      valeur: 'je-me-teste',
      href: '#je-me-teste',
    },
    {
      icone: IconeJeMeForme,
      libelle: '2. Je me forme',
      description:
        'Suis une formation en ligne gratuite pour comprendre les menaces et les',
      valeur: 'je-me-forme',
      href: '#je-me-forme',
    },
    {
      icone: IconeJeMEntraine,
      libelle: "3. Je m'entraîne",
      description:
        'Résous des challenges quand tu veux, seul(e) ou avec ta classe.',
      valeur: 'je-mentraine',
      href: '#je-mentraine',
    },
    {
      icone: IconeJeMeMesure,
      libelle: '4. Je me mesure',
      description:
        "Rejoins une compétition et affronte d'autres équipes partout en France.",
      valeur: 'je-me-mesure',
      href: '#je-me-mesure',
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

<section class="introduction">
  <dsfr-container>
    <article class="introduction-contenu">
      <h2 class="introduction-titre fr-h1">
        La cyber, ça commence maintenant&nbsp;!
      </h2>

      <p class="texte-article-lg">
        Mots de passe, phishing, réseaux, cryptographie… <strong>
          La cybersécurité, ça s'apprend surtout en pratiquant.
        </strong>
        Les plateformes rassemblées ici sont proposées ou recommandées par des acteurs
        publics de la cyber, accessibles en ligne et pour la plupart gratuites.
      </p>
      <p class="texte-article-lg">
        <strong>
          Simple curiosité ou vraie envie d'en faire ton métier&nbsp;: choisis
          ton point de départ et avance à ton rythme.
        </strong>
      </p>
    </article>
  </dsfr-container>
</section>

<section class="fonctionnalites">
  <dsfr-container>
    <lab-anssi-fonctionnalites
      titre="Relève le défi cyber avec Pix&nbsp;!"
      description="Phishing, arnaques, mots de passe… Les cybermenaces font partie de notre quotidien. Avec Pix, apprends à les reconnaître, à déjouer les pièges et à adopter les bons réflexes."
      fonctionnalites={fonctionnalitesPix}
      avec-cta
      image-placeholder="/assets/images/se-former/illustration-pix-3-amis-avec-ordinateur.avif"
    >
      <dsfr-button
        slot="cta"
        label="Découvrir les parcours Pix"
        markup="a"
        href="#je-me-teste"
      ></dsfr-button>
    </lab-anssi-fonctionnalites>
  </dsfr-container>
</section>

<section class="commencer">
  <dsfr-container>
    <h2 class="commencer-titre fr-h1">Par où commencer&nbsp;?</h2>

    <lab-anssi-filtres
      type="liens"
      elements={filtresCategories}
      elementActif={categorieActive}
    ></lab-anssi-filtres>
  </dsfr-container>

  {#if categorieActive === 'je-me-teste'}
    <SectionJeMeTeste />
  {:else if categorieActive === 'je-me-forme'}
    <SectionJeMeForme />
  {:else if categorieActive === 'je-mentraine'}
    <dsfr-container id="je-mentraine">
      <h3 class="commencer-sous-titre fr-h2">Passe à la pratique</h3>
      <p class="texte-article-lg">
        Des challenges disponibles toute l'année&nbsp;: crypto, réseau, web,
        OSINT, stéganographie… Commence en douceur, puis monte en niveau.
      </p>
    </dsfr-container>
    <dsc-selection cible="entrainement"></dsc-selection>
  {:else if categorieActive === 'je-me-mesure'}
    <dsfr-container id="je-me-mesure">
      <h3 class="commencer-sous-titre fr-h2">
        Prêt(e) pour la compétition&nbsp;?
      </h3>
      <p class="texte-article-lg">
        Avec ta classe, en solo ou près de chez toi&nbsp;: choisis le challenge
        qui te correspond et vois où tu te situes.
      </p>
    </dsfr-container>
    <dsc-selection cible="mesure"></dsc-selection>
  {/if}
</section>

<section class="metiers">
  <dsfr-container>
    <div class="metiers-grille">
      <div class="metiers-cartes">
        <dsfr-card
          title="Hacker, oui. Mais dans les règles !"
          hasDescription
          description="Tous les challenges de cette page se déroulent dans des environnements conçus pour ça. S'introduire dans un site, un réseau ou un compte sans autorisation, même « juste pour voir », c'est une infraction pénale (article 323-1 du Code pénal). Un hacker éthique agit toujours avec une autorisation."
          hasButtons
          variations="no-border"
          size="md"
          horizontal
          no-link
        >
          <dsfr-button
            slot="buttonsgroup"
            label="Découvrir le métier de hacker éthique"
            markup="a"
            href="/metiers/1"
            kind="secondary"
          ></dsfr-button>
        </dsfr-card>

        <dsfr-card
          title="Les métiers de la cybersécurité recrutent"
          hasDescription
          description="Analyste SOC, pentester, cryptologue, RSSI… Découvre à quoi ressemble leur quotidien et quelles formations y mènent."
          hasButtons
          variations="no-border"
          size="md"
          horizontal
          no-link
        >
          <dsfr-button
            slot="buttonsgroup"
            label="Explorer les métiers cyber"
            markup="a"
            href="/metiers"
            kind="secondary"
          ></dsfr-button>
        </dsfr-card>
      </div>

      <div class="metiers-illustration">
        <img
          src="/assets/images/se-former/illustration-fond-metier-hacker-ethique.avif"
          alt=""
        />
      </div>
    </div>
  </dsfr-container>
</section>

<section class="enseignant">
  <dsfr-container>
    <dsfr-card
      title="Vous êtes enseignant(e) ?"
      has-description
      description="Ces dispositifs s'utilisent aussi en classe : campagnes Pix pour suivre la progression de vos élèves, challenges de l'AEIF et Cyberscol dès le collège, Root-Me PRO EDU pour vos sections NSI, CIEL ou SIO, inscription de vos équipes à Passe Ton Hack d'Abord. Pour vous former vous-même, CyberClass et SensCyber sont faits pour vous. Retrouvez tout cela, avec CyberEnJeux et l'Opération Cactus, dans le catalogue de ressources."
      href="/selection-enseignants"
      enlarge
      size="lg"
      has-links
      no-icon
    >
      <dsfr-link
        label="Accéder au catalogue de ressources enseignants"
        size="md"
        href="/selection-enseignants"
        has-icon
        icon="arrow-right-line"
        icon-place="right"
        slot="linksgroup"
      ></dsfr-link>
    </dsfr-card>
  </dsfr-container>
</section>
