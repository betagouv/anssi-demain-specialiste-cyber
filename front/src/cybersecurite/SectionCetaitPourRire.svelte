<script lang="ts">
  type Accordeon = {
    id: string;
    label: string;
    contenu: string[];
  };

  type Carte = {
    titre: string;
    description: string;
  };

  const cartes: Carte[] = [
    {
      titre: 'Devenir hacker éthique',
      description: `Comprendre comment on attaque pour mieux défendre, c'est le cœur des métiers de la cybersécurité. La différence entre un pirate et un hacker éthique tient en un mot\u00A0: l'autorisation. Les challenges de type CTF, les compétitions comme Passe ton Hack d'abord ou les programmes de recherche de failles encadrés te permettent de tester tes compétences en toute légalité, et peuvent même t'ouvrir des portes.`,
    },
    {
      titre: 'Prévenir un adulte',
      description: `Parles-en à un professeur ou au référent numérique de ton établissement, qui la signalera. C'est la divulgation responsable\u00A0: exactement ce que font les hackers éthiques.`,
    },
  ];

  const accordeons: Accordeon[] = [
    {
      id: 'loi-1',
      label: `« J'ai juste utilisé des identifiants qui traînaient sur un groupe. »`,
      contenu: [
        `<strong>Accès frauduleux à un système (art. 323-1 du Code pénal).</strong>`,
        `Jusqu'à 3 ans de prison et 100\u00A0000\u00A0€ d'amende, même sans rien casser. La tentative est punie pareil.`,
      ],
    },
    {
      id: 'loi-2',
      label: `«\u00A0J'ai juste changé un numéro dans l'adresse de la page et je suis tombé sur le bulletin d'un autre élève. Si c'était mal protégé, c'est leur faute.\u00A0»`,
      contenu: [
        `Le site a une faille (on l'appelle IDOR), mais ça ne t'autorise à rien. Continuer à naviguer en sachant que tu n'as pas le droit, et récupérer les données, c'est un maintien frauduleux dans un système (art. 323-1), voire une extraction de données (art. 323-3).`,
        `La justice a déjà condamné quelqu'un qui avait téléchargé des documents laissés sans protection (Cour de cassation, 2015).`,
        `<strong>Le bon réflexe\u00A0: fermer la page et prévenir un adulte.</strong>`,
      ],
    },
    {
      id: 'loi-3',
      label: `«\u00A0J'ai payé 10 € pour faire tomber le serveur, c'est pas moi qui l'ai fait.\u00A0»`,
      contenu: [
        `<strong>Entrave au fonctionnement d'un système (art. 323-2).</strong>`,
        `Jusqu'à 5 ans et 150\u00A0000\u00A0€.`,
        `Commander une attaque, c'est en être l'auteur. Les polices européennes identifient régulièrement les clients de ces services.`,
      ],
    },
    {
      id: 'loi-4',
      label: `«\u00A0J'ai juste changé deux notes sur l'ENT.\u00A0»`,
      contenu: [
        `<strong>Modification frauduleuse de données (art. 323-3).</strong>`,
        `Jusqu'à 5 ans et 150 000\u00A0€.`,
      ],
    },
    {
      id: 'loi-5',
      label: `«\u00A0C'était une fausse alerte, personne n'a été blessé.\u00A0»`,
      contenu: [
        `<strong>Fausse alerte (art. 322-14).</strong>`,
        `Jusqu'à 2 ans et 30\u00A0000\u00A0€, en plus des poursuites pour le piratage du compte utilisé.`,
      ],
    },
    {
      id: 'loi-6',
      label: `«\u00A0Je revends juste des comptes et des fichiers que d'autres ont volés.\u00A0»`,
      contenu: [
        `Recel de données volées, souvent en lien avec des réseaux criminels qui recrutent des jeunes pour faire le sale travail. Ce sont eux qui sont identifiés en premier.`,
      ],
    },
    {
      id: 'loi-7',
      label: `«\u00A0J'ai juste téléchargé des outils de hacking.\u00A0»`,
      contenu: [
        `Détenir ou diffuser des outils d'attaque sans motif légitime est puni (art. 323-3-1).`,
        `S'entraîner sur des plateformes prévues pour ça, dans un cadre de formation, est un motif légitime.`,
      ],
    },
  ];
</script>

<section id="pour-rire">
  <dsfr-container>
    <div class="entete-section">
      <h2 class="entete-titre fr-h1">«&nbsp;C'était pour rire&nbsp;»</h2>
      <p class="entete-chapeau texte-standard-md">
        Faire tomber le serveur d'un jeu, se connecter avec le mot de passe d'un prof trouvé en ligne,
        «&nbsp;tester&nbsp;» l'ENT… Pour certains, c'est une blague ou un défi. Pour la loi, ce sont des délits. Et être
        mineur ne protège pas des poursuites.
      </p>
    </div>

    <div class="conteneur">
      <div class="accordeons">
        <div class="intro">
          <p><strong>Derrière ces phrases, des risques bien réels.</strong></p>
          <p class="mention">Déroule une phrase pour découvrir ce que dit la loi.</p>
        </div>

        {#each accordeons as accordeon, index}
          <dsfr-accordion id={accordeon.id} label={accordeon.label} is-expanded={index === 0 ? true : undefined}>
            <div class="contenu">
              <dsfr-badge label="Ce que dit la loi" type="status" status="info" size="sm"></dsfr-badge>

              {#each accordeon.contenu as paragraphe}
                <p>{@html paragraphe}</p>
              {/each}
            </div>
          </dsfr-accordion>
        {/each}

        <p class="mention fr-text--xs">
          Peines maximales encourues par un majeur. Elles sont plus lourdes si des données sont volées ou si le système
          appartient à l'État.
        </p>
      </div>

      <div class="bon-a-savoir">
        <h3 class="fr-h6">Bon à savoir</h3>
        <dsfr-highlight>
          <p slot="text">
            La loi s'applique aussi aux mineurs&nbsp;: dès 13 ans, on peut être poursuivi, avec des peines en principe
            réduites de moitié et une préférence pour les mesures éducatives. Dans la pratique, une affaire peut tout de
            même avoir des suites concrètes&nbsp;: garde à vue, saisie du matériel, sanction dans l'établissement,
            dommages à rembourser par les parents. Une condamnation peut aussi compliquer l'accès aux métiers de la
            cyber, qui demandent une enquête de sécurité.
          </p>
        </dsfr-highlight>
      </div>

      <div class="faille">
        <h3 class="fr-h5">Tu as trouvé une faille&nbsp;?</h3>

        <p class="texte-standard-md">
          Dans l'ENT (espace numérique de travail), le site du lycée ou un jeu, par exemple en voyant par hasard les
          données d'un autre&nbsp;: ne va pas plus loin, ne télécharge rien et ne la partage pas sur un groupe.
        </p>
        <p class="texte-standard-md"><strong>Tu as alors deux possibilités&nbsp;:</strong></p>

        <div class="cartes">
          {#each cartes as carte}
            <dsfr-card title={carte.titre} has-description description={carte.description} no-link size="md" horizontal
            ></dsfr-card>
          {/each}
        </div>
      </div>
    </div>
  </dsfr-container>
</section>

<style lang="scss">
  @use '../style/points-de-rupture' as *;
  @use '../style/grille' as *;

  section {
    background-color: var(--background-alt-beige-gris-galet);
    padding-block: 4.5rem;
  }

  .entete-section {
    margin-block-end: 3rem;
  }

  .conteneur {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @include a-partir-de(lg) {
      max-width: taille-pour-colonnes(8);
      margin-inline: auto;
    }
  }

  .intro {
    margin-block-end: 1.5rem;
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      margin-block: 0;
    }
  }

  .mention {
    color: var(--text-mention-grey);
    margin-block: 1.5rem 0;
  }

  .cartes {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @include a-partir-de(md) {
      flex-direction: row;

      & > * {
        flex: 1;
      }
    }
  }
</style>
