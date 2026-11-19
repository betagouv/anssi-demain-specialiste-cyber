<script lang="ts">
  import { clic } from '../actions.svelte';

  type Question = {
    question: string;
    options: string[];
    reponse: number;
    explication: string;
  };

  type Palier = {
    titre: string;
    description: string;
  };

  const questions: Question[] = [
    {
      question: 'Une photo envoyée dans un message fait partie de quelle couche du cyberespace\u00A0?',
      options: ['La couche matérielle', 'La couche logicielle', 'La couche sémantique'],
      reponse: 2,
      explication:
        'La couche sémantique regroupe les informations\u00A0: photos, vidéos, mails, messages… Le matériel, ce sont les câbles et les appareils\u00A0; le logiciel, ce sont les systèmes et les applications.',
    },
    {
      question: 'Quelqu’un ouvre ton téléphone et lit tes messages. Quelle propriété est atteinte\u00A0?',
      options: ['La disponibilité', 'L’intégrité', 'La confidentialité'],
      reponse: 2,
      explication:
        'La confidentialité garantit que seules les personnes autorisées accèdent aux données. Ici, quelqu’un qui n’en avait pas le droit a pu les lire.',
    },
    {
      question: 'Comment appelle-t-on un hacker qui teste la sécurité avec autorisation\u00A0?',
      options: ['Un hacker éthique', 'Un script-kiddie', 'Un hacktiviste'],
      reponse: 0,
      explication:
        'Les hackers éthiques testent la sécurité avec autorisation pour aider à mieux protéger les systèmes. Les hackers ne sont pas forcément des pirates\u00A0!',
    },
    {
      question: 'Tu reçois un faux message imitant l’identité de ton collège. Comment s’appelle cette attaque\u00A0?',
      options: ['Un déni de service', 'Une tentative d’hameçonnage', 'Un rançongiciel'],
      reponse: 1,
      explication:
        'Un faux message qui se fait passer pour une personne ou une organisation de confiance afin de te faire cliquer sur un lien, c’est de l’hameçonnage (phishing). C’est une attaque par le vecteur humain.',
    },
    {
      question: 'Choisir un mot de passe long et utiliser l’authentification multifacteur, c’est surtout\u00A0:',
      options: ['Prévenir', 'Détecter', 'Réagir'],
      reponse: 0,
      explication:
        'Ces mesures de sécurité réduisent le risque qu’une cyberattaque réussisse\u00A0: c’est de la prévention.',
    },
    {
      question: 'De combien de places Jules César décalait-il l’alphabet pour protéger ses messages\u00A0?',
      options: ['1 place', '3 places', '10 places'],
      reponse: 1,
      explication:
        'Dans le chiffre de César, chaque lettre est décalée de trois places dans l’alphabet. Le décalage est la clé.',
    },
    {
      question: 'Où faut-il télécharger une application\u00A0?',
      options: ['Sur n’importe quel site', 'Sur une boutique officielle', 'Sur un lien reçu par message'],
      reponse: 1,
      explication:
        'N’utilise que des logiciels officiels et à jour, téléchargés depuis les boutiques officielles\u00A0: les fausses applications peuvent cacher des virus.',
    },
    {
      question: 'On peut faire ce qu’on veut sur internet\u00A0?',
      options: [
        'Oui, personne ne peut savoir qui tu es',
        'Oui, tant qu’on ne casse rien',
        'Non, internet est aussi encadré par des lois',
      ],
      reponse: 2,
      explication:
        'Les usages numériques sont régis par des règles. Par exemple, s’introduire dans un compte ou un système sans autorisation, même «\u00A0pour voir\u00A0», est un délit.',
    },
  ];

  function palierPourScore(score: number): Palier {
    if (score >= 7)
      return {
        titre: 'Impressionnant\u00A0!',
        description: 'Tu as déjà l’esprit d’un futur spécialiste. Passe à la pratique avec des challenges.',
      };
    if (score >= 5)
      return {
        titre: 'Très bien\u00A0! Tu maîtrises l’essentiel.',
        description: 'Le livret te permettra d’approfondir les points restants.',
      };
    return {
      titre: 'Et si tu retentais\u00A0?',
      description: 'Parcours le livret puis retente le quiz\u00A0: tu progresseras vite.',
    };
  }

  function melangerIndices(n: number): number[] {
    const indices = Array.from({ length: n }, (_, i) => i);

    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    return indices;
  }

  function genererOrdres(): number[][] {
    return questions.map((q) => melangerIndices(q.options.length));
  }

  let questionCourante = $state(0);
  let score = $state(0);
  let reponseChoisie: number | null = $state(null);
  let estCorrige = $state(false);
  let estTermine = $state(false);
  let ordreOptions: number[][] = $state(genererOrdres());

  let estDerniereQuestion = $derived(questionCourante === questions.length - 1);

  let estBonneReponse = $derived(reponseChoisie === questions[questionCourante].reponse);

  let palier = $derived(palierPourScore(score));

  function choisirReponse(index: number) {
    if (estCorrige) return;
    reponseChoisie = index;
    estCorrige = true;
    if (index === questions[questionCourante].reponse) {
      score++;
    }
  }

  function questionSuivante() {
    if (estDerniereQuestion) {
      estTermine = true;
    } else {
      questionCourante++;
      reponseChoisie = null;
      estCorrige = false;
    }
  }

  function recommencer() {
    questionCourante = 0;
    score = 0;
    reponseChoisie = null;
    estCorrige = false;
    estTermine = false;
    ordreOptions = genererOrdres();
  }
</script>

<section id="quiz">
  <dsfr-container>
    <div class="entete-section">
      <h2 class="entete-titre fr-h1">Qu'as-tu retenu&nbsp;?</h2>
      <p class="entete-chapeau texte-standard-md">8 questions. Pas de stress&nbsp;: chaque réponse est expliquée.</p>
    </div>

    <div class="quiz" aria-live="polite">
      {#if !estTermine}
        <dsfr-stepper
          title={`Question ${questionCourante + 1}`}
          current-step={questionCourante + 1}
          step-count={questions.length}
          hide-details
          level={3}
        ></dsfr-stepper>

        <p class="enonce">{questions[questionCourante].question}</p>

        {#key questionCourante}
          <div class="options">
            {#each ordreOptions[questionCourante] as indexOriginal}
              <div class="option-radio">
                <dsfr-radio
                  id={`quiz-q${questionCourante}-opt${indexOriginal}`}
                  name={`quiz-question-${questionCourante}`}
                  label={questions[questionCourante].options[indexOriginal]}
                  value={indexOriginal.toString()}
                  rich
                  disabled={estCorrige && reponseChoisie !== indexOriginal}
                  onvaluechanged={() => choisirReponse(indexOriginal)}
                ></dsfr-radio>
              </div>
            {/each}
          </div>
        {/key}

        {#if estCorrige}
          <dsfr-alert
            title={estBonneReponse ? 'Bravo !' : 'Pas tout à fait.'}
            type={estBonneReponse ? 'success' : 'error'}
            has-description
            text={questions[questionCourante].explication}
            size="sm"
          ></dsfr-alert>
          <div class="navigation">
            <dsfr-button
              label={estDerniereQuestion ? 'Voir mon résultat' : 'Question suivante'}
              kind="primary"
              use:clic={questionSuivante}
            ></dsfr-button>
          </div>
        {/if}
      {:else}
        <div class="resultat">
          <p class="label-score"><strong>Ton score</strong></p>
          <p class="score">{score}/{questions.length}</p>
          <p class="palier-titre fr-text--lead"><strong>{palier.titre}</strong></p>
          <p class="palier-description">{palier.description}</p>
          <div class="actions">
            <dsfr-button
              label="S'entraîner en ligne"
              kind="primary"
              markup="a"
              href="https://demainspecialiste.cyber.gouv.fr/"
              hasIcon="true"
              icon="arrow-right-line"
              iconPlace="right"
            ></dsfr-button>
            <dsfr-button label="Recommencer" kind="secondary" use:clic={recommencer}></dsfr-button>
          </div>
        </div>
      {/if}
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  dsfr-container {
    padding-block: 4.5rem;
  }

  .entete-section {
    margin-block-end: 3rem;
  }

  .quiz {
    background-color: var(--background-alt-blue-france);
    padding: 3.5rem 1.5rem;

    @include a-partir-de(lg) {
      max-width: taille-pour-colonnes(8);
      margin-inline: auto;
    }
  }

  .enonce {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    margin-block: 0 1.25rem;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  dsfr-alert {
    margin-block-start: 1.25rem;
  }

  .navigation {
    margin-block-start: 1.25rem;
    display: flex;
    justify-content: flex-start;
  }

  .resultat {
    text-align: center;
  }

  .label-score {
    margin-block-end: 2rem;
  }

  .score {
    font-size: 4.5rem;
    font-weight: 700;
    color: var(--text-title-blue-france);
    line-height: 5rem;
    margin-block-end: 3rem;
  }

  .palier-titre,
  .palier-description {
    margin-block-end: 1.5rem;
  }

  .palier-description {
    color: var(--text-default-grey);
  }

  .actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-block-start: 2rem;
  }
</style>
