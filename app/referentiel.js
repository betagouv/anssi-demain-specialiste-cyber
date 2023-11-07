const donnees = {
  videosAgir: [{ idVideo: 1 }, { idVideo: 2 }],
  metiers: [
    {
      id: "rssi",
      idVideo: "Edouard",
      metier: "Responsable de la sécurité des systèmes d'information (RSSI)",
      identite: "Édouard",
      description:
        "Le Responsable de la sécurité des systèmes d’information (RSSI) assure le pilotage de la démarche de cybersécurité sur un périmètre de l’organisation (l'entreprise ou l'administration). Il définit ou décline, selon la taille de l’organisation, la politique de sécurité des systèmes d’information (prévention, protection, détection, capacité à s'adapter en cas de crise, remédiation) et veille à son application. Il assure un rôle de conseil, d’assistance, d’information, de formation et d’alerte, en particulier auprès des directeurs métiers et/ou de la direction de son périmètre.<br><br>Il s’assure de la mise en place des solutions et des processus opérationnels pour garantir la protection des données et le niveau de sécurité des systèmes d’information.",
      formation:
        "Formation : Bac + 5 avec une spécialisation en cybersécurité<br><br>Expérience professionnelle : supérieure à 5 ans dans le domaine de la cybersécurité",
      posture: [
        "Capacité d’influence",
        "Sens de l’intérêt général",
        "Management d’équipe",
        "Capacité de restitution au management",
        "Capacité à travailler en transverse au sein de l’organisation",
        "Capacité à résister à la pression",
        "Capacité d’appropriation des enjeux métiers",
      ],
      metiersProches: [
        "Directeur de la sécurité des systèmes d’information (DSSI)",
      ],
    },
    {
      id: "coordinatriceSecurite",
      idVideo: "Juliette",
      metier: "Coordinatrice sécurité",
      identite: "Juliette",
      description:
        "Le coordinateur sécurité assure un appui au pilotage des actions de sécurité des systèmes d'information (SI) sur un périmètre de l’organisation (sur une entité ou bien en lien avec une thématique : par exemple, coordination des actions de sécurité sur les environnements Cloud, coordination de la mise en conformité à une réglementation, etc.). Il apporte un support aux équipes opérationnelles pour la réalisation des actions de sécurité et assure le suivi des plans d’actions.",
      formation:
        "Formation : Bac + 3, dont une spécialisation en lien avec la cybersécurité",
      posture: [
        "Capacité de travail en équipe",
        "Pédagogie sur les sujets de cybersécurité",
      ],
      metiersProches: ["Relais cybersécurité"],
    },
    {
      id: "architecteSecurite",
      idVideo: "Sandra_x_Matthieu",
      metier: "Architecte sécurité",
      identite: "Sandra et Matthieu",
      description:
        "L’architecte sécurité des systèmes d'information (SI) s’assure que les choix techniques et technologiques des projets numériques et métiers respectent les exigences de sécurité de l’organisation. Il constitue l’autorité technique sur les architectures de sécurité, définit les modèles de sécurité et accompagne le développement des architectures de sécurité au sein du SI, en cohérence avec la stratégie numérique et les politiques de sécurité de l’organisation.",
      formation:
        "Formation : Bac +5, dont une spécialisation en cybersécurité<br><br>Métier accessible à partir d’une expérience préalable en architecture technique des systèmes d’information",
      posture: [
        "Capacité à travailler en transverse au sein de l’organisation",
        "Capacité à s’intégrer dans des réseaux pour pratiquer une veille technologique",
      ],
      metiersProches: ["Architecte Sécurité Informatique"],
    },
    {
      id: "cheffePentest",
      idVideo: "Julie",
      metier: "Cheffe d'équipe pentest",
      identite: "Julie",
      description:
        'L’auditeur de sécurité technique ou sa cheffe réalisent des évaluations techniques de la sécurité d’environnements informatiques. Il identifie les vulnérabilités (failles et faiblesses) et propose des actions de correction, de remédiation. Il peut réaliser différents types d’audits (inspection) en fonction de son périmètre d’activité ("pentest" ou tests d’intrusion, audit de code, revue de configuration, etc.).<br><br>L\'auditeur ou sa cheffe interviennent en amont des problèmes, pour les éviter.',
      formation:
        "Formation : Bac +3 à Bac+5 dont spécialisation en cybersécurité<br><br>type de certification : PASSi (Prestataire d’Audit de Sécurité des Systèmes d’information)",
      posture: [
        "Capacité de synthèse et de vulgarisation pour des publics non techniques",
        "Rédaction de rapports adaptés à différents niveaux d’interlocuteurs",
        "Sens éthique",
        "Capacité de travail en équipe",
        "Rigueur",
      ],
      metiersProches: [
        "Expert technique en audit sécurité",
        "Auditeur informatique",
        "Expert en tests d’intrusions",
      ],
    },
    {
      id: "opAnalysteSOC",
      idVideo: "Alexandre",
      metier: "Opérateur analyste SOC",
      identite: "Alexandre",
      description:
        "L’opérateur analyste SOC (Security Operation Center, désigne une plateforme qui permet de superviser et d’administrer la sécurité du système d’information) assure la supervision du système d’information de l’organisation (entreprise, organisation) afin de détecter des activités suspectes ou malveillantes.<br><br>Il identifie, catégorise, analyse et qualifie les évènements de sécurité en temps réel ou de manière asynchrone (en décalé) sur la base de rapports d’analyse sur les menaces. Il contribue au traitement des incidents de sécurité constatés en support des équipes de réponse aux incidents de sécurité.<br><br>L'opérateur intervient au moment des incidents ou des crises.",
      formation:
        "Formation : Bac +3, dont spécialisation en cybersécurité<br><br>Métier accessible à partir d’une première expérience en ingénierie des réseaux et des systèmes",
      posture: [
        "Capacité à travailler en équipe",
        "Capacité à définir des procédures",
      ],
      metiersProches: [
        "Analyste CyberSOC",
        "Analyste détection d’incident",
        "Veilleur Analyste",
        "Opérateur analyste SOC",
      ],
    },
    {
      id: "analysteIncidents",
      idVideo: "Barbara_x_Gregory",
      metier: "Analyste réponse aux incidents",
      identite: "Gregory et Barbara",
      description:
        "L’analyste réponse aux incidents de sécurité intervient généralement au sein d’un CERT (Computer Emergency Response Team) ou CSIRT (Computer Security Incident Response Team), un centre d’alerte et de réaction face aux attaques informatiques.<br><br>En cas de soupçons sur une activité malveillante ou d’attaque au sein du système d’information, l’analyste réponse aux incidents de sécurité analyse les symptômes et réalise les analyses techniques sur le système d’information. Il identifie le mode opératoire de l’attaquant et qualifie l’étendue de la compromission (faille). Il fournit des recommandations de remédiation pour assurer l’assainissement et le durcissement (la protection) des systèmes attaqués.<br><br>L'analyste intervient au moment et après les incidents ou les crises.",
      formation: "Formation Bac +5, dont spécialisation en cybersécurité",
      posture: [
        "Capacité de restitution et de vulgarisation pour des publics non techniques",
        "Rédaction de rapports adaptés à différents niveaux d’interlocuteurs",
        "travail en équipe",
        "Capacité à résister à la pression",
        "Sens éthique",
      ],
      metiersProches: [
        "Analyste CERT",
        "Analyste CSIRT",
        "Spécialiste en investigation numérique",
        "Analyste traitement d’incidents",
      ],
    },
    {
      id: "formatriceCyber",
      idVideo: "Maryline",
      metier: "Formatrice en cybersécurité",
      identite: "Maryline",
      description:
        "Le formateur en cybersécurité assure la formation et/ou la sensibilisation sur les volets réglementaires, techniques ou opérationnels de la cybersécurité. Il construit des supports de formation adaptés aux publics cible et illustre ses messages par des travaux pratiques, démonstrations ou exercices participatifs. Il peut évaluer le niveau de connaissances avant et à l’issue des formations.",
      formation: "Formation : Bac +5, dont une spécialisation en informatique",
      posture: [
        "Capacité de travail en équipe",
        "Pédagogie sur les sujets de cybersécurité",
      ],
      metiersProches: ["Chargé de formation en sécurité des SI"],
    },
    {
      id: "chercheuseSI",
      idVideo: "Caroline",
      metier: "Chercheuse en sécurité des SI",
      identite: "Caroline",
      description:
        "La chercheuse en sécurité des systèmes d’information se consacre à l’expérimentation, à  la recherche et au progrès de sa discipline. Elle met en œuvre, aux frontières de plusieurs champs scientifiques, ses acquis techniques et académiques au service d’une problématique de sécurité, au plus haut niveau scientifique.Elle mobilise des connaissances expertes pour contribuer à l’émergence de technologies novatrices et de savoirs inédits. Elle peut assurer, superviser ou déléguer l’exécution ou la restitution des travaux scientifiques, mener des activités d’enseignement et d’encadrement d’autres chercheurs ou étudiants/stagiaires. Elle peut également participer au développement de produits, de procédés ou de services innovants.",
      formation:
        "Formation : Bac+5 à doctorat ou post-doctorat, Habilitation à diriger les Recherches",
      posture: [
        "Capacité à travailler en transverse au sein de l’organisation",
        "Capacités d’encadrement",
        "Capacités à collaborer avec ses pairs au sein d’une communauté",
        "Pédagogie",
      ],
      metiersProches: [],
    },
    {
      id: "evaluatriceSecurite",
      idVideo: "Anne",
      metier: "Évaluatrice de la sécurité des technologies de l'information",
      identite: "Anne",
      description:
        "L’évaluatrice de la sécurité des technologies de l’information intervient au sein de laboratoires qui réalisent des évaluations de sécurité des technologies de l’information pour des commanditaires. Elle vérifie la conformité d’un produit, voire d’un système, par rapport à sa spécification de sécurité, selon une méthode et des critères normalisés, réglementaires ou privés (définis par le ceux qui commandent l'évaluation). Elle agit en tant que tierce partie indépendante des développeurs de produits et des commanditaires de l’évaluation de sécurité.<br><br>L’évaluateur peut être spécialisé sur l’évaluation de produits matériels (hardwares) ou logiciels (softwares).",
      formation:
        "Formation : Bac+3 à doctorat dont spécialisation en cybersécurité<br><br>Métier accessible à partir d’une expérience professionnelle en audit de sécurité<br><br>Pour certains types d’évaluations, des profils doctorants spécialisés peuvent être nécessaires (cryptologie notamment)",
      posture: [
        "Rigueur",
        "Rédaction de rapports adaptés à différents niveaux d’interlocuteurs",
        "Capacité à travailler en équipe",
      ],
      metiersProches: ["Responsable évaluation"],
    },
  ],
  ressourcesEnseignant: [
    {
      titre: "Formez vos élèves à la cyber",
      accroche:
        "Vous pouvez vous-même formez vos élèves à la cybersécurité grâce au kit pédagogique CyberEnjeux et à la présentation.",
      ressources: [
        {
          nom: "Télécharger 13 fiches et cartes pédagogiques sur la cybersécurité et une présentation clé en main",
          fichier: "PPTX – 61,88 Ko",
          url: "#",
          classe: "telechargement",
        },
        {
          nom: "Organiser un hackaton CyberEnjeux dans votre établissement pour former vos élèves par la création de jeux",
          fichier: "Accéder à Framaforms",
          url: "https://framaforms.org/cyberenjeux-demande-de-kit-et-declaration-devenement-1686310460",
          classe: "site",
        },
        {
          nom: "Découvrez plus d’informations sur Eduscol",
          details:
            "Eduscol la page éducation et cybersécurité du Ministère de l’Éducation Nationale et de la Jeunesse",
          fichier: "Accéder à Eduscol",
          url: "https://eduscol.education.fr/3679/education-et-cybersecurite",
          classe: "site",
        },
      ],
    },
    {
      titre: "Parlez des métiers cyber",
      accroche: "Des ressources pour pouvoir parler de la cyber à vos élèves :",
      ressources: [
        {
          nom: "Panorama des métiers de la cybersécurité",
          fichier: "Accéder au panorama",
          url: "https://www.ssi.gouv.fr/uploads/2021/10/anssi-panorama_metiers_cybersecurite-2020.pdf",
          classe: "site",
        },
        {
          nom: "Référentiel des compétences des métiers de la cybersécurité",
          fichier: "Accéder au référentiel",
          url: "https://campuscyber.fr/resources/referentiel-des-competences-des-metiers-de-la-cyber/",
          classe: "site",
        },
      ],
    },
    {
      titre: "Guidez les élèves vers des formations labélisées",
      ressources: [
        {
          nom: "Découvrir les formations",
          details:
            "Sur son site l’ANSSI répertorie toutes les formations cyber labelisées, n’hésitez pas à en prendre connaissances pour en parler à vos élèves.",
          fichier: "Accéder aux formations cyber labelisées ",
          url: "https://cyber.gouv.fr/formations",
          classe: "site",
        },
      ],
    },
  ],
  formationsEnseignant: [
    {
      nom: "Trouvez des formations sur le numérique et la cyber sur la plateforme M@gistère.",
      fichier: "Accèdez à M@gistère",
      url: "https://magistere.education.fr/dgesco/course/view.php?id=2646https://magistere.education.fr/dgesco/course/view.php?id=2646",
      classe: "site",
    },
    {
      nom: "Développez vos compétences et vos connaissances sur la cybersécurité.",
      fichier: "Accèdez au MOOC",
      url: "https://secnumacademie.gouv.fr/",
      classe: "site",
    },
  ],
  personnages: [
    {
      nom: "Leila",
      idImage: "Leila",
      age: 31,
      poste: "Responsable Cybersécurité",
      accroche: "Pilote la sécurité informatique d'une organisation.",
      description:
        "Elle fixe les objectifs de cybersécurité, coordonne l'ensemble des services concernés et sensibilise les membres de son organisation aux bonnes pratiques de cybersécurité.",
    },
    {
      nom: "Kylian",
      idImage: "Kylian",
      age: 38,
      poste: "Cryptologue",
      accroche:
        "Protège les informations sensibles détenues par les organisations.",
      description:
        "Il conçoit des algorithmes de sécurité permettant de chiffrer les échanges d'informations numériques pour assurer leur confidentialité et leur intégrité.",
    },
    {
      nom: "Alix",
      idImage: "Alix",
      age: 26,
      poste: "Juriste Cyber",
      accroche:
        "Aide à protéger et défendre juridiquement les organisations face aux menaces informatiques.",
      description:
        "Elle veille à l’application de la réglementation en matière de cybersécurité et conseille sur les mesures juridiques permettant de prévenir et de faire face aux cyberattaques.",
    },
    {
      nom: "Léo",
      idImage: "Leo",
      age: 22,
      poste: "Hacker éthique",
      accroche:
        "Recherche les failles de sécurité pour les corriger avant que des attaquants ne puissent les exploiter.",
      description:
        "Il cherche à comprendre le fonctionnement des systèmes informatiques au niveau technique, réalise des tests d'intrusion et réfléchit à comment améliorer la sécurité de ces systèmes.",
    },
    {
      nom: "Elliot",
      idImage: "Elliot",
      age: 26,
      poste: "Analyste des cybermenaces",
      accroche:
        "Apprend à connaître et à reconnaître les cyberattaques pour mieux s'en protéger.",
      description:
        "Il étudie les modes opératoires des attaquants, leurs cibles, leurs motivations pour détecter et anticiper de nouvelles attaques et y faire face.",
    },
    {
      nom: "Léonie",
      idImage: "Leonie",
      age: 32,
      poste: "Experte cyberdéfense",
      accroche:
        "Porte secours aux personnes et aux organisations victimes de cyberattaques.",
      description:
        "Elle cherche à comprendre comment les attaquants sont parvenus à pénétrer un système pour mettre fin à l'attaque et revenir à une situation normale.",
    },
  ],
};

const lesFormationsEnseignant = () => donnees.formationsEnseignant;
const lesRessourcesEnseignant = () => donnees.ressourcesEnseignant;

const videoAgirAleatoire = () => {
  const indexVideo = Math.floor(Math.random() * donnees.videosAgir.length);
  const { idVideo } = donnees.videosAgir[indexVideo];
  return `agir-video-${idVideo}-placeholder.png`;
};

const autresMetiers = (id) => donnees.metiers.filter((m) => m.id !== id);
const leMetier = (id) => donnees.metiers.find((m) => m.id === id);
const tousLesIdsMetiers = () => donnees.metiers.map((m) => m.id);
const tousLesMetiers = () => donnees.metiers;
const tousLesPersonnages = () => donnees.personnages;

const metiersAuHasard = (combien) => {
  const nbMetiers = donnees.metiers.length;
  const indexDepart = Math.floor(Math.random() * nbMetiers);

  const selection = [];
  for (let i = 0; i < combien; i++)
    selection.push(donnees.metiers[(indexDepart + i) % nbMetiers]);

  return selection;
};

module.exports = {
  autresMetiers,
  leMetier,
  lesFormationsEnseignant,
  lesRessourcesEnseignant,
  metiersAuHasard,
  tousLesIdsMetiers,
  tousLesMetiers,
  tousLesPersonnages,
  videoAgirAleatoire,
};
