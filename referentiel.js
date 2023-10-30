const donnees = {
  videosAgir: [{ idVideo: 1 }, { idVideo: 2 }],
  metiers: [
    {
      metier: "Pentester",
      id: "pentester",
      identite: "Julie",
      idVideo: "pentester",
      description:
        "Le pentester ou auditeur de sécurité technique réalise des évaluations techniques de la sécurité d’environnements informatiques. <br><br>" +
        "Il identifie les vulnérabilités et propose des actions de remédiation. Il peut réaliser différents types d’audits en fonction de son périmètre d’activité (tests d’intrusion, audit de code, revue de configuration, etc.).",
      formation:
        "Formation : Bac +3 à Bac+5 dont spécialisation en cybersécurité<br><br>" +
        "Type de certification : PASSI (Prestataire d’Audit de Sécurité des Systèmes d’Information)",
      posture: [
        "Sens éthique",
        "Capacité de travail en équipe",
        "Capacité de synthèse",
        "Rigueur",
        "Rédaction de rapports",
      ],
      metiersProches: [
        "Expert technique en audit sécurité",
        "Expert en tests d’intrusions",
      ],
    },
    {
      metier: "Responsable de la sécurité des systèmes d’information (RSSI)",
      id: "rssi",
      identite: "Edouard",
      idVideo: "rssi",
    },
    {
      metier: "Analyste réponse aux incidents",
      id: "analyste-incidents",
      identite: "Gregory et Barbara",
      idVideo: "analyste-incidents",
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
          fichier: "PDF – 61,88 Ko",
          url: "#",
          classe: "telechargement",
        },
        {
          nom: "Découvrez plus d’informations sur Eduscol",
          details:
            "Eduscol la page éducation et cybersécurité du Ministère de l’Éducation Nationale et de la Jeunesse",
          fichier: "Accéder à Eduscol",
          url: "#",
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
          fichier: "PDF – 61,88 Ko",
          url: "#",
          classe: "telechargement",
        },
        {
          nom: "Référentiel des compétences des métiers de la cybersécurité (PDF)",
          fichier: "PDF – 61,88 Ko",
          url: "#",
          classe: "telechargement",
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
          url: "#",
          classe: "site",
        },
      ],
    },
  ],
  formationsEnseignant: [
    {
      nom: "Trouvez des formations sur le numérique et la cyber sur la plateforme M@gistère.",
      fichier: "Accèdez à M@gistère",
      url: "#",
      classe: "telechargement",
    },
    {
      nom: "Développez vos compétences et vos connaissances sur la cybersécurité.",
      fichier: "Accèdez au MOOC",
      url: "#",
      classe: "telechargement",
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
  tousLesMetiers,
  tousLesPersonnages,
  videoAgirAleatoire,
};
