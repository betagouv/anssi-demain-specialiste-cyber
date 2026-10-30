<script lang="ts">
  type Option = {
    libelle: string;
    points: number[];
  };

  type Question = {
    titre: string;
    texte: string;
    options: Option[];
  };

  type Profil = {
    nom: string;
    description: string;
    formations: string[];
  };

  type ProfilClasse = Profil & {
    index: number;
    points: number;
    ratio: number;
    pourcentage: number;
  };

  type Etape = 'intro' | 'question' | 'resultat';

  const NOMBRE_PROFILS = 6;
  const ORDRE_DEPARTAGE = [1, 2, 3, 4, 0];
  const INDEX_Q5 = 4;
  const INDEX_CRYPTOLOGUE = 4;

  const questions: Question[] = [
    {
      titre: "Ta façon de t'organiser",
      texte: "Tu te sens le plus à l'aise dans des situations où…",
      options: [
        {
          libelle: 'Les choses sont bien organisées, bien cadrées',
          points: [1, 1, 0, 2, 3, 3],
        },
        {
          libelle: "Il faut s'adapter, improviser",
          points: [2, 2, 3, 0, 0, 0],
        },
      ],
    },
    {
      titre: 'Ta façon de résoudre un problème',
      texte: 'Ton ordinateur ne marche plus... Tu vas plutôt…',
      options: [
        {
          libelle: 'Te tourner tout de suite vers un(e) spécialiste',
          points: [3, 0, 0, 1, 0, 2],
        },
        {
          libelle:
            "Essayer de trouver par toi-même, et demander de l'aide si tu n'y arrives pas",
          points: [1, 2, 2, 3, 2, 1],
        },
        {
          libelle:
            'Le réparer tout seul, coûte que coûte, quitte à le démonter',
          points: [0, 3, 3, 1, 2, 0],
        },
      ],
    },
    {
      titre: 'Ta façon de développer une idée',
      texte: 'Quand tu penses avoir une bonne idée, tu préfères…',
      options: [
        {
          libelle: "En parler autour de toi pour inspirer d'autres personnes",
          points: [3, 0, 0, 1, 0, 2],
        },
        {
          libelle: 'Tester ton idée tout de suite pour voir si elle fonctionne',
          points: [1, 3, 3, 0, 1, 0],
        },
        {
          libelle: 'Creuser davantage pour être sûr(e) de toi',
          points: [0, 1, 1, 3, 3, 2],
        },
      ],
    },
    {
      titre: 'Ta façon de travailler en équipe',
      texte: 'Dans un travail de groupe, tu es plutôt celui ou celle qui…',
      options: [
        {
          libelle: 'Mène des recherches, partage ses résultats avec les autres',
          points: [0, 1, 1, 3, 3, 1],
        },
        {
          libelle:
            'Fait en sorte que tout le monde travaille bien ensemble et présente',
          points: [3, 1, 1, 0, 0, 3],
        },
        {
          libelle: 'Rédige, met en forme, crée les contenus nécessaires',
          points: [1, 3, 3, 1, 0, 1],
        },
      ],
    },
    {
      titre: "Ce qui t'intéresse le plus",
      texte:
        "À l'école, les matières où tu te sens le plus à l'aise (ou qui te donnent le plus envie) sont plutôt…",
      options: [
        {
          libelle: 'Français, histoire-géo, langues, philo',
          points: [2, 0, 0, 2, 0, 3],
        },
        {
          libelle: 'Maths, physique, informatique, techno',
          points: [0, 3, 3, 1, 3, 0],
        },
      ],
    },
  ];

  const profils: Profil[] = [
    {
      nom: 'Responsable cyber-sécurité',
      description:
        "Pilote la sécurité informatique d'une organisation. Il fixe les objectifs de cybersécurité, coordonne l'ensemble des services concernés et sensibilise les membres de son organisation aux bonnes pratiques de cybersécurité.",
      formations: ['Ingénieur', 'Master', 'spécialisation en cybersécurité'],
    },
    {
      nom: 'Hacker éthique / Pentester',
      description:
        "Recherche les failles de sécurité pour les corriger avant que des attaquants ne puissent les exploiter. Il cherche à comprendre le fonctionnement des systèmes informatiques au niveau technique, réalise des tests d'intrusion et réfléchit à comment améliorer la sécurité de ces systèmes.",
      formations: [
        'Licence',
        'Master',
        'Ingénieur',
        'spécialisation en cybersécurité',
      ],
    },
    {
      nom: 'Expert(e) cyberdéfense',
      description:
        "Porte secours aux personnes et aux organisations victimes de cyberattaques. Elle cherche à comprendre comment les attaquants sont parvenus à pénétrer un système pour mettre fin à l'attaque et revenir à une situation normale.",
      formations: ['Master', 'Ingénieur', 'spécialisation en cybersécurité'],
    },
    {
      nom: 'Analyste des cyber-menaces',
      description:
        "Apprend à connaître et à reconnaître les cyberattaques pour mieux s'en protéger. Il étudie les modes opératoires des attaquants, leurs cibles, leurs motivations pour détecter et anticiper de nouvelles attaques et y faire face.",
      formations: ['Licence', 'Master', 'spécialisation en cybersécurité'],
    },
    {
      nom: 'Cryptologue',
      description:
        "Protège les informations sensibles détenues par les organisations. Il conçoit des algorithmes de sécurité permettant de chiffrer les échanges d'informations numériques pour assurer leur confidentialité et leur intégrité.",
      formations: [
        'Ingénieur',
        'Master',
        'Doctorat / Post-doctorat',
        'spécialisation en cybersécurité',
      ],
    },
    {
      nom: 'Juriste cyber',
      description:
        "Aide à protéger et défendre juridiquement les organisations face aux menaces informatiques. Elle veille à l'application de la réglementation en matière de cybersécurité et conseille sur les mesures juridiques permettant de prévenir et de faire face aux cyberattaques.",
      formations: ['Master', 'spécialisation en cybersécurité'],
    },
  ];

  const maximaParProfil = Array.from({ length: NOMBRE_PROFILS }, (_, i) =>
    questions.reduce(
      (sum, q) => sum + Math.max(...q.options.map((o) => o.points[i])),
      0,
    ),
  );

  const INDEX_OPTION_MATHS = questions[INDEX_Q5].options.findIndex((o) =>
    o.libelle.startsWith('Maths'),
  );

  let etape: Etape = $state('intro');
  let questionCourante: number = $state(0);
  let reponses: (number | null)[] = $state([null, null, null, null, null]);
  let ordreOptions: number[][] = $state(creerOrdresOptions());
  let sectionEl: HTMLElement | undefined = $state();

  let questionActive = $derived(questions[questionCourante]);
  let radiosOptions = $derived(
    (ordreOptions[questionCourante] ?? []).map((indexSource, i) => ({
      id: `quiz-option-${questionCourante}-${i}`,
      label: questionActive.options[indexSource].libelle,
      value: indexSource.toString(),
    })),
  );
  let valeurSelectionnee = $derived(
    reponses[questionCourante] !== null
      ? reponses[questionCourante]!.toString()
      : '',
  );
  let estDerniereQuestion = $derived(questionCourante === questions.length - 1);
  let etapeSuivanteTitre = $derived(
    questionCourante < questions.length - 1
      ? questions[questionCourante + 1].titre
      : '',
  );
  let peutAvancer = $derived(reponses[questionCourante] !== null);
  let profilsResultat: ProfilClasse[] = $derived.by(() => {
    if (etape !== 'resultat') return [];
    return calculerProfilsAffiches();
  });

  function melangerIndices(taille: number): number[] {
    const indices = Array.from({ length: taille }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }

  function creerOrdresOptions(): number[][] {
    return questions.map((q) => melangerIndices(q.options.length));
  }

  function demarrerTest() {
    etape = 'question';
    questionCourante = 0;
    reponses = [null, null, null, null, null];
    ordreOptions = creerOrdresOptions();
    defilerVersSection();
  }

  function gereChangementReponse(e: CustomEvent<string>) {
    reponses[questionCourante] = parseInt(e.detail, 10);
  }

  function questionSuivante() {
    if (!peutAvancer) return;
    if (estDerniereQuestion) {
      etape = 'resultat';
      defilerVersSection();
    } else {
      questionCourante++;
    }
  }

  function questionPrecedente() {
    if (questionCourante > 0) questionCourante--;
  }

  function defilerVersSection() {
    sectionEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function classerProfils(): ProfilClasse[] {
    const resultats = profils.map((p, i) => {
      let pts = 0;
      questions.forEach((q, qi) => {
        if (reponses[qi] !== null) pts += q.options[reponses[qi]!].points[i];
      });
      const ratio = pts / maximaParProfil[i];
      return {
        ...p,
        index: i,
        points: pts,
        ratio,
        pourcentage: Math.round(ratio * 100),
      };
    });

    const pointsPourQuestion = (r: ProfilClasse, qi: number): number =>
      reponses[qi] === null
        ? 0
        : questions[qi].options[reponses[qi]!].points[r.index];

    return resultats.sort((a, b) => {
      if (Math.abs(b.ratio - a.ratio) > 1e-9) return b.ratio - a.ratio;
      for (const qi of ORDRE_DEPARTAGE) {
        const diff = pointsPourQuestion(b, qi) - pointsPourQuestion(a, qi);
        if (diff) return diff;
      }
      return a.index - b.index;
    });
  }

  function calculerProfilsAffiches(): ProfilClasse[] {
    let resultats = classerProfils().slice(0, 2);
    if (reponses[INDEX_Q5] !== INDEX_OPTION_MATHS) {
      resultats = resultats.filter((r) => r.index !== INDEX_CRYPTOLOGUE);
    }
    return resultats;
  }

  function handleActionKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      demarrerTest();
    }
  }
</script>

<section class="test-cyber" bind:this={sectionEl}>
  <dsfr-container>
    <div
      class={[
        'test-cyber-encart',
        etape !== 'intro' ? 'test-cyber-encart--test' : '',
      ]}
    >
      <div class="test-cyber-colonne-gauche">
        <div class="test-cyber-intro">
          {#if etape === 'intro'}
            <dsfr-badge
              label="2 minutes"
              type="accent"
              accent="green-bourgeon"
              size="md"
            ></dsfr-badge>
          {/if}

          <h2
            class={['test-cyber-titre', etape === 'intro' ? 'fr-h1' : 'fr-h3']}
          >
            Quels métiers cyber sont faits pour toi&nbsp;?
          </h2>

          <p
            class={[
              'test-cyber-description',
              etape === 'intro' ? 'fr-text--lead' : 'fr-text',
            ]}
          >
            Réponds spontanément à 5 questions sur ta façon de penser et d'agir
            au quotidien. À la fin, on te montrera le profil qui te correspond
            le mieux.
          </p>

          {#if etape === 'intro'}
            <dsfr-button
              label="Démarrer le test"
              size="lg"
              role="button"
              tabindex="0"
              onclick={demarrerTest}
              onkeydown={handleActionKeydown}
            ></dsfr-button>
          {/if}

          {#if etape === 'resultat'}
            <dsfr-button
              label="Refaire le test"
              kind="inverted-secondary"
              has-icon
              icon="refresh-line"
              role="button"
              tabindex="0"
              onclick={demarrerTest}
              onkeydown={handleActionKeydown}
            ></dsfr-button>
          {/if}
        </div>

        {#if etape !== 'intro'}
          <div class="test-cyber-illustration test-cyber-illustration--gauche">
            <img
              src="/assets/images/les-metiers/illustration-test-metiers-cyber-petit.avif"
              alt=""
            />
          </div>
        {/if}
      </div>

      {#if etape === 'intro'}
        <div class="test-cyber-illustration">
          <img
            src="/assets/images/les-metiers/illustration-test-metiers-cyber.avif"
            alt=""
          />
        </div>
      {:else}
        <div class="test-cyber-colonne-droite">
          <div class="test-cyber-panneau-quiz">
            {#if etape === 'question'}
              {#key questionCourante}
                <dsfr-stepper
                  title={questionActive.titre}
                  current-step={questionCourante + 1}
                  step-count={questions.length}
                  next-step={etapeSuivanteTitre}
                  level={3}
                  hide-details
                ></dsfr-stepper>

                <dsfr-radios-group
                  id={`quiz-question-${questionCourante}`}
                  legend={questionActive.texte}
                  radios={radiosOptions}
                  name={`quiz-question-${questionCourante}`}
                  value={valeurSelectionnee}
                  onvaluechanged={gereChangementReponse}
                ></dsfr-radios-group>

                <div class="test-cyber-navigation">
                  {#if questionCourante > 0}
                    <dsfr-button
                      label="Précédent"
                      kind="secondary"
                      role="button"
                      tabindex="0"
                      onclick={questionPrecedente}
                      onkeydown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          questionPrecedente();
                        }
                      }}
                    ></dsfr-button>
                  {/if}
                  <dsfr-button
                    label={estDerniereQuestion
                      ? 'Découvrir mon profil cyber'
                      : 'Question suivante'}
                    role="button"
                    tabindex={peutAvancer ? 0 : -1}
                    disabled={!peutAvancer || undefined}
                    onclick={questionSuivante}
                    onkeydown={(event: KeyboardEvent) => {
                      if (
                        (event.key === 'Enter' || event.key === ' ') &&
                        peutAvancer
                      ) {
                        event.preventDefault();
                        questionSuivante();
                      }
                    }}
                  ></dsfr-button>
                </div>
              {/key}
            {:else}
              <h3 class="test-cyber-resultat-titre fr-h4">
                {profilsResultat.length === 1
                  ? 'Voici le profil qui te correspond le mieux'
                  : 'Voici les 2 profils qui te correspondent le mieux'}
              </h3>

              <div
                class="test-cyber-resultat-conteneur"
                class:unique={profilsResultat.length === 1}
              >
                {#each profilsResultat as profil}
                  <dsfr-card
                    title={profil.nom}
                    markup="h4"
                    has-description
                    description={profil.description}
                    has-badge
                    has-detail-end
                    has-links
                    no-link
                    size="sm"
                  >
                    <dsfr-badge
                      slot="badgesgroup"
                      label="{profil.pourcentage}% de correspondance"
                      type="accent"
                      accent="green-emeraude"
                      size="sm"
                    ></dsfr-badge>

                    <div slot="contentend" class="test-cyber-profil-formation">
                      <p class="test-cyber-profil-formation-titre fr-text--xs">
                        Formation
                      </p>
                      <div class="test-cyber-profil-formation-tags">
                        {#each profil.formations as formation}
                          <dsfr-tag label={formation}></dsfr-tag>
                        {/each}
                      </div>
                    </div>

                    <dsfr-link
                      slot="linksgroup"
                      label="Découvrir le métier"
                      href="#j-ecoute-les-pros"
                      has-icon
                      icon="arrow-right-line"
                      icon-place="right"
                      size="md"
                    ></dsfr-link>
                  </dsfr-card>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../../src/style/points-de-rupture' as *;

  .test-cyber {
    padding-block: 4.5rem;
  }

  .test-cyber-encart {
    background-color: var(--pink-tuile-sun-425-moon-750);
    border-radius: 0.5rem;
    overflow: hidden;
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(lg) {
      grid-template-columns: 1fr 1fr;
    }

    &--test {
      padding: 2.5rem;

      @include a-partir-de(lg) {
        grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.8fr);
        align-items: stretch;
      }

      .test-cyber-intro {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 0;
        margin-block-end: 2rem;
      }

      .test-cyber-titre {
        margin-block: 0;
      }

      p.test-cyber-description {
        margin-block-end: 0;
      }
    }
  }

  .test-cyber-colonne-gauche {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .test-cyber-intro {
    padding: 2.5rem;
  }

  .test-cyber-titre {
    color: var(--text-inverted-grey);
    margin-block: 0.75rem 1.5rem;
  }

  .test-cyber-description {
    color: var(--background-alt-pink-tuile);
    margin-block-end: 0;

    &:not(:last-child) {
      margin-block-end: 2rem;
    }
  }

  .test-cyber-illustration {
    display: none;

    @include a-partir-de(lg) {
      display: block;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &--gauche {
      margin-block-start: auto;

      img {
        height: auto;
      }
    }
  }

  .test-cyber-panneau-quiz {
    background-color: var(--background-default-grey);
    padding: 2rem;
  }

  .test-cyber-navigation {
    display: flex;
    gap: 1rem;
    margin-block-start: 2rem;
  }

  .test-cyber-resultat-titre {
    margin-block-end: 1.5rem;
  }

  .test-cyber-resultat-conteneur {
    display: grid;
    gap: 1.5rem;

    @include a-partir-de(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    &.unique {
      grid-template-columns: 1fr;
      max-width: 520px;
    }
  }

  .test-cyber-profil-formation {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .test-cyber-profil-formation-titre {
    color: var(--text-mention-grey);
    font-weight: 700;
    text-transform: uppercase;
    margin-block-end: 0;
  }

  .test-cyber-profil-formation-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
